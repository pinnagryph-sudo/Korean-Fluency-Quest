// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Main Application (v2.5 - Standalone)
// ═══════════════════════════════════════════════════════════════

const { useState, useEffect } = React;

// ═══════════════════════════════════════════════════════════════
// EMBEDDED DIALOGUES - No external file dependency!
// ═══════════════════════════════════════════════════════════════
const EMBEDDED_DIALOGUES = [
  { id: 'd001', korean: '안녕하세요!', english: 'Hello!', level: 3, speaker: 'A' },
  { id: 'd002', korean: '저는 민수예요. 이름이 뭐예요?', english: "I'm Minsu. What's your name?", level: 3, speaker: 'A' },
  { id: 'd003', korean: '저는 지연이에요.', english: "I'm Jiyeon.", level: 3, speaker: 'B' },
  { id: 'd004', korean: '지연 씨는 학생이에요?', english: 'Jiyeon, are you a student?', level: 3, speaker: 'A' },
  { id: 'd005', korean: '네, 저는 학생이에요. 민수 씨는요?', english: 'Yes, I am a student. How about you, Minsu?', level: 3, speaker: 'B' },
  { id: 'd006', korean: '저는 회사원이에요.', english: 'I am an office worker.', level: 3, speaker: 'A' },
  { id: 'd007', korean: '아, 그래요? 반갑습니다!', english: 'Oh, really? Nice to meet you!', level: 3, speaker: 'B' },
  { id: 'd008', korean: '이거 뭐예요?', english: 'What is this?', level: 5, speaker: 'A' },
  { id: 'd009', korean: '그거 제 가방이에요.', english: 'That is my bag.', level: 5, speaker: 'B' },
  { id: 'd010', korean: '예뻐요! 어디서 샀어요?', english: 'It is pretty! Where did you buy it?', level: 5, speaker: 'A' },
  { id: 'd011', korean: '인터넷에서 샀어요.', english: 'I bought it on the internet.', level: 5, speaker: 'B' },
  { id: 'd012', korean: '얼마예요?', english: 'How much is it?', level: 5, speaker: 'A' },
  { id: 'd013', korean: '3만원이에요.', english: 'It is 30,000 won.', level: 5, speaker: 'B' },
  { id: 'd014', korean: '저는 수진이에요. 어디서 왔어요?', english: "I'm Sujin. Where are you from?", level: 9, speaker: 'A' },
  { id: 'd015', korean: '미국에서 왔어요. 수진 씨는요?', english: "I'm from America. How about you?", level: 9, speaker: 'B' },
  { id: 'd016', korean: '저는 서울 사람이에요. 뭐 하세요?', english: "I'm from Seoul. What do you do?", level: 9, speaker: 'A' },
  { id: 'd017', korean: '학생이에요. 한국어 공부해요.', english: "I'm a student. I study Korean.", level: 9, speaker: 'B' },
  { id: 'd018', korean: '아, 그래요? 왜 한국어 공부해요?', english: 'Oh, really? Why do you study Korean?', level: 9, speaker: 'A' },
  { id: 'd019', korean: 'K-드라마 좋아해요!', english: 'I like K-dramas!', level: 9, speaker: 'B' },
  { id: 'd020', korean: '저도요!', english: 'Me too!', level: 9, speaker: 'A' },
  { id: 'd021', korean: '주말에 뭐 하고 싶어요?', english: 'What do you want to do on the weekend?', level: 10, speaker: 'A' },
  { id: 'd022', korean: '영화 보고 싶어요.', english: 'I want to watch a movie.', level: 10, speaker: 'B' },
  { id: 'd023', korean: '무슨 영화 보고 싶어요?', english: 'What movie do you want to watch?', level: 10, speaker: 'A' },
  { id: 'd024', korean: '한국 영화 보고 싶어요! 추천 있어요?', english: 'I want to watch a Korean movie! Any recommendations?', level: 10, speaker: 'B' },
  { id: 'd025', korean: '기생충 봤어요?', english: 'Have you seen Parasite?', level: 10, speaker: 'A' },
  { id: 'd026', korean: '아니요, 아직이요. 재미있어요?', english: 'No, not yet. Is it good?', level: 10, speaker: 'B' },
  { id: 'd027', korean: '네! 진짜 재미있어요. 같이 봐요!', english: "Yes! It's really good. Let's watch together!", level: 10, speaker: 'A' },
  { id: 'd028', korean: '좋아요!', english: 'Sounds good!', level: 10, speaker: 'B' },
  { id: 'd029', korean: '주말에 시간 있어요?', english: 'Do you have time on the weekend?', level: 11, speaker: 'A' },
  { id: 'd030', korean: '네, 토요일 오후에 괜찮아요.', english: 'Yes, Saturday afternoon works.', level: 11, speaker: 'B' },
  { id: 'd031', korean: '뭐 할까요?', english: 'What shall we do?', level: 11, speaker: 'A' },
  { id: 'd032', korean: '맛있는 거 먹을까요?', english: 'Shall we eat something delicious?', level: 11, speaker: 'B' },
  { id: 'd033', korean: '좋아요! 어디 갈까요?', english: 'Sounds good! Where shall we go?', level: 11, speaker: 'A' },
  { id: 'd034', korean: '새로운 한식당 어때요?', english: 'How about a new Korean restaurant?', level: 11, speaker: 'B' },
  { id: 'd035', korean: '좋아요! 몇 시에 만날까요?', english: 'Good! What time shall we meet?', level: 11, speaker: 'A' },
  { id: 'd036', korean: '2시 어때요?', english: "How about 2 o'clock?", level: 11, speaker: 'B' },
  { id: 'd037', korean: '그래요! 거기서 만나요.', english: "Okay! Let's meet there.", level: 11, speaker: 'A' },
  { id: 'd038', korean: '주말에 같이 영화 볼까요?', english: 'Shall we watch a movie together on the weekend?', level: 13, speaker: 'A' },
  { id: 'd039', korean: '미안해요, 이번 주말에 못 가요.', english: "Sorry, I can't go this weekend.", level: 13, speaker: 'B' },
  { id: 'd040', korean: '왜요? 바빠요?', english: 'Why? Are you busy?', level: 13, speaker: 'A' },
  { id: 'd041', korean: '네, 시험이 있어서 공부해야 돼요.', english: 'Yes, I have an exam so I have to study.', level: 13, speaker: 'B' },
  { id: 'd042', korean: '아, 그래요? 힘내세요!', english: 'Oh, really? Good luck!', level: 13, speaker: 'A' },
  { id: 'd043', korean: '감사합니다! 다음 주에 갈까요?', english: 'Thank you! Shall we go next week?', level: 13, speaker: 'B' },
  { id: 'd044', korean: '좋아요! 다음 주에 봐요.', english: 'Sounds good! See you next week.', level: 13, speaker: 'A' },
  { id: 'd045', korean: '한국어 할 수 있어요?', english: 'Can you speak Korean?', level: 14, speaker: 'A' },
  { id: 'd046', korean: '조금 할 수 있어요. 아직 잘 못해요.', english: "I can speak a little. I'm not good yet.", level: 14, speaker: 'B' },
  { id: 'd047', korean: '한글 읽을 줄 알아요?', english: 'Do you know how to read Hangul?', level: 14, speaker: 'A' },
  { id: 'd048', korean: '네! 읽을 줄 알아요.', english: 'Yes! I know how to read.', level: 14, speaker: 'B' },
  { id: 'd049', korean: '괜찮아요. 연습하면 잘할 수 있어요!', english: "It's okay. If you practice, you can do well!", level: 14, speaker: 'A' },
  { id: 'd050', korean: '질문해도 돼요?', english: 'May I ask a question?', level: 14, speaker: 'B' },
  { id: 'd051', korean: '그럼요! 뭐든지 물어보세요.', english: 'Of course! Ask anything.', level: 14, speaker: 'A' },
  { id: 'd052', korean: '한국에 가 봤어요?', english: 'Have you been to Korea?', level: 15, speaker: 'A' },
  { id: 'd053', korean: '네, 작년에 처음 가 봤어요!', english: 'Yes, I went for the first time last year!', level: 15, speaker: 'B' },
  { id: 'd054', korean: '어땠어요?', english: 'How was it?', level: 15, speaker: 'A' },
  { id: 'd055', korean: '정말 좋았어요! 음식이 맛있었어요.', english: 'It was really great! The food was delicious.', level: 15, speaker: 'B' },
  { id: 'd056', korean: '삼겹살 먹어 봤어요?', english: 'Did you try samgyeopsal?', level: 15, speaker: 'A' },
  { id: 'd057', korean: '네! 매일 먹었어요.', english: 'Yes! I ate it every day.', level: 15, speaker: 'B' },
  { id: 'd058', korean: '한국 사람 같아요!', english: "You're like a Korean!", level: 15, speaker: 'A' },
  { id: 'd059', korean: '또 가고 싶어요.', english: 'I want to go again.', level: 15, speaker: 'B' },
  { id: 'd060', korean: '오늘 뭐 해요?', english: 'What are you doing today?', level: 16, speaker: 'A' },
  { id: 'd061', korean: '공부해야 해요. 시험이 있어요.', english: 'I have to study. I have an exam.', level: 16, speaker: 'B' },
  { id: 'd062', korean: '힘들겠다. 언제 시험이에요?', english: "That sounds tough. When's the exam?", level: 16, speaker: 'A' },
  { id: 'd063', korean: '다음 주 월요일이에요.', english: 'Next Monday.', level: 16, speaker: 'B' },
  { id: 'd064', korean: '파이팅! 너무 무리하면 안 돼요.', english: "Fighting! You mustn't overwork yourself.", level: 16, speaker: 'A' },
  { id: 'd065', korean: '네, 쉬면서 할게요. 고마워요!', english: "Yeah, I'll rest while I do it. Thanks!", level: 16, speaker: 'B' },
  { id: 'd066', korean: '주말에 뭐 할 거예요?', english: 'What will you do on the weekend?', level: 17, speaker: 'A' },
  { id: 'd067', korean: '날씨가 좋으면 등산 갈 거예요.', english: "If the weather's good, I'll go hiking.", level: 17, speaker: 'B' },
  { id: 'd068', korean: '비가 오면요?', english: 'What if it rains?', level: 17, speaker: 'A' },
  { id: 'd069', korean: '집에서 영화 볼 거예요. 같이 볼래요?', english: "I'll watch movies at home. Wanna watch together?", level: 17, speaker: 'B' },
  { id: 'd070', korean: '좋아요!', english: 'Good!', level: 17, speaker: 'A' },
  { id: 'd071', korean: '알겠어요. 연락할게요!', english: "Okay. I'll contact you!", level: 17, speaker: 'B' },
  { id: 'd072', korean: '한국 음식 중에서 뭐가 제일 맛있어요?', english: "Among Korean foods, what's the most delicious?", level: 17, speaker: 'A' },
  { id: 'd073', korean: '저는 삼겹살이 제일 좋아요!', english: 'I like samgyeopsal the best!', level: 17, speaker: 'B' },
  { id: 'd074', korean: '진짜요? 저는 치킨이 더 좋은데...', english: 'Really? I like chicken better...', level: 17, speaker: 'A' },
  { id: 'd075', korean: '치킨도 맛있죠.', english: 'Chicken is delicious too.', level: 17, speaker: 'B' },
  { id: 'd076', korean: '매운 거 괜찮아요?', english: 'Is spicy okay?', level: 17, speaker: 'A' },
  { id: 'd077', korean: '네! 매운 거 좋아해요.', english: 'Yes! I like spicy food.', level: 17, speaker: 'B' },
];

console.log('Korean Fluency Quest v2.5 loaded (standalone with embedded dialogues)');

// Storage keys
const STATS_KEY = 'kfq_user_stats';
const SETTINGS_KEY = 'kfq_settings';

const defaultStats = {
  xp: 0,
  totalReviews: 0,
  totalQuizzes: 0,
  totalSentences: 0,
  totalListening: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
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
  const [dialogueRole, setDialogueRole] = useState('B');
  const [dialogueInput, setDialogueInput] = useState('');
  const [dialogueFeedback, setDialogueFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Save to localStorage
  useEffect(() => {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) {}
  }, [stats]);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
  }, [settings]);

  // Helper functions
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const wasYesterday = (dateStr) => {
    if (!dateStr) return false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    return dateStr === yStr;
  };

  const updateStreak = () => {
    const today = getTodayString();
    setStats(prev => {
      if (prev.lastPracticeDate === today) return prev;
      let newStreak = wasYesterday(prev.lastPracticeDate) ? prev.currentStreak + 1 : 1;
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPracticeDate: today,
      };
    });
  };

  const trackWrongAnswer = (item, type) => {
    setStats(prev => {
      const wrongAnswers = [...(prev.wrongAnswers || [])];
      if (!wrongAnswers.find(w => w.id === item.id)) {
        wrongAnswers.push({ id: item.id, korean: item.korean, english: item.english, type, timestamp: Date.now() });
        if (wrongAnswers.length > 50) wrongAnswers.shift();
      }
      return { ...prev, wrongAnswers };
    });
  };

  const clearWrongAnswer = (itemId) => {
    setStats(prev => ({ ...prev, wrongAnswers: (prev.wrongAnswers || []).filter(w => w.id !== itemId) }));
  };

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
    const vocab = window.VOCABULARY || [];
    if (vocab.length === 0) { alert('No vocabulary loaded!'); return; }
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
    const vocab = window.VOCABULARY || [];
    if (vocab.length < 4) { alert('Not enough vocabulary!'); return; }
    const filtered = vocab.filter(v => v.level <= settings.maxLevel);
    const shuffled = shuffle(filtered);
    const questions = shuffled.slice(0, 10).map(q => {
      const wrongAnswers = shuffle(filtered.filter(v => v.id !== q.id)).slice(0, 3).map(v => v.english);
      return { korean: q.korean, correct: q.english, options: shuffle([q.english, ...wrongAnswers]), id: q.id };
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
      trackWrongAnswer({ id: q.id, korean: q.korean, english: q.correct }, 'quiz');
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
  // SENTENCE FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startSentence = () => {
    const sentences = window.SENTENCES || [];
    if (sentences.length === 0) { alert('No sentences loaded!'); return; }
    const filtered = sentences.filter(s => s.level <= settings.maxLevel && !s.speaker);
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
    const vocab = window.VOCABULARY || [];
    if (vocab.length === 0) { alert('No vocabulary!'); return; }
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
  // DIALOGUE FUNCTIONS (Uses EMBEDDED_DIALOGUES)
  // ═══════════════════════════════════════════════════════════════

  const getDialogueConversations = () => {
    const byLevel = {};
    EMBEDDED_DIALOGUES.forEach(line => {
      if (!byLevel[line.level]) byLevel[line.level] = [];
      byLevel[line.level].push(line);
    });
    return Object.values(byLevel).filter(c => c.length >= 4);
  };

  const startDialogue = (role = 'B') => {
    console.log('Starting dialogue with embedded data...');
    const conversations = getDialogueConversations();
    console.log('Found', conversations.length, 'conversations');
    
    if (conversations.length === 0) {
      alert('No dialogues available!');
      return;
    }

    const filtered = conversations.filter(c => c[0].level <= settings.maxLevel);
    if (filtered.length === 0) {
      alert('No dialogues at your level! Try increasing max level in Settings.');
      return;
    }

    const randomConvo = filtered[Math.floor(Math.random() * filtered.length)];
    console.log('Selected conversation at level', randomConvo[0].level);
    
    setDialogue(randomConvo);
    setDialogueIndex(0);
    setDialogueRole(role);
    setDialogueInput('');
    setDialogueFeedback(null);
    setShowHint(false);
    setView('dialogue');
  };

  const checkDialogueAnswer = () => {
    const currentLine = dialogue[dialogueIndex];
    const normalize = (s) => s.trim().replace(/\s+/g, '').replace(/[.,!?ㅋㅎ]/g, '').toLowerCase();
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
      setShowHint(false);
    } else {
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
            <span className="stat-label">Streak</span>
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
            <div className="mode-info"><h3>Flashcards</h3><p>Review vocabulary</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startQuiz}>
            <div className="mode-icon">❓</div>
            <div className="mode-info"><h3>Vocabulary Quiz</h3><p>Test your knowledge</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startSentence}>
            <div className="mode-icon">✍️</div>
            <div className="mode-info"><h3>Sentence Builder</h3><p>Write Korean sentences</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startListening}>
            <div className="mode-icon">👂</div>
            <div className="mode-info"><h3>Listening Practice</h3><p>Train your ears</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => startDialogue('B')}>
            <div className="mode-icon">💬</div>
            <div className="mode-info"><h3>Dialogue Practice</h3><p>Practice conversations</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('levels')}>
            <div className="mode-icon">📚</div>
            <div className="mode-info"><h3>Browse Levels</h3><p>Study by topic</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('grammar')}>
            <div className="mode-icon">📖</div>
            <div className="mode-info"><h3>Grammar Reference</h3><p>Learn grammar rules</p></div>
            <div className="mode-arrow">→</div>
          </button>

          {(stats.wrongAnswers?.length > 0) && (
            <button className="mode-card review-mistakes" onClick={() => setView('review-mistakes')}>
              <div className="mode-icon">🔄</div>
              <div className="mode-info"><h3>Review Mistakes</h3><p>{stats.wrongAnswers.length} words to review</p></div>
              <div className="mode-arrow">→</div>
            </button>
          )}
        </nav>

        <div className="quick-actions">
          <button className="quick-btn" onClick={() => setView('stats')}>📊 Statistics</button>
          <button className="quick-btn" onClick={() => setView('settings')}>⚙️ Settings</button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: DIALOGUE
  // ═══════════════════════════════════════════════════════════════

  if (view === 'dialogue') {
    if (dialogue.length === 0) return <div className="app"><p style={{padding:20,textAlign:'center'}}>Loading...</p></div>;

    const currentLine = dialogue[dialogueIndex];
    const isUserTurn = currentLine.speaker === dialogueRole;

    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">Line {dialogueIndex + 1} / {dialogue.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{width:`${((dialogueIndex+1)/dialogue.length)*100}%`}}></div></div>

        <div style={{padding:20}}>
          <div style={{textAlign:'center',marginBottom:16,padding:'8px 16px',background:'var(--bg-card)',borderRadius:8,fontSize:'0.85rem',color:'var(--text-secondary)'}}>
            You are <strong style={{color:'var(--accent-primary)'}}>Person {dialogueRole}</strong>
          </div>

          {/* Conversation history */}
          <div style={{marginBottom:20}}>
            {dialogue.slice(0, dialogueIndex + 1).map((line, i) => {
              const isUser = line.speaker === dialogueRole;
              const isCurrent = i === dialogueIndex;
              return (
                <div key={line.id} style={{display:'flex',flexDirection:isUser?'row-reverse':'row',marginBottom:12,opacity:isCurrent?1:0.7}}>
                  <div style={{maxWidth:'80%',padding:'12px 16px',borderRadius:16,background:isUser?'var(--accent-primary)':'var(--bg-card)',borderBottomRightRadius:isUser?4:16,borderBottomLeftRadius:isUser?16:4}}>
                    <div style={{fontSize:'0.75rem',opacity:0.7,marginBottom:4}}>{isUser?'You':`Person ${line.speaker}`}</div>
                    {(!isCurrent || !isUser || dialogueFeedback) && <p style={{fontSize:'1.1rem',marginBottom:4}}>{line.korean}</p>}
                    {isCurrent && isUser && !dialogueFeedback && <p style={{fontSize:'1.1rem',marginBottom:4,opacity:0.5}}>???</p>}
                    {(!isCurrent || !isUser || dialogueFeedback || showHint) && <p style={{fontSize:'0.85rem',opacity:0.7}}>{line.english}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* User input */}
          {isUserTurn && !dialogueFeedback && (
            <div style={{marginBottom:20}}>
              <div style={{background:'var(--bg-elevated)',padding:12,borderRadius:8,marginBottom:12,textAlign:'center'}}>
                <p style={{color:'var(--text-secondary)',marginBottom:8}}>Your turn! Say in Korean:</p>
                <p style={{fontSize:'0.9rem',opacity:0.8}}>"{currentLine.english}"</p>
              </div>
              <input type="text" className="sentence-input" value={dialogueInput} onChange={(e)=>setDialogueInput(e.target.value)} placeholder="Type Korean..." autoFocus />
              <div style={{display:'flex',gap:10,marginTop:12}}>
                <button className="primary-btn" style={{flex:1}} onClick={checkDialogueAnswer} disabled={!dialogueInput.trim()}>Check</button>
                <button className="secondary-btn" onClick={()=>setShowHint(!showHint)}>💡 Hint</button>
              </div>
              {showHint && <div style={{marginTop:12,padding:12,background:'rgba(255,107,157,0.1)',borderRadius:8,textAlign:'center'}}><p style={{fontSize:'0.85rem',color:'var(--text-secondary)'}}>Answer:</p><p style={{fontSize:'1.1rem'}}>{currentLine.korean}</p></div>}
            </div>
          )}

          {/* Feedback */}
          {isUserTurn && dialogueFeedback && (
            <div className={`sentence-feedback ${dialogueFeedback}`} style={{marginBottom:20}}>
              {dialogueFeedback === 'correct' ? <span>✓ Perfect!</span> : <div><p>Correct answer:</p><p className="correct-answer">{currentLine.korean}</p></div>}
            </div>
          )}

          {/* Continue button */}
          {(!isUserTurn || dialogueFeedback) && (
            <div style={{display:'flex',gap:10}}>
              <button className="secondary-btn" onClick={()=>playAudio(currentLine.korean)}>🔊</button>
              <button className="primary-btn" style={{flex:1}} onClick={advanceDialogue}>{dialogueIndex<dialogue.length-1?'Continue →':'Finish 🎉'}</button>
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
            <div style={{fontSize:'4rem',margin:'20px 0'}}>💬</div>
            <p style={{color:'var(--text-secondary)',marginBottom:20}}>Great conversation practice!</p>
            <div className="results-stats">
              <div className="result-stat"><span className="result-value">{dialogue.length}</span><span className="result-label">Lines</span></div>
              <div className="result-stat"><span className="result-value">+{dialogue.filter(d=>d.speaker===dialogueRole).length*8}</span><span className="result-label">XP</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={()=>startDialogue(dialogueRole)}>Again</button>
              <button className="secondary-btn" onClick={()=>startDialogue(dialogueRole==='A'?'B':'A')}>Switch Roles</button>
              <button className="secondary-btn" onClick={()=>setView('home')}>Home</button>
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
    if (deck.length === 0) return <div className="app"><p style={{padding:20,textAlign:'center'}}>Loading...</p></div>;
    const card = deck[cardIndex];
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{cardIndex + 1} / {deck.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{width:`${((cardIndex+1)/deck.length)*100}%`}}></div></div>
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped?'flipped':''}`} onClick={()=>setIsFlipped(!isFlipped)}>
            <div className="card-face card-front">
              <span className="card-level">Level {card.level}</span>
              <span className="card-korean">{card.korean}</span>
              {settings.showRomanization && card.romanization && <span className="card-romanization">{card.romanization}</span>}
              <span className="tap-hint">tap to flip</span>
            </div>
            <div className="card-face card-back">
              <span className="card-english">{card.english}</span>
              {card.example && <span className="card-example">{card.example}</span>}
            </div>
          </div>
        </div>
        {isFlipped && (
          <div className="response-buttons">
            <button className="response-btn again" onClick={()=>nextCard(false)}>❌ Wrong</button>
            <button className="response-btn good" onClick={()=>nextCard(true)}>✓ Correct</button>
          </div>
        )}
        {settings.audioEnabled && <button className="primary-btn" style={{margin:'20px auto',display:'block'}} onClick={()=>playAudio(card.korean)}>🔊 Audio</button>}
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
              <div className="result-stat"><span className="result-value">{correct}/{deck.length}</span><span className="result-label">Correct</span></div>
              <div className="result-stat"><span className="result-value">{accuracy}%</span><span className="result-label">Accuracy</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={startFlashcards}>Again</button>
              <button className="secondary-btn" onClick={()=>setView('home')}>Home</button>
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
    if (quizQuestions.length === 0) return <div className="app"><p style={{padding:20,textAlign:'center'}}>Loading...</p></div>;
    const q = quizQuestions[quizIndex];
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <div className="progress-text">{quizIndex+1} / {quizQuestions.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{width:`${((quizIndex+1)/quizQuestions.length)*100}%`}}></div></div>
        <div style={{padding:20}}>
          <div className="quiz-question">
            <span className="question-label">What does this mean?</span>
            <span className="question-korean">{q.korean}</span>
          </div>
          <div className="quiz-options">
            {q.options.map((opt,i)=>{
              let cls='quiz-option';
              if(selectedAnswer){
                if(opt===q.correct)cls+=' correct';
                else if(opt===selectedAnswer)cls+=' incorrect';
              }
              return <button key={i} className={cls} onClick={()=>!selectedAnswer&&answerQuiz(opt)} disabled={!!selectedAnswer}>{opt}</button>;
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: QUIZ RESULTS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'quiz-results') {
    const accuracy = quizQuestions.length > 0 ? Math.round((quizScore / quizQuestions.length) * 100) : 0;
    return (
      <div className="app">
        <div className="results-screen">
          <div className="results-card">
            <h2>Quiz Complete! 🎉</h2>
            <div className="results-stats">
              <div className="result-stat"><span className="result-value">{quizScore}/{quizQuestions.length}</span><span className="result-label">Correct</span></div>
              <div className="result-stat"><span className="result-value">{accuracy}%</span><span className="result-label">Accuracy</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={startQuiz}>Again</button>
              <button className="secondary-btn" onClick={()=>setView('home')}>Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: SENTENCE
  // ═══════════════════════════════════════════════════════════════

  if (view === 'sentence') {
    if (!sentence) return <div className="app"><p style={{padding:20,textAlign:'center'}}>Loading...</p></div>;
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Sentence Builder</h2>
        </header>
        <div style={{padding:20}}>
          <div style={{background:'var(--bg-card)',padding:24,borderRadius:16,marginBottom:20,textAlign:'center'}}>
            <p style={{color:'var(--text-tertiary)',marginBottom:8}}>Translate to Korean:</p>
            <p style={{fontSize:'1.3rem',fontWeight:600}}>{sentence.english}</p>
          </div>
          <input type="text" className={`sentence-input ${feedback||''}`} value={userInput} onChange={(e)=>setUserInput(e.target.value)} placeholder="Type Korean..." />
          {!feedback && <button className="primary-btn" style={{width:'100%',marginTop:16}} onClick={checkSentence} disabled={!userInput.trim()}>Check</button>}
          {feedback && (
            <div className={`sentence-feedback ${feedback}`}>
              {feedback==='correct'?<span>✓ Correct!</span>:<div><p>Answer:</p><p className="correct-answer">{sentence.korean}</p></div>}
            </div>
          )}
          {feedback && (
            <div className="result-actions" style={{marginTop:24}}>
              <button className="primary-btn" onClick={startSentence}>Next</button>
              <button className="secondary-btn" onClick={()=>setView('home')}>Home</button>
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
    if (!listeningWord) return <div className="app"><p style={{padding:20,textAlign:'center'}}>Loading...</p></div>;
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Listening</h2>
        </header>
        <div style={{padding:20}}>
          <div style={{textAlign:'center',marginBottom:24}}>
            <p style={{color:'var(--text-secondary)',marginBottom:16}}>Listen and type what you hear:</p>
            <div style={{display:'flex',gap:12,justifyContent:'center'}}>
              <button className="primary-btn" onClick={()=>playAudio(listeningWord.korean)}>🔊 Play</button>
              <button className="secondary-btn" onClick={()=>playAudio(listeningWord.korean,0.6)}>🐢 Slow</button>
            </div>
          </div>
          <input type="text" className={`sentence-input ${listeningFeedback||''}`} value={listeningInput} onChange={(e)=>setListeningInput(e.target.value)} placeholder="Type what you hear..." />
          {!listeningFeedback && <button className="primary-btn" style={{width:'100%',marginTop:16}} onClick={checkListening} disabled={!listeningInput.trim()}>Check</button>}
          {listeningFeedback && (
            <div className={`sentence-feedback ${listeningFeedback}`}>
              {listeningFeedback==='correct'?<div><span>✓ Correct!</span><p className="correct-answer">{listeningWord.korean}</p><p style={{opacity:0.8}}>{listeningWord.english}</p></div>:<div><p>Answer:</p><p className="correct-answer">{listeningWord.korean}</p><p style={{opacity:0.8}}>{listeningWord.english}</p></div>}
            </div>
          )}
          {listeningFeedback && (
            <div className="result-actions" style={{marginTop:24}}>
              <button className="primary-btn" onClick={startListening}>Next</button>
              <button className="secondary-btn" onClick={()=>setView('home')}>Home</button>
            </div>
          )}
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
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Levels</h2>
        </header>
        <div style={{padding:20}}>
          <div className="levels-grid">
            {levels.map(lvl => {
              const vocabCount = (window.VOCABULARY||[]).filter(v=>v.level===lvl.level).length;
              return (
                <div key={lvl.level} className="level-card">
                  <span className="level-emoji">{lvl.emoji}</span>
                  <div className="level-info">
                    <span className="level-number">Level {lvl.level}</span>
                    <span className="level-title">{lvl.title}</span>
                    <span className="level-focus">{lvl.focus}</span>
                    <span className="level-vocab">{vocabCount} words</span>
                  </div>
                </div>
              );
            })}
          </div>
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
      const g = selectedGrammar;
      return (
        <div className="app">
          <header className="screen-header">
            <button className="back-btn" onClick={()=>setSelectedGrammar(null)}>← Back</button>
            <h2>{g.emoji} {g.title}</h2>
          </header>
          <div style={{padding:20}}>
            <div style={{background:'var(--bg-card)',padding:20,borderRadius:12,marginBottom:16}}>
              <h3 style={{marginBottom:8}}>Pattern</h3>
              <p style={{fontSize:'1.2rem',fontWeight:600}}>{g.pattern}</p>
            </div>
            <div style={{background:'var(--bg-card)',padding:20,borderRadius:12,marginBottom:16}}>
              <h3 style={{marginBottom:8}}>Explanation</h3>
              <p>{g.explanation}</p>
            </div>
            {g.examples && g.examples.length > 0 && (
              <div style={{background:'var(--bg-card)',padding:20,borderRadius:12,marginBottom:16}}>
                <h3 style={{marginBottom:12}}>Examples</h3>
                {g.examples.map((ex,i)=>(
                  <div key={i} style={{marginBottom:12,paddingBottom:12,borderBottom:i<g.examples.length-1?'1px solid var(--border-subtle)':'none'}}>
                    <p style={{fontSize:'1.1rem',marginBottom:4}}>{ex.korean}</p>
                    <p style={{color:'var(--text-secondary)'}}>{ex.english}</p>
                    <button style={{marginTop:8,padding:'4px 12px',background:'var(--bg-elevated)',border:'none',borderRadius:4,cursor:'pointer'}} onClick={()=>playAudio(ex.korean)}>🔊</button>
                  </div>
                ))}
              </div>
            )}
            {g.tips && (
              <div style={{background:'rgba(255,107,157,0.1)',padding:16,borderRadius:12}}>
                <h3 style={{marginBottom:8}}>💡 Pro Tip</h3>
                <p>{g.tips}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Grammar</h2>
        </header>
        <div style={{padding:20}}>
          {grammar.map(g=>(
            <button key={g.id} className="mode-card" onClick={()=>setSelectedGrammar(g)}>
              <div className="mode-icon">{g.emoji}</div>
              <div className="mode-info"><h3>{g.title}</h3><p>{g.shortDesc}</p></div>
              <div className="mode-arrow">→</div>
            </button>
          ))}
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
            <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
            <h2>Review</h2>
          </header>
          <div style={{padding:40,textAlign:'center'}}>
            <div style={{fontSize:'4rem',marginBottom:20}}>🎉</div>
            <h2>No mistakes!</h2>
            <p style={{color:'var(--text-secondary)',marginTop:10}}>Keep practicing!</p>
            <button className="primary-btn" style={{marginTop:24}} onClick={()=>setView('home')}>Home</button>
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Review ({wrongAnswers.length})</h2>
        </header>
        <div style={{padding:20}}>
          {wrongAnswers.map((item,i)=>(
            <div key={item.id||i} style={{background:'var(--bg-card)',borderRadius:12,padding:16,marginBottom:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{fontSize:'1.3rem',marginBottom:4}}>{item.korean}</p>
                <p style={{color:'var(--text-secondary)'}}>{item.english}</p>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="secondary-btn" style={{padding:'8px 12px'}} onClick={()=>playAudio(item.korean)}>🔊</button>
                <button className="primary-btn" style={{padding:'8px 12px'}} onClick={()=>clearWrongAnswer(item.id)}>✓</button>
              </div>
            </div>
          ))}
          <button className="danger-btn" style={{width:'100%',marginTop:20}} onClick={()=>{if(confirm('Clear all?'))setStats(s=>({...s,wrongAnswers:[]}));}}>Clear All</button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: STATS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'stats') {
    const today = getTodayString();
    const practicedToday = stats.lastPracticeDate === today;
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Statistics</h2>
        </header>
        <div style={{padding:20}}>
          <div style={{background:'linear-gradient(135deg,#ff6b9d 0%,#c44569 100%)',borderRadius:16,padding:24,marginBottom:20,textAlign:'center'}}>
            <div style={{fontSize:'3rem',marginBottom:8}}>🔥</div>
            <div style={{fontSize:'2.5rem',fontWeight:'bold'}}>{stats.currentStreak||0}</div>
            <div style={{opacity:0.9}}>Day Streak</div>
            <div style={{marginTop:12,fontSize:'0.9rem',opacity:0.8}}>Best: {stats.longestStreak||0} days</div>
            {!practicedToday && <div style={{marginTop:12,padding:'8px 16px',background:'rgba(0,0,0,0.2)',borderRadius:8,fontSize:'0.85rem'}}>Practice today! 💪</div>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:20}}>
            <div style={{background:'var(--bg-card)',borderRadius:12,padding:16,textAlign:'center'}}><div style={{fontSize:'1.5rem'}}>⚡</div><div style={{fontSize:'1.5rem',fontWeight:'bold'}}>{stats.xp||0}</div><div style={{color:'var(--text-secondary)',fontSize:'0.85rem'}}>XP</div></div>
            <div style={{background:'var(--bg-card)',borderRadius:12,padding:16,textAlign:'center'}}><div style={{fontSize:'1.5rem'}}>📖</div><div style={{fontSize:'1.5rem',fontWeight:'bold'}}>{stats.totalReviews||0}</div><div style={{color:'var(--text-secondary)',fontSize:'0.85rem'}}>Reviews</div></div>
            <div style={{background:'var(--bg-card)',borderRadius:12,padding:16,textAlign:'center'}}><div style={{fontSize:'1.5rem'}}>❓</div><div style={{fontSize:'1.5rem',fontWeight:'bold'}}>{stats.totalQuizzes||0}</div><div style={{color:'var(--text-secondary)',fontSize:'0.85rem'}}>Quizzes</div></div>
            <div style={{background:'var(--bg-card)',borderRadius:12,padding:16,textAlign:'center'}}><div style={{fontSize:'1.5rem'}}>✍️</div><div style={{fontSize:'1.5rem',fontWeight:'bold'}}>{stats.totalSentences||0}</div><div style={{color:'var(--text-secondary)',fontSize:'0.85rem'}}>Sentences</div></div>
          </div>
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
          <button className="back-btn" onClick={()=>setView('home')}>← Back</button>
          <h2>Settings</h2>
        </header>
        <div style={{padding:20}}>
          <div className="settings-content">
            <div className="setting-group">
              <span className="setting-label">Max Level</span>
              <select className="setting-select" value={settings.maxLevel} onChange={(e)=>setSettings({...settings,maxLevel:parseInt(e.target.value)})}>
                {[...Array(40)].map((_,i)=><option key={i+1} value={i+1}>Level {i+1}</option>)}
              </select>
            </div>
            <div className="setting-group">
              <div className="setting-toggle">
                <span>Show Romanization</span>
                <div className={`toggle-switch ${settings.showRomanization?'active':''}`} onClick={()=>setSettings({...settings,showRomanization:!settings.showRomanization})}></div>
              </div>
            </div>
            <div className="setting-group">
              <div className="setting-toggle">
                <span>Audio</span>
                <div className={`toggle-switch ${settings.audioEnabled?'active':''}`} onClick={()=>setSettings({...settings,audioEnabled:!settings.audioEnabled})}></div>
              </div>
            </div>
            <div className="setting-group danger">
              <span className="setting-label">Danger Zone</span>
              <button className="danger-btn" style={{width:'100%'}} onClick={()=>{if(confirm('Reset all progress?')){setStats(defaultStats);alert('Reset!');}}}>Reset Progress</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default
  return <div className="app"><p style={{padding:20}}>Loading...</p></div>;
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
