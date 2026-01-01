// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Audio System
// Text-to-Speech using Web Speech API for Korean pronunciation
// ═══════════════════════════════════════════════════════════════

const AUDIO_STORAGE_KEY = 'kfq_audio_settings';

// ═══════════════════════════════════════════════════════════════
// AUDIO SYSTEM
// ═══════════════════════════════════════════════════════════════

window.Audio = {
  // Check if speech synthesis is available
  isSupported: () => {
    return 'speechSynthesis' in window;
  },

  // Get available Korean voices
  getKoreanVoices: () => {
    if (!window.Audio.isSupported()) return [];
    
    const voices = speechSynthesis.getVoices();
    return voices.filter(voice => 
      voice.lang.startsWith('ko') || 
      voice.lang === 'ko-KR' ||
      voice.name.toLowerCase().includes('korean')
    );
  },

  // Wait for voices to load (they load asynchronously)
  waitForVoices: () => {
    return new Promise((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }
      
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
      
      // Fallback timeout
      setTimeout(() => resolve(speechSynthesis.getVoices()), 1000);
    });
  },

  // Load audio settings
  getSettings: () => {
    return window.load(AUDIO_STORAGE_KEY, {
      enabled: true,
      rate: 0.9,        // Slightly slower for learning
      pitch: 1.0,
      volume: 1.0,
      autoPlay: false,  // Auto-play on card flip
      voiceName: null,  // Selected voice name
    });
  },

  // Save audio settings
  saveSettings: (settings) => {
    window.store(AUDIO_STORAGE_KEY, settings);
  },

  // Speak Korean text
  speak: async (text, options = {}) => {
    if (!window.Audio.isSupported()) {
      console.warn('Speech synthesis not supported');
      return false;
    }

    const settings = window.Audio.getSettings();
    if (!settings.enabled && !options.force) {
      return false;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Wait for voices to be available
    await window.Audio.waitForVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a Korean voice
    const koreanVoices = window.Audio.getKoreanVoices();
    
    if (settings.voiceName) {
      const selectedVoice = koreanVoices.find(v => v.name === settings.voiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
    } else if (koreanVoices.length > 0) {
      utterance.voice = koreanVoices[0];
    }

    // Set language explicitly
    utterance.lang = 'ko-KR';
    
    // Apply settings
    utterance.rate = options.rate ?? settings.rate;
    utterance.pitch = options.pitch ?? settings.pitch;
    utterance.volume = options.volume ?? settings.volume;

    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        resolve(false); // Don't reject, just return false
      };
      
      speechSynthesis.speak(utterance);
    });
  },

  // Speak with slow speed for learning
  speakSlow: (text) => {
    return window.Audio.speak(text, { rate: 0.7 });
  },

  // Speak at normal speed
  speakNormal: (text) => {
    return window.Audio.speak(text, { rate: 1.0 });
  },

  // Stop all speech
  stop: () => {
    if (window.Audio.isSupported()) {
      speechSynthesis.cancel();
    }
  },

  // Check if currently speaking
  isSpeaking: () => {
    return window.Audio.isSupported() && speechSynthesis.speaking;
  },

  // Toggle audio on/off
  toggle: () => {
    const settings = window.Audio.getSettings();
    settings.enabled = !settings.enabled;
    window.Audio.saveSettings(settings);
    return settings.enabled;
  },
};

// ═══════════════════════════════════════════════════════════════
// SOUND EFFECTS (Optional - uses Web Audio API)
// ═══════════════════════════════════════════════════════════════

window.SoundFX = {
  audioContext: null,

  // Initialize audio context (must be called from user interaction)
  init: () => {
    if (!window.SoundFX.audioContext) {
      window.SoundFX.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return window.SoundFX.audioContext;
  },

  // Play a simple beep
  beep: (frequency = 440, duration = 100, type = 'sine') => {
    try {
      const ctx = window.SoundFX.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration / 1000);
    } catch (e) {
      console.warn('Sound effect failed:', e);
    }
  },

  // Correct answer sound
  correct: () => {
    window.SoundFX.beep(523, 100); // C5
    setTimeout(() => window.SoundFX.beep(659, 100), 100); // E5
    setTimeout(() => window.SoundFX.beep(784, 150), 200); // G5
  },

  // Incorrect answer sound
  incorrect: () => {
    window.SoundFX.beep(200, 200, 'square');
  },

  // Level up sound
  levelUp: () => {
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047]; // C major scale
    notes.forEach((freq, i) => {
      setTimeout(() => window.SoundFX.beep(freq, 80), i * 60);
    });
  },

  // Achievement unlocked
  achievement: () => {
    window.SoundFX.beep(784, 100);
    setTimeout(() => window.SoundFX.beep(988, 100), 100);
    setTimeout(() => window.SoundFX.beep(1175, 200), 200);
  },
};

// Pre-load voices when page loads
if (window.Audio.isSupported()) {
  window.Audio.waitForVoices().then(voices => {
    const korean = voices.filter(v => v.lang.startsWith('ko'));
    console.log(`✅ Korean Fluency Quest: Audio loaded (${korean.length} Korean voices found)`);
  });
}
