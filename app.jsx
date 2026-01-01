// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Main Application
// All constants loaded via window.* from separate files
// ═══════════════════════════════════════════════════════════════

const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ═══════════════════════════════════════════════════════════════
// USER STATS MANAGEMENT
// ═══════════════════════════════════════════════════════════════

const STATS_KEY = 'kfq_user_stats';
const SETTINGS_KEY = 'kfq_settings';

const defaultStats = {
  xp: 0,
  level: 1,
  streak: 0,
  bestStreak: 0,
  dailyStreak: 0,
  totalReviews: 0,
  totalQuizzes: 0,
  totalSentences: 0,
  totalListening: 0,
  perfectQuizzes: 0,
  achievements: [],
  lastPractice: null,
  practiceHistory: [],
};

const defaultSettings = {
  showRomanization: true,
  cardDirection: 'korean-first',
  maxLevel: 15,
  audioEnabled: true,
  autoPlayAudio: false,
  srsEnabled: true,
  soundEffects: true,
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

function App() {
  // ─────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────
  const [view, setView] = useState('home');
  const [stats, setStats] = useState(() => window.load(STATS_KEY, defaultStats));
  const [settings, setSettings] = useState(() => window.load(SETTINGS_KEY, defaultSettings));
  const [isLoading, setIsLoading] = useState(true);

  // Flashcard state
  const [flashcardDeck, setFlashcardDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);

  // Sentence builder state
  const [sentenceExercise, setSentenceExercise] = useState(null);
  const [userSentenceInput, setUserSentenceInput] = useState('');
  const [sentenceFeedback, setSentenceFeedback] = useState(null);

  // Listening mode state
  const [listeningExercise, setListeningExercise] = useState(null);
  const [listeningInput, setListeningInput] = useState('');
  const [listeningFeedback, setListeningFeedback] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Grammar reference state
  const [selectedGrammar, setSelectedGrammar] = useState(null);

  // ─────────────────────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────────────────────

  // Save stats and settings
  useEffect(() => {
    window.store(STATS_KEY, stats);
  }, [stats]);

  useEffect(() => {
    window.store(SETTINGS_KEY, settings);
  }, [settings]);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check daily streak on load
  useEffect(() => {
    const today = window.getDateKey();
    if (stats.lastPractice) {
      const daysSince = window.getDaysSince(stats.lastPractice);
      if (daysSince > 1) {
        // Reset daily streak if more than 1 day passed
        setStats(prev => ({ ...prev, dailyStreak: 0 }));
        // Check for comeback achievement
        if (daysSince >= 7 && !stats.achievements.includes('comeback_kid')) {
          awardAchievement('comeback_kid');
        }
      }
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // TOAST HELPER
  // ─────────────────────────────────────────────────────────────

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ─────────────────────────────────────────────────────────────
  // XP & ACHIEVEMENT SYSTEM
  // ─────────────────────────────────────────────────────────────

  const awardXP = useCallback((amount) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = window.calculateLevelFromXP(newXP);
      const today = window.getDateKey();
      const isNewDay = prev.lastPractice !== today;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        lastPractice: today,
        dailyStreak: isNewDay ? prev.dailyStreak + 1 : prev.dailyStreak,
      };
    });
  }, []);

  const awardAchievement = useCallback((achievementId) => {
    const achievement = window.ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return;

    setStats(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
        xp: prev.xp + achievement.xp,
      };
    });

    showToast(`🏆 Achievement: ${achievement.name}!`, 'achievement');
    if (settings.soundEffects && window.SoundFX) {
      window.SoundFX.achievement();
    }
  }, [settings.soundEffects, showToast]);

  const checkAchievements = useCallback((newStats) => {
    // Streak achievements
    if (newStats.streak >= 5) awardAchievement('streak_5');
    if (newStats.streak >= 10) awardAchievement('streak_10');
    if (newStats.streak >= 25) awardAchievement('streak_25');
    if (newStats.streak >= 50) awardAchievement('streak_50');

    // Daily streak achievements
    if (newStats.dailyStreak >= 3) awardAchievement('daily_3');
    if (newStats.dailyStreak >= 7) awardAchievement('daily_7');
    if (newStats.dailyStreak >= 14) awardAchievement('daily_14');
    if (newStats.dailyStreak >= 30) awardAchievement('daily_30');

    // Quiz achievements
    if (newStats.totalQuizzes >= 10) awardAchievement('quiz_10');
    if (newStats.totalQuizzes >= 25) awardAchievement('quiz_25');
    if (newStats.totalQuizzes >= 50) awardAchievement('quiz_50');
    if (newStats.perfectQuizzes >= 5) awardAchievement('perfectionist');

    // Sentence achievements
    if (newStats.totalSentences >= 10) awardAchievement('sentence_10');
    if (newStats.totalSentences >= 25) awardAchievement('sentence_25');
    if (newStats.totalSentences >= 50) awardAchievement('sentence_50');

    // Listening achievements
    if (newStats.totalListening >= 10) awardAchievement('listen_10');
    if (newStats.totalListening >= 25) awardAchievement('listen_25');
    if (newStats.totalListening >= 50) awardAchievement('listen_50');

    // Level achievements
    if (newStats.level >= 5) awardAchievement('level_5');
    if (newStats.level >= 10) awardAchievement('level_10');
    if (newStats.level >= 20) awardAchievement('level_20');
    if (newStats.level >= 30) awardAchievement('level_30');
    if (newStats.level >= 40) awardAchievement('level_40');

    // Time-based achievements
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) awardAchievement('night_owl');
    if (hour >= 4 && hour < 6) awardAchievement('early_bird');

    // SRS mastery achievements
    if (settings.srsEnabled && window.SRS) {
      const vocabIds = window.VOCABULARY.map(v => v.id);
      const srsStats = window.SRS.getStats(vocabIds);
      if (srsStats.mastered >= 25) awardAchievement('vocab_25');
      if (srsStats.mastered >= 50) awardAchievement('vocab_50');
      if (srsStats.mastered >= 100) awardAchievement('vocab_100');
      if (srsStats.mastered >= 150) awardAchievement('vocab_150');
    }
  }, [awardAchievement, settings.srsEnabled]);

  // ─────────────────────────────────────────────────────────────
  // FLASHCARD MODE
  // ─────────────────────────────────────────────────────────────

  const startFlashcards = useCallback((filterLevel = null) => {
    let vocab = window.getVocabUpToLevel(settings.maxLevel);
    if (filterLevel) {
      vocab = window.getVocabByLevel(filterLevel);
    }

    let deck;
    if (settings.srsEnabled && window.SRS) {
      // Use SRS to prioritize cards
      const vocabIds = vocab.map(v => v.id);
      const priorityIds = window.SRS.getPriorityQueue(vocabIds, 20);
      deck = priorityIds.map(id => vocab.find(v => v.id === id)).filter(Boolean);
    } else {
      // Random shuffle
      deck = window.shuffleArray(vocab).slice(0, 20);
    }

    setFlashcardDeck(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionStreak(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setView('flashcards');

    // First card achievement
    if (!stats.achievements.includes('first_card')) {
      awardAchievement('first_card');
    }
  }, [settings.maxLevel, settings.srsEnabled, stats.achievements, awardAchievement]);

  const handleCardResponse = useCallback((quality) => {
    const card = flashcardDeck[currentCardIndex];
    const isCorrect = quality >= window.SRS_QUALITY.GOOD;
    
    // Update SRS if enabled
    if (settings.srsEnabled && window.SRS) {
      window.SRS.reviewCard(card.id, quality);
    }

    // Update session stats
    const newTotal = sessionTotal + 1;
    const newStreak = isCorrect ? sessionStreak + 1 : 0;
    const newCorrect = isCorrect ? sessionCorrect + 1 : sessionCorrect;

    setSessionTotal(newTotal);
    setSessionStreak(newStreak);
    setSessionCorrect(newCorrect);

    // Update global stats
    setStats(prev => {
      const newStats = {
        ...prev,
        totalReviews: prev.totalReviews + 1,
        streak: isCorrect ? prev.streak + 1 : 0,
        bestStreak: Math.max(prev.bestStreak, newStreak),
      };
      checkAchievements(newStats);
      return newStats;
    });

    // Award XP based on quality
    const xpMap = { 0: 0, 1: 3, 2: 5, 3: 8 };
    awardXP(xpMap[quality] || 5);

    // Sound effects
    if (settings.soundEffects && window.SoundFX) {
      isCorrect ? window.SoundFX.correct() : window.SoundFX.incorrect();
    }

    // Next card or results
    if (currentCardIndex < flashcardDeck.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setView('flashcard-results');
    }
  }, [flashcardDeck, currentCardIndex, sessionTotal, sessionStreak, sessionCorrect, settings, awardXP, checkAchievements]);

  const playCardAudio = useCallback(() => {
    const card = flashcardDeck[currentCardIndex];
    if (card && window.Audio) {
      window.Audio.speak(card.korean);
    }
  }, [flashcardDeck, currentCardIndex]);

  // ─────────────────────────────────────────────────────────────
  // QUIZ MODE
  // ─────────────────────────────────────────────────────────────

  const startQuiz = useCallback((mode = 'vocab') => {
    const source = mode === 'sentences' 
      ? window.getSentencesUpToLevel(settings.maxLevel)
      : window.getVocabUpToLevel(settings.maxLevel);
    
    const questions = window.shuffleArray(source).slice(0, 10);
    
    const formatted = questions.map(q => {
      const wrongAnswers = window.shuffleArray(
        source.filter(f => f.english !== q.english)
      ).slice(0, 3).map(f => f.english);
      
      return {
        question: q.korean,
        correct: q.english,
        options: window.shuffleArray([q.english, ...wrongAnswers]),
        level: q.level,
        original: q,
      };
    });

    setQuizQuestions(formatted);
    setQuizAnswers([]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizFeedback(null);
    setQuizStartTime(Date.now());
    setView('quiz');

    if (!stats.achievements.includes('first_quiz')) {
      awardAchievement('first_quiz');
    }
  }, [settings.maxLevel, stats.achievements, awardAchievement]);

  const submitQuizAnswer = useCallback((answer) => {
    const question = quizQuestions[currentQuizIndex];
    const isCorrect = answer === question.correct;
    
    setSelectedAnswer(answer);
    setQuizFeedback(isCorrect ? 'correct' : 'incorrect');
    setQuizAnswers(prev => [...prev, { answer, isCorrect }]);

    // Sound effects
    if (settings.soundEffects && window.SoundFX) {
      isCorrect ? window.SoundFX.correct() : window.SoundFX.incorrect();
    }

    // Award XP
    if (isCorrect) awardXP(10);

    // Update stats
    setStats(prev => ({
      ...prev,
      streak: isCorrect ? prev.streak + 1 : 0,
      bestStreak: isCorrect ? Math.max(prev.bestStreak, prev.streak + 1) : prev.bestStreak,
    }));

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setQuizFeedback(null);
      } else {
        // Quiz complete
        const allAnswers = [...quizAnswers, { isCorrect }];
        const allCorrect = allAnswers.every(a => a.isCorrect);
        const quizTime = (Date.now() - quizStartTime) / 1000;
        
        setStats(prev => {
          const newStats = {
            ...prev,
            totalQuizzes: prev.totalQuizzes + 1,
            perfectQuizzes: allCorrect ? prev.perfectQuizzes + 1 : prev.perfectQuizzes,
          };
          checkAchievements(newStats);
          return newStats;
        });

        if (allCorrect) {
          awardAchievement('quiz_perfect');
          awardXP(30); // Bonus for perfect
        }

        // Speed achievement
        if (quizTime < 30) {
          awardAchievement('speed_demon');
        }

        setView('quiz-results');
      }
    }, 1500);
  }, [quizQuestions, currentQuizIndex, quizAnswers, quizStartTime, settings.soundEffects, awardXP, checkAchievements, awardAchievement]);

  // ─────────────────────────────────────────────────────────────
  // SENTENCE BUILDER MODE
  // ─────────────────────────────────────────────────────────────

  const startSentenceBuilder = useCallback(() => {
    const sentences = window.getSentencesUpToLevel(settings.maxLevel);
    const sentence = window.pickRandom(sentences);
    setSentenceExercise(sentence);
    setUserSentenceInput('');
    setSentenceFeedback(null);
    setView('sentence-builder');

    if (!stats.achievements.includes('first_sentence')) {
      awardAchievement('first_sentence');
    }
  }, [settings.maxLevel, stats.achievements, awardAchievement]);

  const checkSentence = useCallback(() => {
    const isCorrect = window.compareKorean(userSentenceInput, sentenceExercise.korean);
    setSentenceFeedback(isCorrect ? 'correct' : 'incorrect');

    if (settings.soundEffects && window.SoundFX) {
      isCorrect ? window.SoundFX.correct() : window.SoundFX.incorrect();
    }

    if (isCorrect) {
      awardXP(15);
      setStats(prev => {
        const newStats = {
          ...prev,
          totalSentences: prev.totalSentences + 1,
          streak: prev.streak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        };
        checkAchievements(newStats);
        return newStats;
      });
    } else {
      setStats(prev => ({ ...prev, streak: 0 }));
    }
  }, [userSentenceInput, sentenceExercise, settings.soundEffects, awardXP, checkAchievements]);

  // ─────────────────────────────────────────────────────────────
  // LISTENING MODE
  // ─────────────────────────────────────────────────────────────

  const startListening = useCallback(() => {
    const vocab = window.getVocabUpToLevel(settings.maxLevel);
    const word = window.pickRandom(vocab);
    setListeningExercise(word);
    setListeningInput('');
    setListeningFeedback(null);
    setView('listening');

    if (!stats.achievements.includes('first_listen')) {
      awardAchievement('first_listen');
    }
  }, [settings.maxLevel, stats.achievements, awardAchievement]);

  const playListeningAudio = useCallback(async (speed = 'normal') => {
    if (!listeningExercise || !window.Audio) return;
    
    setIsPlaying(true);
    const rate = speed === 'slow' ? 0.7 : 1.0;
    await window.Audio.speak(listeningExercise.korean, { rate });
    setIsPlaying(false);
  }, [listeningExercise]);

  const checkListening = useCallback(() => {
    const isCorrect = window.compareKorean(listeningInput, listeningExercise.korean);
    setListeningFeedback(isCorrect ? 'correct' : 'incorrect');

    if (settings.soundEffects && window.SoundFX) {
      isCorrect ? window.SoundFX.correct() : window.SoundFX.incorrect();
    }

    if (isCorrect) {
      awardXP(12);
      setStats(prev => {
        const newStats = {
          ...prev,
          totalListening: prev.totalListening + 1,
          streak: prev.streak + 1,
          bestStreak: Math.max(prev.bestStreak, prev.streak + 1),
        };
        checkAchievements(newStats);
        return newStats;
      });
    } else {
      setStats(prev => ({ ...prev, streak: 0 }));
    }
  }, [listeningInput, listeningExercise, settings.soundEffects, awardXP, checkAchievements]);

  // ─────────────────────────────────────────────────────────────
  // SETTINGS HANDLERS
  // ─────────────────────────────────────────────────────────────

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetProgress = useCallback(() => {
    if (confirm('Are you sure? This will reset ALL your progress including XP, achievements, and learning data!')) {
      setStats(defaultStats);
      if (window.SRS) window.SRS.resetAll();
      showToast('Progress reset', 'info');
    }
  }, [showToast]);

  // ─────────────────────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────────────────────

  const currentLevel = useMemo(() => {
    return window.getLevelInfo(stats.level) || window.LEVELS[0];
  }, [stats.level]);

  // ═══════════════════════════════════════════════════════════════
  // RENDER: LOADING SCREEN
  // ═══════════════════════════════════════════════════════════════

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon">🇰🇷</div>
        <div className="loading-text">한국어 Fluency Quest</div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: HOME SCREEN
  // ═══════════════════════════════════════════════════════════════

  const renderHome = () => (
    <div className="home-screen">
      <header className="hero">
        <div className="hero-bg"></div>
        <h1 className="title">
          <span className="korean-title">한국어</span>
          <span className="english-title">Fluency Quest</span>
        </h1>
        <p className="subtitle">Your Korean Learning Adventure</p>
      </header>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-icon">⚡</span>
          <span className="stat-value">{stats.xp}</span>
          <span className="stat-label">XP</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">Lv.{stats.level}</span>
          <span className="stat-label">Level</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{stats.dailyStreak}</span>
          <span className="stat-label">Days</span>
        </div>
        <div className="stat">
          <span className="stat-icon">📖</span>
          <span className="stat-value">{stats.totalReviews}</span>
          <span className="stat-label">Reviews</span>
        </div>
      </div>

      <nav className="practice-modes">
        <h2 className="section-title">Practice Modes</h2>
        
        <button className="mode-card" onClick={() => startFlashcards()}>
          <div className="mode-icon">🃏</div>
          <div className="mode-info">
            <h3>Flashcards</h3>
            <p>Review vocabulary with spaced repetition</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>

        <button className="mode-card" onClick={() => startQuiz('vocab')}>
          <div className="mode-icon">❓</div>
          <div className="mode-info">
            <h3>Vocabulary Quiz</h3>
            <p>Test your word knowledge</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>

        <button className="mode-card" onClick={() => startSentenceBuilder()}>
          <div className="mode-icon">✍️</div>
          <div className="mode-info">
            <h3>Sentence Builder</h3>
            <p>Practice writing full sentences</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>

        <button className="mode-card" onClick={() => startListening()}>
          <div className="mode-icon">👂</div>
          <div className="mode-info">
            <h3>Listening Practice</h3>
            <p>Train your ears with audio</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>

        <button className="mode-card" onClick={() => setView('levels')}>
          <div className="mode-icon">📚</div>
          <div className="mode-info">
            <h3>Browse Levels</h3>
            <p>Study by topic and grammar point</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>

        <button className="mode-card" onClick={() => setView('grammar')}>
          <div className="mode-icon">📖</div>
          <div className="mode-info">
            <h3>Grammar Reference</h3>
            <p>Browse all grammar points with examples</p>
          </div>
          <div className="mode-arrow">→</div>
        </button>
      </nav>

      <div className="quick-actions">
        <button className="quick-btn" onClick={() => setView('achievements')}>
          🏆 Achievements ({stats.achievements.length}/{window.ACHIEVEMENTS.length})
        </button>
        <button className="quick-btn" onClick={() => setView('stats')}>
          📊 Statistics
        </button>
        <button className="quick-btn" onClick={() => setView('settings')}>
          ⚙️ Settings
        </button>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FLASHCARDS
  // ═══════════════════════════════════════════════════════════════

  const renderFlashcards = () => {
    if (flashcardDeck.length === 0) return null;
    const card = flashcardDeck[currentCardIndex];
    const showKoreanFirst = settings.cardDirection === 'korean-first';
    const mastery = settings.srsEnabled && window.SRS ? window.SRS.getMasteryLevel(card.id) : 0;

    return (
      <div className="flashcard-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{currentCardIndex + 1} / {flashcardDeck.length}</div>
          <div className="streak-indicator">🔥 {sessionStreak}</div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentCardIndex + 1) / flashcardDeck.length) * 100}%` }} />
        </div>

        <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-face card-front">
              <span className="card-level">Level {card.level}</span>
              {settings.audioEnabled && (
                <button 
                  className="card-audio-btn" 
                  onClick={(e) => { e.stopPropagation(); playCardAudio(); }}
                >
                  🔊
                </button>
              )}
              <div className="mastery-dots">
                {[1, 2, 3, 4, 5].map(n => (
                  <div key={n} className={`mastery-dot ${n <= mastery ? (mastery >= 5 ? 'mastered' : 'filled') : ''}`} />
                ))}
              </div>
              <p className="card-korean">{showKoreanFirst ? card.korean : card.english}</p>
              {showKoreanFirst && settings.showRomanization && (
                <p className="card-romanization">{card.romanization}</p>
              )}
              <span className="tap-hint">Tap to flip</span>
            </div>
            <div className="card-face card-back">
              <p className="card-english">{showKoreanFirst ? card.english : card.korean}</p>
              {card.example && <p className="card-example">{card.example}</p>}
              {card.grammar && <span className="card-grammar">{card.grammar}</span>}
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="response-buttons">
            <button className="response-btn again" onClick={() => handleCardResponse(window.SRS_QUALITY.AGAIN)}>
              <span className="emoji">😕</span>
              <span>Again</span>
            </button>
            <button className="response-btn hard" onClick={() => handleCardResponse(window.SRS_QUALITY.HARD)}>
              <span className="emoji">😐</span>
              <span>Hard</span>
            </button>
            <button className="response-btn good" onClick={() => handleCardResponse(window.SRS_QUALITY.GOOD)}>
              <span className="emoji">😊</span>
              <span>Good</span>
            </button>
            <button className="response-btn easy" onClick={() => handleCardResponse(window.SRS_QUALITY.EASY)}>
              <span className="emoji">😄</span>
              <span>Easy</span>
            </button>
          </div>
        )}

        <div className="session-stats">
          <span>✓ {sessionCorrect}</span>
          <span>|</span>
          <span>✗ {sessionTotal - sessionCorrect}</span>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FLASHCARD RESULTS
  // ═══════════════════════════════════════════════════════════════

  const renderFlashcardResults = () => {
    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    
    return (
      <div className="results-screen">
        <div className="results-card animate-slide-up">
          <h2>Session Complete! 🎉</h2>
          
          <div className="results-stats">
            <div className="result-stat">
              <span className="result-value">{sessionCorrect}/{sessionTotal}</span>
              <span className="result-label">Correct</span>
            </div>
            <div className="result-stat">
              <span className="result-value">{accuracy}%</span>
              <span className="result-label">Accuracy</span>
            </div>
            <div className="result-stat">
              <span className="result-value">{stats.bestStreak}</span>
              <span className="result-label">Best Streak</span>
            </div>
          </div>

          <div className="xp-earned">
            +{sessionCorrect * 5} XP earned!
          </div>

          <div className="result-actions">
            <button className="primary-btn" onClick={() => startFlashcards()}>
              Practice Again
            </button>
            <button className="secondary-btn" onClick={() => setView('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: QUIZ
  // ═══════════════════════════════════════════════════════════════

  const renderQuiz = () => {
    if (quizQuestions.length === 0) return null;
    const question = quizQuestions[currentQuizIndex];

    return (
      <div className="quiz-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">Question {currentQuizIndex + 1} / {quizQuestions.length}</div>
          <span className="streak-indicator">✓ {quizAnswers.filter(a => a.isCorrect).length}</span>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }} />
        </div>

        <div className="quiz-content">
          <div className="quiz-question">
            <span className="question-label">What does this mean?</span>
            <p className="question-korean">{question.question}</p>
            {settings.audioEnabled && (
              <button 
                className="card-audio-btn" 
                style={{ margin: '16px auto', position: 'relative' }}
                onClick={() => window.Audio?.speak(question.question)}
              >
                🔊
              </button>
            )}
          </div>

          <div className="quiz-options">
            {question.options.map((option, i) => (
              <button
                key={i}
                className={`quiz-option ${
                  selectedAnswer === option
                    ? option === question.correct ? 'correct' : 'incorrect'
                    : ''
                } ${quizFeedback && option === question.correct ? 'show-correct' : ''}`}
                onClick={() => !selectedAnswer && submitQuizAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div className={`feedback ${quizFeedback}`}>
              {quizFeedback === 'correct' ? '✓ Correct!' : `✗ The answer was: ${question.correct}`}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: QUIZ RESULTS
  // ═══════════════════════════════════════════════════════════════

  const renderQuizResults = () => {
    const correct = quizAnswers.filter(a => a.isCorrect).length;
    const total = quizQuestions.length;
    const percentage = Math.round((correct / total) * 100);

    return (
      <div className="results-screen">
        <div className="results-card animate-slide-up">
          <h2>Quiz Complete! 🎉</h2>
          
          <div className="results-stats">
            <div className="result-stat">
              <span className="result-value">{correct}/{total}</span>
              <span className="result-label">Correct</span>
            </div>
            <div className="result-stat">
              <span className="result-value">{percentage}%</span>
              <span className="result-label">Score</span>
            </div>
          </div>

          <div className="xp-earned">
            +{correct * 10}{percentage === 100 ? ' +30 bonus' : ''} XP earned!
          </div>

          <div className="result-actions">
            <button className="primary-btn" onClick={() => startQuiz()}>
              Try Again
            </button>
            <button className="secondary-btn" onClick={() => setView('home')}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: SENTENCE BUILDER
  // ═══════════════════════════════════════════════════════════════

  const renderSentenceBuilder = () => {
    if (!sentenceExercise) return null;

    return (
      <div className="sentence-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Sentence Builder</h2>
          <span className="streak-indicator">Level {sentenceExercise.level}</span>
        </header>

        <div className="sentence-content">
          <div className="sentence-prompt">
            <span className="prompt-label">Translate to Korean:</span>
            <p className="prompt-english">{sentenceExercise.english}</p>
            {sentenceExercise.grammar && (
              <span className="card-grammar" style={{ marginTop: 12 }}>{sentenceExercise.grammar}</span>
            )}
          </div>

          <div className="sentence-input-area">
            <input
              type="text"
              className={`sentence-input ${sentenceFeedback || ''}`}
              value={userSentenceInput}
              onChange={(e) => setUserSentenceInput(e.target.value)}
              placeholder="Type your answer in Korean..."
              disabled={sentenceFeedback !== null}
              autoFocus
            />
            
            {!sentenceFeedback && (
              <button 
                className="primary-btn"
                style={{ width: '100%', marginTop: 16 }}
                onClick={checkSentence}
                disabled={!userSentenceInput.trim()}
              >
                Check Answer
              </button>
            )}
          </div>

          {sentenceFeedback && (
            <div className={`sentence-feedback ${sentenceFeedback}`}>
              {sentenceFeedback === 'correct' ? (
                <>
                  <span className="feedback-icon">✓</span>
                  <span>Perfect! 완벽해요!</span>
                </>
              ) : (
                <>
                  <span className="feedback-icon">✗</span>
                  <div>
                    <p>Not quite. The correct answer is:</p>
                    <p className="correct-answer">{sentenceExercise.korean}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {sentenceFeedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startSentenceBuilder}>
                Next Sentence
              </button>
              <button className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: LISTENING MODE
  // ═══════════════════════════════════════════════════════════════

  const renderListening = () => {
    if (!listeningExercise) return null;

    return (
      <div className="listening-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Listening Practice</h2>
          <span className="streak-indicator">Level {listeningExercise.level}</span>
        </header>

        <div className="sentence-content">
          <div className="listening-prompt">
            <span className="prompt-label">Listen and type what you hear:</span>
            
            <button 
              className={`play-audio-btn ${isPlaying ? 'playing' : ''}`}
              onClick={() => playListeningAudio()}
              disabled={isPlaying}
            >
              {isPlaying ? '🔊' : '▶️'}
            </button>

            <div className="speed-controls">
              <button className="speed-btn" onClick={() => playListeningAudio('slow')}>
                🐢 Slow
              </button>
              <button className="speed-btn" onClick={() => playListeningAudio('normal')}>
                🐇 Normal
              </button>
            </div>
          </div>

          <div className="sentence-input-area">
            <input
              type="text"
              className={`sentence-input ${listeningFeedback || ''}`}
              value={listeningInput}
              onChange={(e) => setListeningInput(e.target.value)}
              placeholder="Type what you heard in Korean..."
              disabled={listeningFeedback !== null}
            />
            
            {!listeningFeedback && (
              <button 
                className="primary-btn"
                style={{ width: '100%', marginTop: 16 }}
                onClick={checkListening}
                disabled={!listeningInput.trim()}
              >
                Check Answer
              </button>
            )}
          </div>

          {listeningFeedback && (
            <div className={`sentence-feedback ${listeningFeedback}`}>
              {listeningFeedback === 'correct' ? (
                <>
                  <span className="feedback-icon">✓</span>
                  <div>
                    <span>Perfect! 완벽해요!</span>
                    <p className="correct-answer">{listeningExercise.korean}</p>
                    <p style={{ marginTop: 8, color: 'inherit', opacity: 0.8 }}>{listeningExercise.english}</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="feedback-icon">✗</span>
                  <div>
                    <p>The correct answer was:</p>
                    <p className="correct-answer">{listeningExercise.korean}</p>
                    <p style={{ marginTop: 8, opacity: 0.8 }}>{listeningExercise.english}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {listeningFeedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startListening}>
                Next Word
              </button>
              <button className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: LEVELS
  // ═══════════════════════════════════════════════════════════════

  const renderLevels = () => (
    <div className="levels-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => setView('home')}>← Back</button>
        <h2>Study by Level</h2>
      </header>

      <div className="levels-grid">
        {window.LEVELS.map(level => {
          const vocabCount = window.getVocabCountByLevel(level.level);
          const isLocked = level.level > settings.maxLevel;
          
          return (
            <button
              key={level.level}
              className={`level-card ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && startFlashcards(level.level)}
              disabled={isLocked}
            >
              <div className="level-emoji">{level.emoji}</div>
              <div className="level-info">
                <span className="level-number">Level {level.level}</span>
                <h3 className="level-title">{level.title}</h3>
                <p className="level-focus">{level.focus}</p>
                {vocabCount > 0 && <span className="level-vocab">{vocabCount} words</span>}
              </div>
              {isLocked && <span className="lock-icon">🔒</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER: ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════════

  const renderAchievements = () => (
    <div className="achievements-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => setView('home')}>← Back</button>
        <h2>Achievements</h2>
      </header>

      <div className="achievements-grid">
        {window.ACHIEVEMENTS.map(achievement => {
          const unlocked = stats.achievements.includes(achievement.id);
          
          return (
            <div 
              key={achievement.id}
              className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h3>{achievement.name}</h3>
                <p>{achievement.desc}</p>
                <span className="achievement-xp">+{achievement.xp} XP</span>
              </div>
              {unlocked && <span className="check-mark">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER: STATISTICS
  // ═══════════════════════════════════════════════════════════════

  const renderStats = () => {
    const srsStats = settings.srsEnabled && window.SRS 
      ? window.SRS.getStats(window.VOCABULARY.map(v => v.id))
      : { mastered: 0, learning: 0, newCards: window.VOCABULARY.length, totalReviews: 0 };

    return (
      <div className="stats-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Statistics</h2>
        </header>

        <div className="settings-content">
          <div className="setting-group">
            <label className="setting-label">Overall Progress</label>
            <div className="stat-row">
              <span>Total XP</span>
              <span>{stats.xp}</span>
            </div>
            <div className="stat-row">
              <span>Current Level</span>
              <span>{stats.level}</span>
            </div>
            <div className="stat-row">
              <span>Best Streak</span>
              <span>{stats.bestStreak}</span>
            </div>
            <div className="stat-row">
              <span>Daily Streak</span>
              <span>{stats.dailyStreak} days</span>
            </div>
          </div>

          <div className="setting-group">
            <label className="setting-label">Practice Stats</label>
            <div className="stat-row">
              <span>Flashcard Reviews</span>
              <span>{stats.totalReviews}</span>
            </div>
            <div className="stat-row">
              <span>Quizzes Completed</span>
              <span>{stats.totalQuizzes}</span>
            </div>
            <div className="stat-row">
              <span>Perfect Quizzes</span>
              <span>{stats.perfectQuizzes}</span>
            </div>
            <div className="stat-row">
              <span>Sentences Written</span>
              <span>{stats.totalSentences}</span>
            </div>
            <div className="stat-row">
              <span>Listening Exercises</span>
              <span>{stats.totalListening}</span>
            </div>
          </div>

          {settings.srsEnabled && (
            <div className="setting-group">
              <label className="setting-label">Vocabulary Progress</label>
              <div className="stat-row">
                <span>Mastered Words</span>
                <span>{srsStats.mastered}</span>
              </div>
              <div className="stat-row">
                <span>Learning</span>
                <span>{srsStats.learning}</span>
              </div>
              <div className="stat-row">
                <span>New Words</span>
                <span>{srsStats.newCards}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: SETTINGS
  // ═══════════════════════════════════════════════════════════════

  const renderSettings = () => (
    <div className="settings-screen">
      <header className="screen-header">
        <button className="back-btn" onClick={() => setView('home')}>← Back</button>
        <h2>Settings</h2>
      </header>

      <div className="settings-content">
        <div className="setting-group">
          <label className="setting-label">Card Direction</label>
          <select
            className="setting-select"
            value={settings.cardDirection}
            onChange={(e) => updateSetting('cardDirection', e.target.value)}
          >
            <option value="korean-first">Korean → English</option>
            <option value="english-first">English → Korean</option>
          </select>
        </div>

        <div className="setting-group">
          <label className="setting-label">Max Level (for practice)</label>
          <select
            className="setting-select"
            value={settings.maxLevel}
            onChange={(e) => updateSetting('maxLevel', parseInt(e.target.value))}
          >
            {[5, 10, 15, 21, 30, 40].map(level => (
              <option key={level} value={level}>Up to Level {level}</option>
            ))}
          </select>
        </div>

        <div className="setting-group">
          <div className="setting-toggle">
            <span>Show Romanization</span>
            <div 
              className={`toggle-switch ${settings.showRomanization ? 'active' : ''}`}
              onClick={() => updateSetting('showRomanization', !settings.showRomanization)}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-toggle">
            <span>Audio Enabled</span>
            <div 
              className={`toggle-switch ${settings.audioEnabled ? 'active' : ''}`}
              onClick={() => updateSetting('audioEnabled', !settings.audioEnabled)}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-toggle">
            <span>Sound Effects</span>
            <div 
              className={`toggle-switch ${settings.soundEffects ? 'active' : ''}`}
              onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-toggle">
            <span>Spaced Repetition (SRS)</span>
            <div 
              className={`toggle-switch ${settings.srsEnabled ? 'active' : ''}`}
              onClick={() => updateSetting('srsEnabled', !settings.srsEnabled)}
            />
          </div>
        </div>

        <div className="setting-group danger">
          <label className="setting-label">Danger Zone</label>
          <button className="danger-btn" onClick={resetProgress}>
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // RENDER: GRAMMAR REFERENCE
  // ═══════════════════════════════════════════════════════════════

  const renderGrammar = () => {
    // If a grammar point is selected, show detail view
    if (selectedGrammar) {
      const grammar = selectedGrammar;
      const relatedItems = window.getRelatedGrammar ? window.getRelatedGrammar(grammar) : [];
      
      return (
        <div className="grammar-detail-screen">
          <header className="screen-header">
            <button className="back-btn" onClick={() => setSelectedGrammar(null)}>← Back</button>
            <h2>Grammar Detail</h2>
          </header>

          <div className="grammar-detail-content" style={{ padding: '24px 20px' }}>
            <div className="grammar-header" style={{ 
              background: 'var(--bg-card)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '24px',
              marginBottom: '20px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{grammar.emoji}</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{grammar.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{grammar.shortDesc}</p>
              <div style={{ 
                background: 'var(--bg-elevated)', 
                padding: '12px 16px', 
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-korean)',
                fontSize: '1.1rem',
                color: 'var(--accent-primary)'
              }}>
                {grammar.pattern}
              </div>
            </div>

            <div className="grammar-explanation" style={{ 
              background: 'var(--bg-card)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid var(--border-subtle)',
              lineHeight: '1.7'
            }}>
              <h3 style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Explanation</h3>
              <div style={{ whiteSpace: 'pre-wrap' }}>{grammar.explanation}</div>
            </div>

            <div className="grammar-examples" style={{ 
              background: 'var(--bg-card)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Examples</h3>
              {grammar.examples.map((ex, i) => (
                <div key={i} style={{ 
                  padding: '16px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '12px'
                }}>
                  <div style={{ 
                    fontFamily: 'var(--font-korean)', 
                    fontSize: '1.2rem',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    {ex.korean}
                    {settings.audioEnabled && (
                      <button
                        onClick={() => window.Audio?.speak(ex.korean)}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        🔊
                      </button>
                    )}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>{ex.english}</div>
                </div>
              ))}
            </div>

            {grammar.tips && (
              <div className="grammar-tips" style={{ 
                background: 'rgba(255, 107, 157, 0.1)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 107, 157, 0.3)'
              }}>
                <h3 style={{ marginBottom: '8px', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>💡 Pro Tip</h3>
                <p>{grammar.tips}</p>
              </div>
            )}

            {relatedItems.length > 0 && (
              <div className="related-grammar" style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Related Grammar</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {relatedItems.map(related => (
                    <button
                      key={related.id}
                      onClick={() => setSelectedGrammar(related)}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      {related.emoji} {related.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              className="primary-btn" 
              style={{ width: '100%' }}
              onClick={() => {
                // Start flashcards focusing on this grammar point's level
                startFlashcards(grammar.level);
              }}
            >
              Practice Level {grammar.level} Vocabulary
            </button>
          </div>
        </div>
      );
    }

    // Grammar list view
    const grammarByLevel = {};
    (window.GRAMMAR || []).forEach(g => {
      if (!grammarByLevel[g.level]) grammarByLevel[g.level] = [];
      grammarByLevel[g.level].push(g);
    });

    return (
      <div className="grammar-screen">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Grammar Reference</h2>
        </header>

        <div className="grammar-list" style={{ padding: '24px 20px' }}>
          {Object.keys(grammarByLevel).sort((a, b) => a - b).map(level => (
            <div key={level} style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '0.85rem', 
                color: 'var(--accent-primary)', 
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '12px',
                paddingLeft: '4px'
              }}>
                Level {level}
              </h3>
              
              {grammarByLevel[level].map(grammar => (
                <button
                  key={grammar.id}
                  className="level-card"
                  onClick={() => setSelectedGrammar(grammar)}
                  style={{ marginBottom: '8px' }}
                >
                  <div className="level-emoji">{grammar.emoji}</div>
                  <div className="level-info">
                    <h3 className="level-title">{grammar.title}</h3>
                    <p className="level-focus">{grammar.shortDesc}</p>
                    <span className="level-vocab" style={{ 
                      fontFamily: 'var(--font-korean)',
                      color: 'var(--accent-tertiary)'
                    }}>
                      {grammar.pattern}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="app">
      {view === 'home' && renderHome()}
      {view === 'flashcards' && renderFlashcards()}
      {view === 'flashcard-results' && renderFlashcardResults()}
      {view === 'quiz' && renderQuiz()}
      {view === 'quiz-results' && renderQuizResults()}
      {view === 'sentence-builder' && renderSentenceBuilder()}
      {view === 'listening' && renderListening()}
      {view === 'levels' && renderLevels()}
      {view === 'achievements' && renderAchievements()}
      {view === 'stats' && renderStats()}
      {view === 'settings' && renderSettings()}
      {view === 'grammar' && renderGrammar()}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type} animate-slide-up`} style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: toast.type === 'achievement' ? 'var(--gradient-primary)' : 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          color: 'white',
          fontWeight: 600,
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

console.log('✅ Korean Fluency Quest: App loaded');
