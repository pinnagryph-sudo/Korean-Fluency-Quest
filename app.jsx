// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Main Application (v2.4 - Full Feature Release)
// ═══════════════════════════════════════════════════════════════

const { useState, useEffect } = React;

// Storage keys
const STATS_KEY = 'kfq_user_stats';
const SETTINGS_KEY = 'kfq_settings';

const defaultStats = {
  xp: 0,
  totalReviews: 0,
  totalQuizzes: 0,
  totalSentences: 0,
  totalListening: 0,
  // Streak tracking
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  // Wrong answers for review
  wrongAnswers: [],
};

const defaultSettings = {
  showRomanization: true,
  maxLevel: 40,
  audioEnabled: true,
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

function App() {
  const [view, setView] = useState('home');
  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      return stored ? JSON.parse(stored) : defaultStats;
    } catch (e) {
      return defaultStats;
    }
  });
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  });

  // Flashcard state
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Sentence state
  const [sentence, setSentence] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Listening state
  const [listeningWord, setListeningWord] = useState(null);
  const [listeningInput, setListeningInput] = useState('');
  const [listeningFeedback, setListeningFeedback] = useState(null);

  // Grammar state
  const [selectedGrammar, setSelectedGrammar] = useState(null);

  // Dialogue state
  const [dialogue, setDialogue] = useState([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueRole, setDialogueRole] = useState('A'); // Which role user is practicing
  const [dialogueInput, setDialogueInput] = useState('');
  const [dialogueFeedback, setDialogueFeedback] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {}
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Helper to shuffle array
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Get today's date string (YYYY-MM-DD)
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Check if date was yesterday
  const wasYesterday = (dateStr) => {
    if (!dateStr) return false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    return dateStr === yStr;
  };

  // Update streak when user practices
  const updateStreak = () => {
    const today = getTodayString();
    
    setStats(prev => {
      // Already practiced today - no change to streak
      if (prev.lastPracticeDate === today) {
        return prev;
      }
      
      let newStreak;
      if (wasYesterday(prev.lastPracticeDate)) {
        // Practiced yesterday - continue streak
        newStreak = prev.currentStreak + 1;
      } else if (prev.lastPracticeDate === today) {
        // Same day - keep current
        newStreak = prev.currentStreak;
      } else {
        // Missed days - reset to 1
        newStreak = 1;
      }
      
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPracticeDate: today,
      };
    });
  };

  // Track wrong answers for review
  const trackWrongAnswer = (item, type) => {
    setStats(prev => {
      const wrongAnswers = [...(prev.wrongAnswers || [])];
      // Add if not already tracked
      if (!wrongAnswers.find(w => w.id === item.id)) {
        wrongAnswers.push({
          id: item.id,
          korean: item.korean,
          english: item.english,
          type: type,
          timestamp: Date.now(),
        });
        // Keep only last 50 wrong answers
        if (wrongAnswers.length > 50) {
          wrongAnswers.shift();
        }
      }
      return { ...prev, wrongAnswers };
    });
  };

  // Clear a wrong answer after getting it right
  const clearWrongAnswer = (itemId) => {
    setStats(prev => ({
      ...prev,
      wrongAnswers: (prev.wrongAnswers || []).filter(w => w.id !== itemId),
    }));
  };

  // Check streak status on mount
  useEffect(() => {
    const today = getTodayString();
    if (stats.lastPracticeDate && stats.lastPracticeDate !== today && !wasYesterday(stats.lastPracticeDate)) {
      // Streak broken - reset (but don't save yet, let them practice today to start new streak)
    }
  }, []);

  // Play audio
  const playAudio = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // FLASHCARD FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startFlashcards = () => {
    console.log('Starting flashcards...');
    const vocab = window.VOCABULARY || [];
    console.log('Vocabulary count:', vocab.length);
    
    if (vocab.length === 0) {
      alert('No vocabulary loaded!');
      return;
    }

    const filtered = vocab.filter(v => v.level <= settings.maxLevel);
    const shuffled = shuffle(filtered).slice(0, 20);
    
    setDeck(shuffled);
    setCardIndex(0);
    setIsFlipped(false);
    setCorrect(0);
    setView('flashcards');
  };

  const nextCard = (wasCorrect) => {
    const card = deck[cardIndex];
    
    if (wasCorrect) {
      setCorrect(c => c + 1);
      setStats(s => ({ ...s, xp: s.xp + 5, totalReviews: s.totalReviews + 1 }));
      clearWrongAnswer(card.id);
    } else {
      trackWrongAnswer(card, 'flashcard');
    }
    
    if (cardIndex < deck.length - 1) {
      setCardIndex(i => i + 1);
      setIsFlipped(false);
    } else {
      updateStreak();
      setView('flashcard-results');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // QUIZ FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startQuiz = () => {
    console.log('Starting quiz...');
    const vocab = window.VOCABULARY || [];
    
    if (vocab.length < 4) {
      alert('Not enough vocabulary for quiz!');
      return;
    }

    const filtered = vocab.filter(v => v.level <= settings.maxLevel);
    const shuffled = shuffle(filtered);
    const questions = shuffled.slice(0, 10).map(q => {
      const wrongAnswers = shuffle(filtered.filter(v => v.id !== q.id))
        .slice(0, 3)
        .map(v => v.english);
      return {
        korean: q.korean,
        correct: q.english,
        options: shuffle([q.english, ...wrongAnswers]),
      };
    });

    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setView('quiz');
  };

  const answerQuiz = (answer) => {
    setSelectedAnswer(answer);
    const q = quizQuestions[quizIndex];
    const isCorrect = answer === q.correct;
    
    if (isCorrect) {
      setQuizScore(s => s + 1);
      setStats(s => ({ ...s, xp: s.xp + 10 }));
    } else {
      // Track wrong answer
      trackWrongAnswer({ id: `quiz-${quizIndex}`, korean: q.korean, english: q.correct }, 'quiz');
    }

    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(i => i + 1);
        setSelectedAnswer(null);
      } else {
        updateStreak();
        setStats(s => ({ ...s, totalQuizzes: s.totalQuizzes + 1 }));
        setView('quiz-results');
      }
    }, 1000);
  };

  // ═══════════════════════════════════════════════════════════════
  // SENTENCE BUILDER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startSentence = () => {
    console.log('Starting sentence builder...');
    const sentences = window.SENTENCES || [];
    
    if (sentences.length === 0) {
      alert('No sentences loaded!');
      return;
    }

    const filtered = sentences.filter(s => s.level <= settings.maxLevel);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    
    setSentence(random);
    setUserInput('');
    setFeedback(null);
    setView('sentence');
  };

  const checkSentence = () => {
    const normalize = (s) => s.trim().replace(/\s+/g, '').replace(/[.,!?]/g, '');
    const isCorrect = normalize(userInput) === normalize(sentence.korean);
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      updateStreak();
      setStats(s => ({ ...s, xp: s.xp + 15, totalSentences: s.totalSentences + 1 }));
    } else {
      trackWrongAnswer(sentence, 'sentence');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // LISTENING FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startListening = () => {
    console.log('Starting listening...');
    const vocab = window.VOCABULARY || [];
    
    if (vocab.length === 0) {
      alert('No vocabulary loaded!');
      return;
    }

    const filtered = vocab.filter(v => v.level <= settings.maxLevel);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    
    setListeningWord(random);
    setListeningInput('');
    setListeningFeedback(null);
    setView('listening');
  };

  const checkListening = () => {
    const normalize = (s) => s.trim().replace(/\s+/g, '');
    const isCorrect = normalize(listeningInput) === normalize(listeningWord.korean);
    
    setListeningFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      updateStreak();
      setStats(s => ({ ...s, xp: s.xp + 12, totalListening: s.totalListening + 1 }));
      clearWrongAnswer(listeningWord.id);
    } else {
      trackWrongAnswer(listeningWord, 'listening');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // DIALOGUE FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const getDialogues = () => {
    // Get all dialogue lines (those with speaker property)
    const sentences = window.SENTENCES || [];
    console.log('Total sentences loaded:', sentences.length);
    const dialogues = sentences.filter(s => s.speaker && s.speaker !== '');
    console.log('Sentences with speaker property:', dialogues.length);
    return dialogues;
  };

  const getDialogueConversations = () => {
    // Group dialogues into conversations by level
    const dialogues = getDialogues();
    
    if (dialogues.length === 0) {
      console.error('No dialogues found! window.SENTENCES may not have loaded correctly.');
      console.log('window.SENTENCES exists:', !!window.SENTENCES);
      console.log('window.SENTENCES length:', window.SENTENCES ? window.SENTENCES.length : 0);
      // Log first few sentences to debug
      if (window.SENTENCES && window.SENTENCES.length > 0) {
        console.log('First 3 sentences:', window.SENTENCES.slice(0, 3));
        console.log('First sentence with "d" id:', window.SENTENCES.find(s => s.id && s.id.startsWith('d')));
      }
      return [];
    }
    
    // Group by level
    const byLevel = {};
    dialogues.forEach(line => {
      if (!byLevel[line.level]) {
        byLevel[line.level] = [];
      }
      byLevel[line.level].push(line);
    });

    // Convert to array of conversations, only include those with at least 4 lines
    const conversations = Object.values(byLevel).filter(convo => convo.length >= 4);
    
    console.log('Dialogue levels found:', Object.keys(byLevel).join(', '));
    console.log('Conversations with 4+ lines:', conversations.length);
    return conversations;
  };

  const startDialogue = (role = 'B') => {
    console.log('=== Starting dialogue practice ===');
    const conversations = getDialogueConversations();
    console.log('Total conversations available:', conversations.length);
    
    if (conversations.length === 0) {
      console.error('No conversations found!');
      alert('No dialogues available! Check browser console (F12) for details. Try clearing cache: Ctrl+Shift+R');
      return;
    }

    // Filter by max level
    const filtered = conversations.filter(c => c[0].level <= settings.maxLevel);
    console.log('After filtering by maxLevel (' + settings.maxLevel + '):', filtered.length, 'conversations');
    
    if (filtered.length === 0) {
      alert('No dialogues at your current level (' + settings.maxLevel + ')! Try increasing max level in Settings.');
      return;
    }

    // Pick random conversation
    const randomConvo = filtered[Math.floor(Math.random() * filtered.length)];
    console.log('Selected conversation at level', randomConvo[0].level, 'with', randomConvo.length, 'lines');
    
    setDialogue(randomConvo);
    setDialogueIndex(0);
    setDialogueRole(role);
    setDialogueInput('');
    setDialogueFeedback(null);
    setShowTranslation(false);
    setView('dialogue');
  };

  const checkDialogueAnswer = () => {
    const currentLine = dialogue[dialogueIndex];
    const normalize = (s) => s.trim().replace(/\s+/g, '').replace(/[.,!?ㅋ]/g, '').toLowerCase();
    const isCorrect = normalize(dialogueInput) === normalize(currentLine.korean);
    
    setDialogueFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setStats(s => ({ ...s, xp: s.xp + 8 }));
    } else {
      trackWrongAnswer(currentLine, 'dialogue');
    }
  };

  const advanceDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(i => i + 1);
      setDialogueInput('');
      setDialogueFeedback(null);
      setShowTranslation(false);
    } else {
      // Dialogue complete
      updateStreak();
      setView('dialogue-results');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: HOME
  // ═══════════════════════════════════════════════════════════════

  if (view === 'home') {
    return (
      <div className="app">
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
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{stats.currentStreak || 0}</span>
            <span className="stat-label">Day Streak</span>
          </div>
          <div className="stat">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{stats.xp || 0}</span>
            <span className="stat-label">XP</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📖</span>
            <span className="stat-value">{stats.totalReviews || 0}</span>
            <span className="stat-label">Reviews</span>
          </div>
          <div className="stat">
            <span className="stat-icon">✓</span>
            <span className="stat-value">{stats.totalQuizzes || 0}</span>
            <span className="stat-label">Quizzes</span>
          </div>
        </div>

        {/* Streak Banner */}
        {stats.currentStreak >= 3 && (
          <div className="streak-banner">
            <span className="streak-fire">🔥</span>
            <span className="streak-text">{stats.currentStreak} Day Streak!</span>
            <span className="streak-fire">🔥</span>
          </div>
        )}

        <nav className="practice-modes">
          <h2 className="section-title">Practice Modes</h2>
          
          <button className="mode-card" onClick={startFlashcards}>
            <div className="mode-icon">🃏</div>
            <div className="mode-info">
              <h3>Flashcards</h3>
              <p>Review vocabulary</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startQuiz}>
            <div className="mode-icon">❓</div>
            <div className="mode-info">
              <h3>Vocabulary Quiz</h3>
              <p>Test your knowledge</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startSentence}>
            <div className="mode-icon">✍️</div>
            <div className="mode-info">
              <h3>Sentence Builder</h3>
              <p>Write Korean sentences</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startListening}>
            <div className="mode-icon">👂</div>
            <div className="mode-info">
              <h3>Listening Practice</h3>
              <p>Train your ears</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => startDialogue('B')}>
            <div className="mode-icon">💬</div>
            <div className="mode-info">
              <h3>Dialogue Practice</h3>
              <p>Practice conversations</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('levels')}>
            <div className="mode-icon">📚</div>
            <div className="mode-info">
              <h3>Browse Levels</h3>
              <p>Study by topic</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('grammar')}>
            <div className="mode-icon">📖</div>
            <div className="mode-info">
              <h3>Grammar Reference</h3>
              <p>Learn grammar rules</p>
            </div>
            <div className="mode-arrow">→</div>
          </button>

          {/* Review Mistakes - only show if there are mistakes */}
          {(stats.wrongAnswers?.length > 0) && (
            <button className="mode-card review-mistakes" onClick={() => setView('review-mistakes')}>
              <div className="mode-icon">🔄</div>
              <div className="mode-info">
                <h3>Review Mistakes</h3>
                <p>{stats.wrongAnswers.length} words to review</p>
              </div>
              <div className="mode-arrow">→</div>
            </button>
          )}
        </nav>

        <div className="quick-actions">
          <button className="quick-btn" onClick={() => setView('stats')}>
            📊 Statistics
          </button>
          <button className="quick-btn" onClick={() => setView('settings')}>
            ⚙️ Settings
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: REVIEW MISTAKES
  // ═══════════════════════════════════════════════════════════════

  if (view === 'review-mistakes') {
    const wrongAnswers = stats.wrongAnswers || [];
    
    if (wrongAnswers.length === 0) {
      return (
        <div className="app">
          <header className="screen-header">
            <button className="back-btn" onClick={() => setView('home')}>← Back</button>
            <h2>Review Mistakes</h2>
          </header>
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 20 }}>🎉</div>
            <h2>No mistakes to review!</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 10 }}>
              Keep practicing and check back here for any words you miss.
            </p>
            <button className="primary-btn" style={{ marginTop: 24 }} onClick={() => setView('home')}>
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Review Mistakes ({wrongAnswers.length})</h2>
        </header>

        <div style={{ padding: 20 }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20, textAlign: 'center' }}>
            These are words you have missed. Tap to clear when you have learned them.
          </p>
          
          {wrongAnswers.map((item, i) => (
            <div key={item.id || i} className="mistake-card" style={{
              background: 'var(--bg-card)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <p style={{ fontSize: '1.3rem', marginBottom: 4 }}>{item.korean}</p>
                <p style={{ color: 'var(--text-secondary)' }}>{item.english}</p>
                <span style={{ 
                  fontSize: '0.75rem', 
                  background: 'var(--bg-elevated)', 
                  padding: '2px 8px', 
                  borderRadius: 4,
                  color: 'var(--text-tertiary)',
                }}>
                  {item.type}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="secondary-btn"
                  style={{ padding: '8px 12px' }}
                  onClick={() => playAudio(item.korean)}
                >
                  🔊
                </button>
                <button 
                  className="primary-btn"
                  style={{ padding: '8px 12px' }}
                  onClick={() => clearWrongAnswer(item.id)}
                >
                  ✓ Got it
                </button>
              </div>
            </div>
          ))}

          <button 
            className="danger-btn" 
            style={{ width: '100%', marginTop: 20 }}
            onClick={() => {
              if (confirm('Clear all mistakes?')) {
                setStats(s => ({ ...s, wrongAnswers: [] }));
              }
            }}
          >
            Clear All Mistakes
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: STATISTICS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'stats') {
    const today = getTodayString();
    const practicedToday = stats.lastPracticeDate === today;
    
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Statistics</h2>
        </header>

        <div style={{ padding: 20 }}>
          {/* Streak Card */}
          <div style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 20,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 8 }}>🔥</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stats.currentStreak || 0}</div>
            <div style={{ opacity: 0.9 }}>Day Streak</div>
            <div style={{ marginTop: 12, fontSize: '0.9rem', opacity: 0.8 }}>
              Best: {stats.longestStreak || 0} days
            </div>
            {!practicedToday && (
              <div style={{ 
                marginTop: 12, 
                padding: '8px 16px', 
                background: 'rgba(0,0,0,0.2)', 
                borderRadius: 8,
                fontSize: '0.85rem',
              }}>
                Practice today to keep your streak! 💪
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 12,
            marginBottom: 20,
          }}>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>⚡</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.xp || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total XP</div>
            </div>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>📖</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalReviews || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Cards Reviewed</div>
            </div>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>❓</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalQuizzes || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Quizzes Completed</div>
            </div>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>✍️</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalSentences || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Sentences Written</div>
            </div>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>👂</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.totalListening || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Listening Exercises</div>
            </div>
            <div className="stat-card" style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🔄</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.wrongAnswers?.length || 0}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Words to Review</div>
            </div>
          </div>

          {/* Vocabulary Progress */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 16 }}>
            <h3 style={{ marginBottom: 12 }}>Vocabulary Progress</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Words in app</span>
              <span>{(window.VOCABULARY || []).length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Your max level</span>
              <span>Level {settings.maxLevel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Words at your level</span>
              <span>{(window.VOCABULARY || []).filter(v => v.level <= settings.maxLevel).length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FLASHCARDS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'flashcards') {
    if (deck.length === 0) {
      return (
        <div className="app">
          <p style={{ padding: 20, textAlign: 'center' }}>Loading cards...</p>
        </div>
      );
    }

    const card = deck[cardIndex];

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{cardIndex + 1} / {deck.length}</div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }}></div>
        </div>

        <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-face card-front">
              <span className="card-level">Level {card.level}</span>
              <p className="card-korean">{card.korean}</p>
              {settings.showRomanization && card.romanization && (
                <p className="card-romanization">{card.romanization}</p>
              )}
              <span className="tap-hint">Tap to flip</span>
            </div>
            <div className="card-face card-back">
              <p className="card-english">{card.english}</p>
              {card.example && <p className="card-example">{card.example}</p>}
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="response-buttons">
            <button className="response-btn again" onClick={() => nextCard(false)}>
              <span>❌ Wrong</span>
            </button>
            <button className="response-btn good" onClick={() => nextCard(true)}>
              <span>✓ Correct</span>
            </button>
          </div>
        )}

        {settings.audioEnabled && (
          <button 
            className="primary-btn" 
            style={{ margin: '20px auto', display: 'block' }}
            onClick={() => playAudio(card.korean)}
          >
            🔊 Play Audio
          </button>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FLASHCARD RESULTS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'flashcard-results') {
    const accuracy = deck.length > 0 ? Math.round((correct / deck.length) * 100) : 0;

    return (
      <div className="app">
        <div className="results-screen">
          <div className="results-card">
            <h2>Session Complete! 🎉</h2>
            <div className="results-stats">
              <div className="result-stat">
                <span className="result-value">{correct}/{deck.length}</span>
                <span className="result-label">Correct</span>
              </div>
              <div className="result-stat">
                <span className="result-value">{accuracy}%</span>
                <span className="result-label">Accuracy</span>
              </div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={startFlashcards}>
                Practice Again
              </button>
              <button className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: QUIZ
  // ═══════════════════════════════════════════════════════════════

  if (view === 'quiz') {
    if (quizQuestions.length === 0) {
      return (
        <div className="app">
          <p style={{ padding: 20, textAlign: 'center' }}>Loading quiz...</p>
        </div>
      );
    }

    const q = quizQuestions[quizIndex];

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">Question {quizIndex + 1} / {quizQuestions.length}</div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}></div>
        </div>

        <div className="quiz-content" style={{ padding: 20 }}>
          <div className="quiz-question">
            <span className="question-label">What does this mean?</span>
            <p className="question-korean">{q.korean}</p>
          </div>

          <div className="quiz-options">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`quiz-option ${
                  selectedAnswer === option
                    ? option === q.correct ? 'correct' : 'incorrect'
                    : ''
                } ${selectedAnswer && option === q.correct ? 'show-correct' : ''}`}
                onClick={() => !selectedAnswer && answerQuiz(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: QUIZ RESULTS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'quiz-results') {
    const percentage = quizQuestions.length > 0 
      ? Math.round((quizScore / quizQuestions.length) * 100) 
      : 0;

    return (
      <div className="app">
        <div className="results-screen">
          <div className="results-card">
            <h2>Quiz Complete! 🎉</h2>
            <div className="results-stats">
              <div className="result-stat">
                <span className="result-value">{quizScore}/{quizQuestions.length}</span>
                <span className="result-label">Correct</span>
              </div>
              <div className="result-stat">
                <span className="result-value">{percentage}%</span>
                <span className="result-label">Score</span>
              </div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={startQuiz}>
                Try Again
              </button>
              <button className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: SENTENCE BUILDER
  // ═══════════════════════════════════════════════════════════════

  if (view === 'sentence') {
    if (!sentence) {
      return (
        <div className="app">
          <p style={{ padding: 20, textAlign: 'center' }}>Loading sentence...</p>
        </div>
      );
    }

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Sentence Builder</h2>
        </header>

        <div className="sentence-content" style={{ padding: 20 }}>
          <div className="sentence-prompt">
            <span className="prompt-label">Translate to Korean:</span>
            <p className="prompt-english">{sentence.english}</p>
          </div>

          <div className="sentence-input-area">
            <input
              type="text"
              className={`sentence-input ${feedback || ''}`}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type in Korean..."
              disabled={feedback !== null}
            />
            
            {!feedback && (
              <button 
                className="primary-btn"
                style={{ width: '100%', marginTop: 16 }}
                onClick={checkSentence}
                disabled={!userInput.trim()}
              >
                Check Answer
              </button>
            )}
          </div>

          {feedback && (
            <div className={`sentence-feedback ${feedback}`}>
              {feedback === 'correct' ? (
                <span>✓ Correct! 완벽해요!</span>
              ) : (
                <div>
                  <p>✗ Not quite. The answer is:</p>
                  <p className="correct-answer">{sentence.korean}</p>
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startSentence}>
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
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: LISTENING
  // ═══════════════════════════════════════════════════════════════

  if (view === 'listening') {
    if (!listeningWord) {
      return (
        <div className="app">
          <p style={{ padding: 20, textAlign: 'center' }}>Loading...</p>
        </div>
      );
    }

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Listening Practice</h2>
        </header>

        <div className="sentence-content" style={{ padding: 20 }}>
          <div className="listening-prompt" style={{ textAlign: 'center', marginBottom: 30 }}>
            <p style={{ marginBottom: 20, color: 'var(--text-secondary)' }}>Listen and type what you hear:</p>
            
            <button 
              className="primary-btn"
              style={{ fontSize: '1.5rem', padding: '20px 40px' }}
              onClick={() => playAudio(listeningWord.korean)}
            >
              🔊 Play
            </button>

            <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="secondary-btn" onClick={() => playAudio(listeningWord.korean, 0.6)}>
                🐢 Slow
              </button>
              <button className="secondary-btn" onClick={() => playAudio(listeningWord.korean, 1.0)}>
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
              placeholder="Type what you hear..."
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
                <div>
                  <span>✓ Correct!</span>
                  <p className="correct-answer">{listeningWord.korean}</p>
                  <p style={{ opacity: 0.8 }}>{listeningWord.english}</p>
                </div>
              ) : (
                <div>
                  <p>✗ The answer was:</p>
                  <p className="correct-answer">{listeningWord.korean}</p>
                  <p style={{ opacity: 0.8 }}>{listeningWord.english}</p>
                </div>
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
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: DIALOGUE PRACTICE
  // ═══════════════════════════════════════════════════════════════

  if (view === 'dialogue') {
    if (dialogue.length === 0) {
      return (
        <div className="app">
          <p style={{ padding: 20, textAlign: 'center' }}>Loading dialogue...</p>
        </div>
      );
    }

    const currentLine = dialogue[dialogueIndex];
    const isUserTurn = currentLine.speaker === dialogueRole;
    const otherRole = dialogueRole === 'A' ? 'B' : 'A';

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">Line {dialogueIndex + 1} / {dialogue.length}</div>
        </header>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((dialogueIndex + 1) / dialogue.length) * 100}%` }}></div>
        </div>

        <div style={{ padding: 20 }}>
          {/* Role indicator */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 16,
            padding: '8px 16px',
            background: 'var(--bg-card)',
            borderRadius: 8,
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}>
            You are practicing as <strong style={{ color: 'var(--accent-primary)' }}>Person {dialogueRole}</strong>
          </div>

          {/* Conversation history */}
          <div style={{ marginBottom: 20 }}>
            {dialogue.slice(0, dialogueIndex + 1).map((line, i) => {
              const isUser = line.speaker === dialogueRole;
              const isCurrent = i === dialogueIndex;
              
              return (
                <div 
                  key={line.id}
                  style={{
                    display: 'flex',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    marginBottom: 12,
                    opacity: isCurrent ? 1 : 0.7,
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: 16,
                    background: isUser ? 'var(--accent-primary)' : 'var(--bg-card)',
                    borderBottomRightRadius: isUser ? 4 : 16,
                    borderBottomLeftRadius: isUser ? 16 : 4,
                  }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: 4 }}>
                      {line.speaker === dialogueRole ? 'You' : `Person ${line.speaker}`}
                    </div>
                    {/* Show Korean if not current user turn OR if feedback given */}
                    {(!isCurrent || !isUser || dialogueFeedback) && (
                      <p style={{ fontSize: '1.1rem', marginBottom: 4 }}>{line.korean}</p>
                    )}
                    {/* Show placeholder if current user turn and no feedback */}
                    {isCurrent && isUser && !dialogueFeedback && (
                      <p style={{ fontSize: '1.1rem', marginBottom: 4, opacity: 0.5 }}>???</p>
                    )}
                    {/* Show translation toggle */}
                    {(!isCurrent || !isUser || dialogueFeedback || showTranslation) && (
                      <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{line.english}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* User input area - only show on user turns */}
          {isUserTurn && !dialogueFeedback && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ 
                background: 'var(--bg-elevated)', 
                padding: 12, 
                borderRadius: 8, 
                marginBottom: 12,
                textAlign: 'center',
              }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Your turn! Respond in Korean:</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>"{currentLine.english}"</p>
              </div>
              
              <input
                type="text"
                className="sentence-input"
                value={dialogueInput}
                onChange={(e) => setDialogueInput(e.target.value)}
                placeholder="Type your response in Korean..."
                autoFocus
              />
              
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button 
                  className="primary-btn"
                  style={{ flex: 1 }}
                  onClick={checkDialogueAnswer}
                  disabled={!dialogueInput.trim()}
                >
                  Check Answer
                </button>
                <button 
                  className="secondary-btn"
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  💡 Hint
                </button>
              </div>
              
              {showTranslation && (
                <div style={{ 
                  marginTop: 12, 
                  padding: 12, 
                  background: 'rgba(255,107,157,0.1)', 
                  borderRadius: 8,
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Answer:</p>
                  <p style={{ fontSize: '1.1rem' }}>{currentLine.korean}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback for user turns */}
          {isUserTurn && dialogueFeedback && (
            <div className={`sentence-feedback ${dialogueFeedback}`} style={{ marginBottom: 20 }}>
              {dialogueFeedback === 'correct' ? (
                <span>✓ Perfect! 잘했어요!</span>
              ) : (
                <div>
                  <p>The correct response was:</p>
                  <p className="correct-answer">{currentLine.korean}</p>
                </div>
              )}
            </div>
          )}

          {/* Continue button - for partner turns or after feedback */}
          {(!isUserTurn || dialogueFeedback) && (
            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                className="secondary-btn"
                onClick={() => playAudio(currentLine.korean)}
              >
                🔊 Listen
              </button>
              <button 
                className="primary-btn"
                style={{ flex: 1 }}
                onClick={advanceDialogue}
              >
                {dialogueIndex < dialogue.length - 1 ? 'Continue →' : 'Finish 🎉'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: DIALOGUE RESULTS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'dialogue-results') {
    return (
      <div className="app">
        <div className="results-screen">
          <div className="results-card">
            <h2>Dialogue Complete! 🎉</h2>
            <div style={{ fontSize: '4rem', margin: '20px 0' }}>💬</div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
              Great job practicing conversation!
            </p>
            <div className="results-stats">
              <div className="result-stat">
                <span className="result-value">{dialogue.length}</span>
                <span className="result-label">Lines Practiced</span>
              </div>
              <div className="result-stat">
                <span className="result-value">+{dialogue.filter(d => d.speaker === dialogueRole).length * 8}</span>
                <span className="result-label">XP Earned</span>
              </div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={() => startDialogue(dialogueRole)}>
                Practice Again
              </button>
              <button className="secondary-btn" onClick={() => startDialogue(dialogueRole === 'A' ? 'B' : 'A')}>
                Switch Roles
              </button>
              <button className="secondary-btn" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: LEVELS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'levels') {
    const levels = window.LEVELS || [];

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Browse Levels</h2>
        </header>

        <div className="levels-grid" style={{ padding: 20 }}>
          {levels.map(level => {
            const vocabCount = (window.VOCABULARY || []).filter(v => v.level === level.level).length;
            
            return (
              <button
                key={level.level}
                className="level-card"
                onClick={() => {
                  const vocab = (window.VOCABULARY || []).filter(v => v.level === level.level);
                  if (vocab.length > 0) {
                    setDeck(shuffle(vocab).slice(0, 20));
                    setCardIndex(0);
                    setIsFlipped(false);
                    setCorrect(0);
                    setView('flashcards');
                  } else {
                    alert('No vocabulary for this level yet!');
                  }
                }}
              >
                <div className="level-emoji">{level.emoji}</div>
                <div className="level-info">
                  <span className="level-number">Level {level.level}</span>
                  <h3 className="level-title">{level.title}</h3>
                  <p className="level-focus">{level.focus}</p>
                  {vocabCount > 0 && <span className="level-vocab">{vocabCount} words</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: GRAMMAR
  // ═══════════════════════════════════════════════════════════════

  if (view === 'grammar') {
    const grammar = window.GRAMMAR || [];

    if (selectedGrammar) {
      return (
        <div className="app">
          <header className="screen-header">
            <button className="back-btn" onClick={() => setSelectedGrammar(null)}>← Back</button>
            <h2>Grammar</h2>
          </header>

          <div style={{ padding: 20 }}>
            <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{selectedGrammar.emoji}</div>
              <h2 style={{ marginBottom: 8 }}>{selectedGrammar.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>{selectedGrammar.shortDesc}</p>
              <div style={{ background: 'var(--bg-elevated)', padding: 12, borderRadius: 8, color: 'var(--accent-primary)' }}>
                {selectedGrammar.pattern}
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20, marginBottom: 20, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {selectedGrammar.explanation}
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: 20 }}>
              <h3 style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>Examples</h3>
              {selectedGrammar.examples.map((ex, i) => (
                <div key={i} style={{ padding: 12, background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 10 }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: 6 }}>{ex.korean}</p>
                  <p style={{ color: 'var(--text-secondary)' }}>{ex.english}</p>
                </div>
              ))}
            </div>

            {selectedGrammar.tips && (
              <div style={{ background: 'rgba(255, 107, 157, 0.1)', borderRadius: 12, padding: 20, marginTop: 20 }}>
                <strong style={{ color: 'var(--accent-primary)' }}>💡 Tip:</strong> {selectedGrammar.tips}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Group grammar by level
    const byLevel = {};
    grammar.forEach(g => {
      if (!byLevel[g.level]) byLevel[g.level] = [];
      byLevel[g.level].push(g);
    });

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Grammar Reference</h2>
        </header>

        <div style={{ padding: 20 }}>
          {Object.keys(byLevel).sort((a, b) => a - b).map(level => (
            <div key={level} style={{ marginBottom: 24 }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: 10, textTransform: 'uppercase' }}>
                Level {level}
              </h3>
              {byLevel[level].map(g => (
                <button
                  key={g.id}
                  className="level-card"
                  style={{ marginBottom: 8 }}
                  onClick={() => setSelectedGrammar(g)}
                >
                  <div className="level-emoji">{g.emoji}</div>
                  <div className="level-info">
                    <h3 className="level-title">{g.title}</h3>
                    <p className="level-focus">{g.shortDesc}</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: SETTINGS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'settings') {
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Settings</h2>
        </header>

        <div className="settings-content" style={{ padding: 20 }}>
          <div className="setting-group">
            <label className="setting-label">Max Level (for practice)</label>
            <select
              className="setting-select"
              value={settings.maxLevel}
              onChange={(e) => setSettings(s => ({ ...s, maxLevel: parseInt(e.target.value) }))}
            >
              {[5, 10, 15, 20, 25, 30, 35, 40].map(level => (
                <option key={level} value={level}>Up to Level {level}</option>
              ))}
            </select>
          </div>

          <div className="setting-group">
            <div className="setting-toggle">
              <span>Show Romanization</span>
              <div 
                className={`toggle-switch ${settings.showRomanization ? 'active' : ''}`}
                onClick={() => setSettings(s => ({ ...s, showRomanization: !s.showRomanization }))}
              />
            </div>
          </div>

          <div className="setting-group">
            <div className="setting-toggle">
              <span>Audio Enabled</span>
              <div 
                className={`toggle-switch ${settings.audioEnabled ? 'active' : ''}`}
                onClick={() => setSettings(s => ({ ...s, audioEnabled: !s.audioEnabled }))}
              />
            </div>
          </div>

          <div className="setting-group danger">
            <label className="setting-label">Danger Zone</label>
            <button 
              className="danger-btn" 
              onClick={() => {
                if (confirm('Reset all progress?')) {
                  setStats(defaultStats);
                  localStorage.removeItem(STATS_KEY);
                }
              }}
            >
              Reset All Progress
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="app">
      <p style={{ padding: 20 }}>Unknown view: {view}</p>
      <button className="primary-btn" onClick={() => setView('home')}>Go Home</button>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

console.log('✅ Korean Fluency Quest v2.1 loaded');
