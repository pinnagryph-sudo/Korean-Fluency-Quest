// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST v3.0 - Ultimate Edition
// Features: Theme toggle, Achievements, Onboarding, Audio Quiz,
// Favorites, Export/Import, Typing Practice, Extended Dialogues
// ═══════════════════════════════════════════════════════════════

const { useState, useEffect, useCallback } = React;

// ═══════════════════════════════════════════════════════════════
// EMBEDDED DIALOGUES - Extended to cover levels 3-40
// ═══════════════════════════════════════════════════════════════
const EMBEDDED_DIALOGUES = [
  // Level 3 - Introductions
  { id: 'd001', korean: '안녕하세요!', english: 'Hello!', level: 3, speaker: 'A' },
  { id: 'd002', korean: '저는 민수예요. 이름이 뭐예요?', english: "I'm Minsu. What's your name?", level: 3, speaker: 'A' },
  { id: 'd003', korean: '저는 지연이에요.', english: "I'm Jiyeon.", level: 3, speaker: 'B' },
  { id: 'd004', korean: '지연 씨는 학생이에요?', english: 'Jiyeon, are you a student?', level: 3, speaker: 'A' },
  { id: 'd005', korean: '네, 저는 학생이에요. 민수 씨는요?', english: 'Yes, I am a student. How about you?', level: 3, speaker: 'B' },
  { id: 'd006', korean: '저는 회사원이에요.', english: 'I am an office worker.', level: 3, speaker: 'A' },
  { id: 'd007', korean: '아, 그래요? 반갑습니다!', english: 'Oh, really? Nice to meet you!', level: 3, speaker: 'B' },
  
  // Level 5 - Shopping
  { id: 'd008', korean: '이거 뭐예요?', english: 'What is this?', level: 5, speaker: 'A' },
  { id: 'd009', korean: '그거 제 가방이에요.', english: 'That is my bag.', level: 5, speaker: 'B' },
  { id: 'd010', korean: '예뻐요! 어디서 샀어요?', english: 'Pretty! Where did you buy it?', level: 5, speaker: 'A' },
  { id: 'd011', korean: '인터넷에서 샀어요.', english: 'I bought it online.', level: 5, speaker: 'B' },
  { id: 'd012', korean: '얼마예요?', english: 'How much is it?', level: 5, speaker: 'A' },
  { id: 'd013', korean: '3만원이에요.', english: "It's 30,000 won.", level: 5, speaker: 'B' },

  // Level 9 - Origins
  { id: 'd014', korean: '어디서 왔어요?', english: 'Where are you from?', level: 9, speaker: 'A' },
  { id: 'd015', korean: '미국에서 왔어요.', english: "I'm from America.", level: 9, speaker: 'B' },
  { id: 'd016', korean: '뭐 하세요?', english: 'What do you do?', level: 9, speaker: 'A' },
  { id: 'd017', korean: '학생이에요. 한국어 공부해요.', english: "I'm a student. I study Korean.", level: 9, speaker: 'B' },
  { id: 'd018', korean: '왜 한국어 공부해요?', english: 'Why do you study Korean?', level: 9, speaker: 'A' },
  { id: 'd019', korean: 'K-드라마 좋아해요!', english: 'I like K-dramas!', level: 9, speaker: 'B' },
  { id: 'd020', korean: '저도요!', english: 'Me too!', level: 9, speaker: 'A' },

  // Level 10 - Wants
  { id: 'd021', korean: '주말에 뭐 하고 싶어요?', english: 'What do you want to do on the weekend?', level: 10, speaker: 'A' },
  { id: 'd022', korean: '영화 보고 싶어요.', english: 'I want to watch a movie.', level: 10, speaker: 'B' },
  { id: 'd023', korean: '무슨 영화요?', english: 'What movie?', level: 10, speaker: 'A' },
  { id: 'd024', korean: '한국 영화요! 추천 있어요?', english: 'A Korean movie! Any recommendations?', level: 10, speaker: 'B' },
  { id: 'd025', korean: '기생충 봤어요?', english: 'Have you seen Parasite?', level: 10, speaker: 'A' },
  { id: 'd026', korean: '아니요, 아직이요.', english: 'No, not yet.', level: 10, speaker: 'B' },
  { id: 'd027', korean: '같이 봐요!', english: "Let's watch together!", level: 10, speaker: 'A' },
  { id: 'd028', korean: '좋아요!', english: 'Sounds good!', level: 10, speaker: 'B' },

  // Level 11 - Making Plans
  { id: 'd029', korean: '주말에 시간 있어요?', english: 'Do you have time this weekend?', level: 11, speaker: 'A' },
  { id: 'd030', korean: '네, 토요일 오후에요.', english: 'Yes, Saturday afternoon.', level: 11, speaker: 'B' },
  { id: 'd031', korean: '뭐 할까요?', english: 'What shall we do?', level: 11, speaker: 'A' },
  { id: 'd032', korean: '맛있는 거 먹을까요?', english: 'Shall we eat something good?', level: 11, speaker: 'B' },
  { id: 'd033', korean: '좋아요! 어디 갈까요?', english: 'Good! Where shall we go?', level: 11, speaker: 'A' },
  { id: 'd034', korean: '새로운 한식당 어때요?', english: 'How about a new Korean restaurant?', level: 11, speaker: 'B' },
  { id: 'd035', korean: '몇 시에 만날까요?', english: 'What time shall we meet?', level: 11, speaker: 'A' },
  { id: 'd036', korean: '2시 어때요?', english: 'How about 2pm?', level: 11, speaker: 'B' },

  // Level 13 - Obligations
  { id: 'd037', korean: '영화 볼까요?', english: 'Shall we watch a movie?', level: 13, speaker: 'A' },
  { id: 'd038', korean: '미안해요, 못 가요.', english: "Sorry, I can't go.", level: 13, speaker: 'B' },
  { id: 'd039', korean: '왜요?', english: 'Why?', level: 13, speaker: 'A' },
  { id: 'd040', korean: '시험이 있어서 공부해야 돼요.', english: 'I have to study for an exam.', level: 13, speaker: 'B' },
  { id: 'd041', korean: '힘내세요!', english: 'Good luck!', level: 13, speaker: 'A' },
  { id: 'd042', korean: '감사합니다!', english: 'Thank you!', level: 13, speaker: 'B' },

  // Level 14 - Ability
  { id: 'd043', korean: '한국어 할 수 있어요?', english: 'Can you speak Korean?', level: 14, speaker: 'A' },
  { id: 'd044', korean: '조금 할 수 있어요.', english: 'I can speak a little.', level: 14, speaker: 'B' },
  { id: 'd045', korean: '한글 읽을 줄 알아요?', english: 'Can you read Hangul?', level: 14, speaker: 'A' },
  { id: 'd046', korean: '네, 읽을 줄 알아요!', english: 'Yes, I can read!', level: 14, speaker: 'B' },
  { id: 'd047', korean: '연습하면 잘할 수 있어요!', english: 'If you practice, you can do well!', level: 14, speaker: 'A' },

  // Level 15 - Experience
  { id: 'd048', korean: '한국에 가 봤어요?', english: 'Have you been to Korea?', level: 15, speaker: 'A' },
  { id: 'd049', korean: '네, 작년에 가 봤어요!', english: 'Yes, I went last year!', level: 15, speaker: 'B' },
  { id: 'd050', korean: '어땠어요?', english: 'How was it?', level: 15, speaker: 'A' },
  { id: 'd051', korean: '정말 좋았어요!', english: 'It was really great!', level: 15, speaker: 'B' },
  { id: 'd052', korean: '삼겹살 먹어 봤어요?', english: 'Did you try samgyeopsal?', level: 15, speaker: 'A' },
  { id: 'd053', korean: '네, 매일 먹었어요!', english: 'Yes, I ate it every day!', level: 15, speaker: 'B' },

  // Level 17 - Conditionals
  { id: 'd054', korean: '주말에 뭐 할 거예요?', english: 'What will you do this weekend?', level: 17, speaker: 'A' },
  { id: 'd055', korean: '날씨가 좋으면 등산 갈 거예요.', english: "If the weather's good, I'll go hiking.", level: 17, speaker: 'B' },
  { id: 'd056', korean: '비가 오면요?', english: 'What if it rains?', level: 17, speaker: 'A' },
  { id: 'd057', korean: '집에서 영화 볼 거예요.', english: "I'll watch movies at home.", level: 17, speaker: 'B' },
  { id: 'd058', korean: '같이 볼래요?', english: 'Want to watch together?', level: 17, speaker: 'A' },
  { id: 'd059', korean: '좋아요! 연락할게요.', english: "Good! I'll contact you.", level: 17, speaker: 'B' },

  // Level 20 - Reported Speech
  { id: 'd060', korean: '민수 씨가 뭐래요?', english: 'What did Minsu say?', level: 20, speaker: 'A' },
  { id: 'd061', korean: '내일 만나자고 했어요.', english: "He said let's meet tomorrow.", level: 20, speaker: 'B' },
  { id: 'd062', korean: '몇 시에요?', english: 'What time?', level: 20, speaker: 'A' },
  { id: 'd063', korean: '3시에 카페에서 만나자고요.', english: 'He said to meet at a cafe at 3.', level: 20, speaker: 'B' },
  { id: 'd064', korean: '알겠어요!', english: 'Got it!', level: 20, speaker: 'A' },

  // Level 22 - Guessing
  { id: 'd065', korean: '오늘 비가 올 것 같아요.', english: 'It looks like it will rain today.', level: 22, speaker: 'A' },
  { id: 'd066', korean: '그래요? 우산 가져가야겠어요.', english: 'Really? I should bring an umbrella.', level: 22, speaker: 'B' },
  { id: 'd067', korean: '저도 그런 것 같아요.', english: 'I think so too.', level: 22, speaker: 'A' },
  { id: 'd068', korean: '내일은 맑을 것 같은데요.', english: "Tomorrow looks like it'll be clear.", level: 22, speaker: 'B' },

  // Level 25 - Work Talk
  { id: 'd069', korean: '요즘 일이 어때요?', english: "How's work these days?", level: 25, speaker: 'A' },
  { id: 'd070', korean: '너무 바빠요.', english: "I'm so busy.", level: 25, speaker: 'B' },
  { id: 'd071', korean: '야근 많이 해요?', english: 'Do you work overtime a lot?', level: 25, speaker: 'A' },
  { id: 'd072', korean: '네, 거의 매일이요.', english: 'Yes, almost every day.', level: 25, speaker: 'B' },
  { id: 'd073', korean: '힘들겠네요.', english: 'That must be tough.', level: 25, speaker: 'A' },
  { id: 'd074', korean: '그래도 재미있어요.', english: "But it's still fun.", level: 25, speaker: 'B' },

  // Level 28 - Health
  { id: 'd075', korean: '안색이 안 좋아 보여요.', english: "You don't look well.", level: 28, speaker: 'A' },
  { id: 'd076', korean: '어제부터 머리가 아파요.', english: "I've had a headache since yesterday.", level: 28, speaker: 'B' },
  { id: 'd077', korean: '병원 가 봤어요?', english: 'Did you go to the hospital?', level: 28, speaker: 'A' },
  { id: 'd078', korean: '아직이요. 오늘 갈 거예요.', english: "Not yet. I'll go today.", level: 28, speaker: 'B' },
  { id: 'd079', korean: '푹 쉬세요.', english: 'Get plenty of rest.', level: 28, speaker: 'A' },

  // Level 30 - Housing
  { id: 'd080', korean: '이사했어요?', english: 'Did you move?', level: 30, speaker: 'A' },
  { id: 'd081', korean: '네, 지난주에요.', english: 'Yes, last week.', level: 30, speaker: 'B' },
  { id: 'd082', korean: '새 집 어때요?', english: "How's the new place?", level: 30, speaker: 'A' },
  { id: 'd083', korean: '넓고 좋아요!', english: "It's spacious and nice!", level: 30, speaker: 'B' },
  { id: 'd084', korean: '월세예요, 전세예요?', english: 'Monthly rent or key money?', level: 30, speaker: 'A' },
  { id: 'd085', korean: '월세예요.', english: 'Monthly rent.', level: 30, speaker: 'B' },

  // Level 33 - Internet Korean
  { id: 'd086', korean: '이거 완전 꿀잼이야!', english: "This is so fun! (lit: honey fun)", level: 33, speaker: 'A' },
  { id: 'd087', korean: '뭔데?', english: 'What is it?', level: 33, speaker: 'B' },
  { id: 'd088', korean: '새로 나온 드라마!', english: 'A new drama!', level: 33, speaker: 'A' },
  { id: 'd089', korean: '나도 볼래!', english: 'I want to watch too!', level: 33, speaker: 'B' },
  { id: 'd090', korean: '같이 정주행하자!', english: "Let's binge-watch together!", level: 33, speaker: 'A' },

  // Level 35 - Travel
  { id: 'd091', korean: '여행 계획 있어요?', english: 'Do you have travel plans?', level: 35, speaker: 'A' },
  { id: 'd092', korean: '네, 다음 달에 제주도 가요.', english: "Yes, I'm going to Jeju next month.", level: 35, speaker: 'B' },
  { id: 'd093', korean: '좋겠다! 며칠이요?', english: 'Nice! How many days?', level: 35, speaker: 'A' },
  { id: 'd094', korean: '3박 4일이요.', english: '3 nights 4 days.', level: 35, speaker: 'B' },
  { id: 'd095', korean: '재미있게 다녀오세요!', english: 'Have a great trip!', level: 35, speaker: 'A' },

  // Level 38 - Advanced
  { id: 'd096', korean: '요즘 뭐에 빠져 있어요?', english: "What are you into these days?", level: 38, speaker: 'A' },
  { id: 'd097', korean: '한국어 공부요!', english: 'Studying Korean!', level: 38, speaker: 'B' },
  { id: 'd098', korean: '대단하네요. 얼마나 공부했어요?', english: "That's impressive. How long have you studied?", level: 38, speaker: 'A' },
  { id: 'd099', korean: '1년 정도요.', english: 'About a year.', level: 38, speaker: 'B' },
  { id: 'd100', korean: '1년 만에 이 정도면 진짜 잘하는 거예요!', english: "This good after just a year? You're really good!", level: 38, speaker: 'A' },

  // Level 40 - Fluent Conversation
  { id: 'd101', korean: '한국 생활 어때요?', english: "How's life in Korea?", level: 40, speaker: 'A' },
  { id: 'd102', korean: '처음에는 힘들었는데 이제 적응했어요.', english: 'It was hard at first but I adapted now.', level: 40, speaker: 'B' },
  { id: 'd103', korean: '뭐가 제일 힘들었어요?', english: 'What was the hardest?', level: 40, speaker: 'A' },
  { id: 'd104', korean: '아무래도 언어요.', english: 'The language, of course.', level: 40, speaker: 'B' },
  { id: 'd105', korean: '그래도 지금은 완전 잘하잖아요!', english: 'But now you speak so well!', level: 40, speaker: 'A' },
  { id: 'd106', korean: '아직 멀었어요. 더 열심히 할 거예요!', english: "I still have far to go. I'll work harder!", level: 40, speaker: 'B' },
];

// ═══════════════════════════════════════════════════════════════
// ACHIEVEMENTS SYSTEM
// ═══════════════════════════════════════════════════════════════
const ACHIEVEMENTS = [
  { id: 'first_card', name: 'First Steps', desc: 'Complete your first flashcard', icon: '🎯', xpReq: 5 },
  { id: 'streak_3', name: 'Getting Warm', desc: '3 day streak', icon: '🔥', streakReq: 3 },
  { id: 'streak_7', name: 'On Fire', desc: '7 day streak', icon: '🔥🔥', streakReq: 7 },
  { id: 'streak_30', name: 'Unstoppable', desc: '30 day streak', icon: '🔥🔥🔥', streakReq: 30 },
  { id: 'xp_100', name: 'Centurion', desc: 'Earn 100 XP', icon: '⚡', xpReq: 100 },
  { id: 'xp_500', name: 'Rising Star', desc: 'Earn 500 XP', icon: '⭐', xpReq: 500 },
  { id: 'xp_1000', name: 'Scholar', desc: 'Earn 1000 XP', icon: '📚', xpReq: 1000 },
  { id: 'xp_5000', name: 'Master', desc: 'Earn 5000 XP', icon: '🏆', xpReq: 5000 },
  { id: 'quiz_10', name: 'Quiz Taker', desc: 'Complete 10 quizzes', icon: '❓', quizReq: 10 },
  { id: 'quiz_50', name: 'Quiz Pro', desc: 'Complete 50 quizzes', icon: '🧠', quizReq: 50 },
  { id: 'reviews_100', name: 'Reviewer', desc: 'Review 100 cards', icon: '📖', reviewReq: 100 },
  { id: 'reviews_500', name: 'Dedicated', desc: 'Review 500 cards', icon: '💪', reviewReq: 500 },
  { id: 'dialogue_1', name: 'Conversationalist', desc: 'Complete a dialogue', icon: '💬', dialogueReq: 1 },
  { id: 'dialogue_10', name: 'Chatterbox', desc: 'Complete 10 dialogues', icon: '🗣️', dialogueReq: 10 },
  { id: 'perfect_quiz', name: 'Perfectionist', desc: 'Get 100% on a quiz', icon: '💯', special: 'perfect_quiz' },
  { id: 'night_owl', name: 'Night Owl', desc: 'Practice after midnight', icon: '🦉', special: 'night_owl' },
  { id: 'early_bird', name: 'Early Bird', desc: 'Practice before 7am', icon: '🐦', special: 'early_bird' },
];

console.log('Korean Fluency Quest v3.0 loaded');

// Storage keys
const STATS_KEY = 'kfq_user_stats';
const SETTINGS_KEY = 'kfq_settings';
const FAVORITES_KEY = 'kfq_favorites';
const ONBOARDING_KEY = 'kfq_onboarding_done';

const defaultStats = {
  xp: 0,
  totalReviews: 0,
  totalQuizzes: 0,
  totalSentences: 0,
  totalListening: 0,
  totalDialogues: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  wrongAnswers: [],
  unlockedAchievements: [],
  perfectQuizzes: 0,
};

const defaultSettings = {
  showRomanization: true,
  maxLevel: 40,
  audioEnabled: true,
  theme: 'dark', // 'dark' or 'light'
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

function App() {
  const [view, setView] = useState('home');
  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STATS_KEY);
      return stored ? { ...defaultStats, ...JSON.parse(stored) } : defaultStats;
    } catch (e) { return defaultStats; }
  });
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (e) { return defaultSettings; }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try { return !localStorage.getItem(ONBOARDING_KEY); } catch (e) { return true; }
  });
  const [newAchievement, setNewAchievement] = useState(null);

  // Practice state
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizMode, setQuizMode] = useState('text'); // 'text' or 'audio'

  const [sentence, setSentence] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const [listeningWord, setListeningWord] = useState(null);
  const [listeningInput, setListeningInput] = useState('');
  const [listeningFeedback, setListeningFeedback] = useState(null);

  const [selectedGrammar, setSelectedGrammar] = useState(null);

  const [dialogue, setDialogue] = useState([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueRole, setDialogueRole] = useState('B');
  const [dialogueInput, setDialogueInput] = useState('');
  const [dialogueFeedback, setDialogueFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Typing practice state
  const [typingWord, setTypingWord] = useState(null);
  const [typingInput, setTypingInput] = useState('');
  const [typingFeedback, setTypingFeedback] = useState(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Save to localStorage
  useEffect(() => { try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) {} }, [stats]);
  useEffect(() => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} }, [settings]);
  useEffect(() => { try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch (e) {} }, [favorites]);

  // ═══════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

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

  const checkAchievements = (newStats) => {
    const unlocked = [...(newStats.unlockedAchievements || [])];
    let newlyUnlocked = null;

    ACHIEVEMENTS.forEach(ach => {
      if (unlocked.includes(ach.id)) return;
      
      let earned = false;
      if (ach.xpReq && newStats.xp >= ach.xpReq) earned = true;
      if (ach.streakReq && newStats.currentStreak >= ach.streakReq) earned = true;
      if (ach.quizReq && newStats.totalQuizzes >= ach.quizReq) earned = true;
      if (ach.reviewReq && newStats.totalReviews >= ach.reviewReq) earned = true;
      if (ach.dialogueReq && newStats.totalDialogues >= ach.dialogueReq) earned = true;
      
      // Time-based achievements
      const hour = new Date().getHours();
      if (ach.special === 'night_owl' && hour >= 0 && hour < 5) earned = true;
      if (ach.special === 'early_bird' && hour >= 5 && hour < 7) earned = true;

      if (earned) {
        unlocked.push(ach.id);
        newlyUnlocked = ach;
      }
    });

    if (newlyUnlocked) {
      setNewAchievement(newlyUnlocked);
      setTimeout(() => setNewAchievement(null), 3000);
    }

    return unlocked;
  };

  const updateStreak = () => {
    const today = getTodayString();
    setStats(prev => {
      if (prev.lastPracticeDate === today) return prev;
      let newStreak = wasYesterday(prev.lastPracticeDate) ? prev.currentStreak + 1 : 1;
      const newStats = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastPracticeDate: today,
      };
      newStats.unlockedAchievements = checkAchievements(newStats);
      return newStats;
    });
  };

  const addXP = (amount) => {
    setStats(prev => {
      const newStats = { ...prev, xp: prev.xp + amount };
      newStats.unlockedAchievements = checkAchievements(newStats);
      return newStats;
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

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) return prev.filter(f => f.id !== item.id);
      return [...prev, { id: item.id, korean: item.korean, english: item.english, romanization: item.romanization }];
    });
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  const playAudio = (text, rate = 1.0) => {
    if ('speechSynthesis' in window && settings.audioEnabled) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = rate;
      speechSynthesis.speak(utterance);
    }
  };

  const exportData = () => {
    const data = { stats, settings, favorites, version: '3.0', exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `korean-fluency-quest-backup-${getTodayString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.stats) setStats({ ...defaultStats, ...data.stats });
        if (data.settings) setSettings({ ...defaultSettings, ...data.settings });
        if (data.favorites) setFavorites(data.favorites);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Error importing data. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  // ═══════════════════════════════════════════════════════════════
  // FLASHCARD FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startFlashcards = () => {
    const vocab = window.VOCABULARY || [];
    if (vocab.length === 0) { alert('No vocabulary loaded!'); return; }
    const filtered = vocab.filter(v => v.level <= settings.maxLevel);
    setDeck(shuffle(filtered).slice(0, 20));
    setCardIndex(0);
    setIsFlipped(false);
    setCorrect(0);
    setView('flashcards');
  };

  const nextCard = (wasCorrect) => {
    const card = deck[cardIndex];
    if (wasCorrect) {
      setCorrect(c => c + 1);
      addXP(5);
      setStats(s => ({ ...s, totalReviews: s.totalReviews + 1 }));
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

  const startQuiz = (mode = 'text') => {
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
    setQuizMode(mode);
    setView('quiz');
    
    // Auto-play audio for audio quiz mode
    if (mode === 'audio') {
      setTimeout(() => playAudio(questions[0].korean), 500);
    }
  };

  const answerQuiz = (answer) => {
    setSelectedAnswer(answer);
    const q = quizQuestions[quizIndex];
    const isCorrect = answer === q.correct;
    if (isCorrect) {
      setQuizScore(s => s + 1);
      addXP(10);
    } else {
      trackWrongAnswer({ id: q.id, korean: q.korean, english: q.correct }, 'quiz');
    }
    setTimeout(() => {
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(i => i + 1);
        setSelectedAnswer(null);
        if (quizMode === 'audio') {
          setTimeout(() => playAudio(quizQuestions[quizIndex + 1].korean), 300);
        }
      } else {
        updateStreak();
        const finalScore = quizScore + (isCorrect ? 1 : 0);
        if (finalScore === quizQuestions.length) {
          // Perfect quiz!
          setStats(s => {
            const newStats = { ...s, totalQuizzes: s.totalQuizzes + 1, perfectQuizzes: (s.perfectQuizzes || 0) + 1 };
            if (!newStats.unlockedAchievements?.includes('perfect_quiz')) {
              newStats.unlockedAchievements = [...(newStats.unlockedAchievements || []), 'perfect_quiz'];
              setNewAchievement(ACHIEVEMENTS.find(a => a.id === 'perfect_quiz'));
              setTimeout(() => setNewAchievement(null), 3000);
            }
            return newStats;
          });
        } else {
          setStats(s => ({ ...s, totalQuizzes: s.totalQuizzes + 1 }));
        }
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
    if (filtered.length === 0) { alert('No sentences at your level!'); return; }
    setSentence(filtered[Math.floor(Math.random() * filtered.length)]);
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
      addXP(15);
      setStats(s => ({ ...s, totalSentences: s.totalSentences + 1 }));
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
    setTimeout(() => playAudio(random.korean), 500);
  };

  const checkListening = () => {
    const normalize = (s) => s.trim().replace(/\s+/g, '');
    const isCorrect = normalize(listeningInput) === normalize(listeningWord.korean);
    setListeningFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      updateStreak();
      addXP(12);
      setStats(s => ({ ...s, totalListening: s.totalListening + 1 }));
      clearWrongAnswer(listeningWord.id);
    } else {
      trackWrongAnswer(listeningWord, 'listening');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // DIALOGUE FUNCTIONS
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
    const conversations = getDialogueConversations();
    if (conversations.length === 0) { alert('No dialogues!'); return; }
    const filtered = conversations.filter(c => c[0].level <= settings.maxLevel);
    if (filtered.length === 0) { alert('No dialogues at your level!'); return; }
    setDialogue(filtered[Math.floor(Math.random() * filtered.length)]);
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
    if (isCorrect) addXP(8);
    else trackWrongAnswer(currentLine, 'dialogue');
  };

  const advanceDialogue = () => {
    if (dialogueIndex < dialogue.length - 1) {
      setDialogueIndex(i => i + 1);
      setDialogueInput('');
      setDialogueFeedback(null);
      setShowHint(false);
    } else {
      updateStreak();
      setStats(s => ({ ...s, totalDialogues: (s.totalDialogues || 0) + 1 }));
      setView('dialogue-results');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // TYPING PRACTICE FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  const startTyping = () => {
    const vocab = window.VOCABULARY || [];
    if (vocab.length === 0) { alert('No vocabulary!'); return; }
    const filtered = vocab.filter(v => v.level <= settings.maxLevel && v.romanization);
    if (filtered.length === 0) { alert('No words with romanization at your level!'); return; }
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setTypingWord(random);
    setTypingInput('');
    setTypingFeedback(null);
    setView('typing');
  };

  const checkTyping = () => {
    const normalize = (s) => s.trim().replace(/\s+/g, '');
    const isCorrect = normalize(typingInput) === normalize(typingWord.korean);
    setTypingFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      updateStreak();
      addXP(10);
    } else {
      trackWrongAnswer(typingWord, 'typing');
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: ONBOARDING
  // ═══════════════════════════════════════════════════════════════

  if (showOnboarding) {
    return (
      <div className="app onboarding">
        <div className="onboarding-content">
          <h1>환영합니다! 🎉</h1>
          <h2>Welcome to Korean Fluency Quest!</h2>
          
          <div className="onboarding-features">
            <div className="feature">
              <span className="feature-icon">🃏</span>
              <span>Flashcards to build vocabulary</span>
            </div>
            <div className="feature">
              <span className="feature-icon">❓</span>
              <span>Quizzes to test your knowledge</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💬</span>
              <span>Dialogue practice for conversation</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👂</span>
              <span>Listening exercises for comprehension</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔥</span>
              <span>Daily streaks to stay motivated</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span>Achievements to unlock</span>
            </div>
          </div>

          <p className="onboarding-tip">
            💡 Tip: Practice a little every day to maintain your streak!
          </p>

          <button className="primary-btn" onClick={completeOnboarding}>
            Let's Go! 시작하자! →
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: ACHIEVEMENT POPUP
  // ═══════════════════════════════════════════════════════════════

  const AchievementPopup = () => {
    if (!newAchievement) return null;
    return (
      <div className="achievement-popup">
        <div className="achievement-content">
          <span className="achievement-icon">{newAchievement.icon}</span>
          <div>
            <h3>Achievement Unlocked!</h3>
            <p>{newAchievement.name}</p>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER: HOME
  // ═══════════════════════════════════════════════════════════════

  if (view === 'home') {
    const today = getTodayString();
    const practicedToday = stats.lastPracticeDate === today;

    return (
      <div className="app">
        <AchievementPopup />
        
        <header className="hero">
          <div className="hero-bg"></div>
          <div className="theme-toggle" onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}>
            {settings.theme === 'dark' ? '☀️' : '🌙'}
          </div>
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
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{(stats.unlockedAchievements || []).length}</span>
            <span className="stat-label">Badges</span>
          </div>
        </div>

        {!practicedToday && (
          <div className="daily-reminder">
            <span>📅</span> Practice today to keep your streak!
          </div>
        )}

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

          <button className="mode-card" onClick={() => startQuiz('text')}>
            <div className="mode-icon">❓</div>
            <div className="mode-info"><h3>Text Quiz</h3><p>Read and answer</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => startQuiz('audio')}>
            <div className="mode-icon">🔊</div>
            <div className="mode-info"><h3>Audio Quiz</h3><p>Listen and answer</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startSentence}>
            <div className="mode-icon">✍️</div>
            <div className="mode-info"><h3>Sentence Builder</h3><p>Write Korean sentences</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startListening}>
            <div className="mode-icon">👂</div>
            <div className="mode-info"><h3>Listening</h3><p>Train your ears</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => startDialogue('B')}>
            <div className="mode-icon">💬</div>
            <div className="mode-info"><h3>Dialogue</h3><p>Practice conversations</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={startTyping}>
            <div className="mode-icon">⌨️</div>
            <div className="mode-info"><h3>Typing Practice</h3><p>Romanization → Hangul</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('levels')}>
            <div className="mode-icon">📚</div>
            <div className="mode-info"><h3>Browse Levels</h3><p>Study by topic</p></div>
            <div className="mode-arrow">→</div>
          </button>

          <button className="mode-card" onClick={() => setView('grammar')}>
            <div className="mode-icon">📖</div>
            <div className="mode-info"><h3>Grammar</h3><p>Learn rules</p></div>
            <div className="mode-arrow">→</div>
          </button>

          {favorites.length > 0 && (
            <button className="mode-card favorites-card" onClick={() => setView('favorites')}>
              <div className="mode-icon">⭐</div>
              <div className="mode-info"><h3>Favorites</h3><p>{favorites.length} saved words</p></div>
              <div className="mode-arrow">→</div>
            </button>
          )}

          {(stats.wrongAnswers?.length > 0) && (
            <button className="mode-card review-card" onClick={() => setView('review-mistakes')}>
              <div className="mode-icon">🔄</div>
              <div className="mode-info"><h3>Review Mistakes</h3><p>{stats.wrongAnswers.length} to review</p></div>
              <div className="mode-arrow">→</div>
            </button>
          )}
        </nav>

        <div className="quick-actions">
          <button className="quick-btn" onClick={() => setView('achievements')}>🏆 Achievements</button>
          <button className="quick-btn" onClick={() => setView('stats')}>📊 Stats</button>
          <button className="quick-btn" onClick={() => setView('settings')}>⚙️ Settings</button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'achievements') {
    const unlocked = stats.unlockedAchievements || [];
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Achievements</h2>
        </header>
        <div style={{ padding: 20 }}>
          <p style={{ textAlign: 'center', marginBottom: 20, color: 'var(--text-secondary)' }}>
            {unlocked.length} / {ACHIEVEMENTS.length} unlocked
          </p>
          <div className="achievements-grid">
            {ACHIEVEMENTS.map(ach => {
              const isUnlocked = unlocked.includes(ach.id);
              return (
                <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <span className="achievement-icon">{isUnlocked ? ach.icon : '🔒'}</span>
                  <div>
                    <h4>{ach.name}</h4>
                    <p>{ach.desc}</p>
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
  // RENDER: FAVORITES
  // ═══════════════════════════════════════════════════════════════

  if (view === 'favorites') {
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Favorites ({favorites.length})</h2>
        </header>
        <div style={{ padding: 20 }}>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>⭐</div>
              <p>No favorites yet!</p>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Tap the star on flashcards to save words.</p>
            </div>
          ) : (
            favorites.map((item, i) => (
              <div key={item.id || i} className="favorite-card">
                <div>
                  <p style={{ fontSize: '1.3rem', marginBottom: 4 }}>{item.korean}</p>
                  {item.romanization && <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: 4 }}>{item.romanization}</p>}
                  <p style={{ color: 'var(--text-secondary)' }}>{item.english}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="icon-btn" onClick={() => playAudio(item.korean)}>🔊</button>
                  <button className="icon-btn" onClick={() => toggleFavorite(item)}>⭐</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: TYPING PRACTICE
  // ═══════════════════════════════════════════════════════════════

  if (view === 'typing') {
    if (!typingWord) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Typing Practice</h2>
        </header>
        <div style={{ padding: 20 }}>
          <div style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 16, marginBottom: 20, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: 8 }}>Type in Hangul:</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8 }}>{typingWord.romanization}</p>
            <p style={{ color: 'var(--text-secondary)' }}>{typingWord.english}</p>
          </div>
          <input
            type="text"
            className={`sentence-input ${typingFeedback || ''}`}
            value={typingInput}
            onChange={(e) => setTypingInput(e.target.value)}
            placeholder="Type Korean here..."
            autoFocus
          />
          {!typingFeedback && (
            <button className="primary-btn" style={{ width: '100%', marginTop: 16 }} onClick={checkTyping} disabled={!typingInput.trim()}>
              Check
            </button>
          )}
          {typingFeedback && (
            <div className={`sentence-feedback ${typingFeedback}`}>
              {typingFeedback === 'correct' ? (
                <span>✓ Correct! {typingWord.korean}</span>
              ) : (
                <div>
                  <p>Answer:</p>
                  <p className="correct-answer">{typingWord.korean}</p>
                </div>
              )}
            </div>
          )}
          {typingFeedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startTyping}>Next</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: FLASHCARDS
  // ═══════════════════════════════════════════════════════════════

  if (view === 'flashcards') {
    if (deck.length === 0) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    const card = deck[cardIndex];
    const favd = isFavorite(card.id);
    return (
      <div className="app">
        <AchievementPopup />
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{cardIndex + 1} / {deck.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }}></div></div>
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
            <div className="card-face card-front">
              <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); toggleFavorite(card); }}>{favd ? '⭐' : '☆'}</button>
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
            <button className="response-btn again" onClick={() => nextCard(false)}>❌ Wrong</button>
            <button className="response-btn good" onClick={() => nextCard(true)}>✓ Correct</button>
          </div>
        )}
        {settings.audioEnabled && <button className="primary-btn" style={{ margin: '20px auto', display: 'block' }} onClick={() => playAudio(card.korean)}>🔊 Audio</button>}
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
        <AchievementPopup />
        <div className="results-screen">
          <div className="results-card">
            <h2>Session Complete! 🎉</h2>
            <div className="results-stats">
              <div className="result-stat"><span className="result-value">{correct}/{deck.length}</span><span className="result-label">Correct</span></div>
              <div className="result-stat"><span className="result-value">{accuracy}%</span><span className="result-label">Accuracy</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={startFlashcards}>Again</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
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
    if (quizQuestions.length === 0) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    const q = quizQuestions[quizIndex];
    return (
      <div className="app">
        <AchievementPopup />
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{quizIndex + 1} / {quizQuestions.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}></div></div>
        <div style={{ padding: 20 }}>
          <div className="quiz-question">
            {quizMode === 'text' ? (
              <>
                <span className="question-label">What does this mean?</span>
                <span className="question-korean">{q.korean}</span>
              </>
            ) : (
              <>
                <span className="question-label">Listen and choose:</span>
                <button className="audio-play-btn" onClick={() => playAudio(q.korean)}>
                  🔊 Play Again
                </button>
              </>
            )}
          </div>
          <div className="quiz-options">
            {q.options.map((opt, i) => {
              let cls = 'quiz-option';
              if (selectedAnswer) {
                if (opt === q.correct) cls += ' correct';
                else if (opt === selectedAnswer) cls += ' incorrect';
              }
              return <button key={i} className={cls} onClick={() => !selectedAnswer && answerQuiz(opt)} disabled={!!selectedAnswer}>{opt}</button>;
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
    const isPerfect = quizScore === quizQuestions.length;
    return (
      <div className="app">
        <AchievementPopup />
        <div className="results-screen">
          <div className="results-card">
            <h2>{isPerfect ? 'Perfect Score! 💯' : 'Quiz Complete! 🎉'}</h2>
            <div className="results-stats">
              <div className="result-stat"><span className="result-value">{quizScore}/{quizQuestions.length}</span><span className="result-label">Correct</span></div>
              <div className="result-stat"><span className="result-value">{accuracy}%</span><span className="result-label">Accuracy</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={() => startQuiz(quizMode)}>Again</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: DIALOGUE
  // ═══════════════════════════════════════════════════════════════

  if (view === 'dialogue') {
    if (dialogue.length === 0) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    const currentLine = dialogue[dialogueIndex];
    const isUserTurn = currentLine.speaker === dialogueRole;
    return (
      <div className="app">
        <AchievementPopup />
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <div className="progress-text">{dialogueIndex + 1} / {dialogue.length}</div>
        </header>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${((dialogueIndex + 1) / dialogue.length) * 100}%` }}></div></div>
        <div style={{ padding: 20 }}>
          <div className="role-indicator">You are <strong>Person {dialogueRole}</strong></div>
          <div className="dialogue-history">
            {dialogue.slice(0, dialogueIndex + 1).map((line, i) => {
              const isUser = line.speaker === dialogueRole;
              const isCurrent = i === dialogueIndex;
              return (
                <div key={line.id} className={`dialogue-bubble ${isUser ? 'user' : 'partner'} ${isCurrent ? 'current' : ''}`}>
                  <div className="bubble-speaker">{isUser ? 'You' : `Person ${line.speaker}`}</div>
                  {(!isCurrent || !isUser || dialogueFeedback) && <p className="bubble-korean">{line.korean}</p>}
                  {isCurrent && isUser && !dialogueFeedback && <p className="bubble-korean placeholder">???</p>}
                  {(!isCurrent || !isUser || dialogueFeedback || showHint) && <p className="bubble-english">{line.english}</p>}
                </div>
              );
            })}
          </div>
          {isUserTurn && !dialogueFeedback && (
            <div className="dialogue-input-area">
              <div className="prompt-box">
                <p>Your turn! Say:</p>
                <p className="prompt-english">"{currentLine.english}"</p>
              </div>
              <input type="text" className="sentence-input" value={dialogueInput} onChange={(e) => setDialogueInput(e.target.value)} placeholder="Type Korean..." autoFocus />
              <div className="dialogue-buttons">
                <button className="primary-btn" onClick={checkDialogueAnswer} disabled={!dialogueInput.trim()}>Check</button>
                <button className="secondary-btn" onClick={() => setShowHint(!showHint)}>💡 Hint</button>
              </div>
              {showHint && <div className="hint-box"><p>Answer: {currentLine.korean}</p></div>}
            </div>
          )}
          {isUserTurn && dialogueFeedback && (
            <div className={`sentence-feedback ${dialogueFeedback}`}>
              {dialogueFeedback === 'correct' ? <span>✓ Perfect!</span> : <div><p>Answer:</p><p className="correct-answer">{currentLine.korean}</p></div>}
            </div>
          )}
          {(!isUserTurn || dialogueFeedback) && (
            <div className="dialogue-buttons">
              <button className="secondary-btn" onClick={() => playAudio(currentLine.korean)}>🔊</button>
              <button className="primary-btn" style={{ flex: 1 }} onClick={advanceDialogue}>{dialogueIndex < dialogue.length - 1 ? 'Continue →' : 'Finish 🎉'}</button>
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
        <AchievementPopup />
        <div className="results-screen">
          <div className="results-card">
            <h2>Dialogue Complete! 💬</h2>
            <div style={{ fontSize: '4rem', margin: '20px 0' }}>🎉</div>
            <div className="results-stats">
              <div className="result-stat"><span className="result-value">{dialogue.length}</span><span className="result-label">Lines</span></div>
              <div className="result-stat"><span className="result-value">+{dialogue.filter(d => d.speaker === dialogueRole).length * 8}</span><span className="result-label">XP</span></div>
            </div>
            <div className="result-actions">
              <button className="primary-btn" onClick={() => startDialogue(dialogueRole)}>Again</button>
              <button className="secondary-btn" onClick={() => startDialogue(dialogueRole === 'A' ? 'B' : 'A')}>Switch Roles</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
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
    if (!sentence) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    return (
      <div className="app">
        <AchievementPopup />
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Sentence Builder</h2>
        </header>
        <div style={{ padding: 20 }}>
          <div className="prompt-card">
            <p className="prompt-label">Translate to Korean:</p>
            <p className="prompt-text">{sentence.english}</p>
          </div>
          <input type="text" className={`sentence-input ${feedback || ''}`} value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type Korean..." autoFocus />
          {!feedback && <button className="primary-btn" style={{ width: '100%', marginTop: 16 }} onClick={checkSentence} disabled={!userInput.trim()}>Check</button>}
          {feedback && (
            <div className={`sentence-feedback ${feedback}`}>
              {feedback === 'correct' ? <span>✓ Correct!</span> : <div><p>Answer:</p><p className="correct-answer">{sentence.korean}</p></div>}
            </div>
          )}
          {feedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startSentence}>Next</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
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
    if (!listeningWord) return <div className="app"><p style={{ padding: 20, textAlign: 'center' }}>Loading...</p></div>;
    return (
      <div className="app">
        <AchievementPopup />
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Listening</h2>
        </header>
        <div style={{ padding: 20 }}>
          <div className="listening-controls">
            <p>Listen and type what you hear:</p>
            <div className="audio-buttons">
              <button className="primary-btn" onClick={() => playAudio(listeningWord.korean)}>🔊 Play</button>
              <button className="secondary-btn" onClick={() => playAudio(listeningWord.korean, 0.6)}>🐢 Slow</button>
            </div>
          </div>
          <input type="text" className={`sentence-input ${listeningFeedback || ''}`} value={listeningInput} onChange={(e) => setListeningInput(e.target.value)} placeholder="Type what you hear..." autoFocus />
          {!listeningFeedback && <button className="primary-btn" style={{ width: '100%', marginTop: 16 }} onClick={checkListening} disabled={!listeningInput.trim()}>Check</button>}
          {listeningFeedback && (
            <div className={`sentence-feedback ${listeningFeedback}`}>
              <p className="correct-answer">{listeningWord.korean}</p>
              <p style={{ opacity: 0.8 }}>{listeningWord.english}</p>
            </div>
          )}
          {listeningFeedback && (
            <div className="result-actions" style={{ marginTop: 24 }}>
              <button className="primary-btn" onClick={startListening}>Next</button>
              <button className="secondary-btn" onClick={() => setView('home')}>Home</button>
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
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Levels</h2>
        </header>
        <div style={{ padding: 20 }}>
          {levels.map(lvl => {
            const vocabCount = (window.VOCABULARY || []).filter(v => v.level === lvl.level).length;
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
            <button className="back-btn" onClick={() => setSelectedGrammar(null)}>← Back</button>
            <h2>{g.emoji} {g.title}</h2>
          </header>
          <div style={{ padding: 20 }}>
            <div className="grammar-section"><h3>Pattern</h3><p className="grammar-pattern">{g.pattern}</p></div>
            <div className="grammar-section"><h3>Explanation</h3><p>{g.explanation}</p></div>
            {g.examples?.length > 0 && (
              <div className="grammar-section">
                <h3>Examples</h3>
                {g.examples.map((ex, i) => (
                  <div key={i} className="grammar-example">
                    <p className="example-korean">{ex.korean}</p>
                    <p className="example-english">{ex.english}</p>
                    <button className="icon-btn" onClick={() => playAudio(ex.korean)}>🔊</button>
                  </div>
                ))}
              </div>
            )}
            {g.tips && <div className="grammar-tip"><h3>💡 Pro Tip</h3><p>{g.tips}</p></div>}
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Grammar</h2>
        </header>
        <div style={{ padding: 20 }}>
          {grammar.map(g => (
            <button key={g.id} className="mode-card" onClick={() => setSelectedGrammar(g)}>
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
            <button className="back-btn" onClick={() => setView('home')}>← Back</button>
            <h2>Review</h2>
          </header>
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>No mistakes!</h3>
            <p>Keep up the great work!</p>
            <button className="primary-btn" onClick={() => setView('home')}>Home</button>
          </div>
        </div>
      );
    }
    return (
      <div className="app">
        <header className="screen-header">
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Review ({wrongAnswers.length})</h2>
        </header>
        <div style={{ padding: 20 }}>
          {wrongAnswers.map((item, i) => (
            <div key={item.id || i} className="review-card">
              <div>
                <p className="review-korean">{item.korean}</p>
                <p className="review-english">{item.english}</p>
              </div>
              <div className="review-actions">
                <button className="icon-btn" onClick={() => playAudio(item.korean)}>🔊</button>
                <button className="icon-btn success" onClick={() => clearWrongAnswer(item.id)}>✓</button>
              </div>
            </div>
          ))}
          <button className="danger-btn" style={{ width: '100%', marginTop: 20 }} onClick={() => { if (confirm('Clear all?')) setStats(s => ({ ...s, wrongAnswers: [] })); }}>Clear All</button>
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
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Statistics</h2>
        </header>
        <div style={{ padding: 20 }}>
          <div className="streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-number">{stats.currentStreak || 0}</div>
            <div className="streak-label">Day Streak</div>
            <div className="streak-best">Best: {stats.longestStreak || 0} days</div>
            {!practicedToday && <div className="streak-reminder">Practice today! 💪</div>}
          </div>
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon">⚡</div><div className="stat-value">{stats.xp || 0}</div><div className="stat-label">Total XP</div></div>
            <div className="stat-card"><div className="stat-icon">📖</div><div className="stat-value">{stats.totalReviews || 0}</div><div className="stat-label">Reviews</div></div>
            <div className="stat-card"><div className="stat-icon">❓</div><div className="stat-value">{stats.totalQuizzes || 0}</div><div className="stat-label">Quizzes</div></div>
            <div className="stat-card"><div className="stat-icon">✍️</div><div className="stat-value">{stats.totalSentences || 0}</div><div className="stat-label">Sentences</div></div>
            <div className="stat-card"><div className="stat-icon">👂</div><div className="stat-value">{stats.totalListening || 0}</div><div className="stat-label">Listening</div></div>
            <div className="stat-card"><div className="stat-icon">💬</div><div className="stat-value">{stats.totalDialogues || 0}</div><div className="stat-label">Dialogues</div></div>
          </div>
          <div className="vocab-progress">
            <h3>Vocabulary</h3>
            <p>Words in app: {(window.VOCABULARY || []).length}</p>
            <p>Your max level: {settings.maxLevel}</p>
            <p>Available words: {(window.VOCABULARY || []).filter(v => v.level <= settings.maxLevel).length}</p>
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
          <button className="back-btn" onClick={() => setView('home')}>← Back</button>
          <h2>Settings</h2>
        </header>
        <div style={{ padding: 20 }}>
          <div className="settings-content">
            <div className="setting-group">
              <span className="setting-label">Theme</span>
              <div className="theme-buttons">
                <button className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`} onClick={() => setSettings(s => ({ ...s, theme: 'dark' }))}>🌙 Dark</button>
                <button className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`} onClick={() => setSettings(s => ({ ...s, theme: 'light' }))}>☀️ Light</button>
              </div>
            </div>
            <div className="setting-group">
              <span className="setting-label">Max Level</span>
              <select className="setting-select" value={settings.maxLevel} onChange={(e) => setSettings(s => ({ ...s, maxLevel: parseInt(e.target.value) }))}>
                {[...Array(40)].map((_, i) => <option key={i + 1} value={i + 1}>Level {i + 1}</option>)}
              </select>
            </div>
            <div className="setting-group">
              <div className="setting-toggle">
                <span>Show Romanization</span>
                <div className={`toggle-switch ${settings.showRomanization ? 'active' : ''}`} onClick={() => setSettings(s => ({ ...s, showRomanization: !s.showRomanization }))}></div>
              </div>
            </div>
            <div className="setting-group">
              <div className="setting-toggle">
                <span>Audio</span>
                <div className={`toggle-switch ${settings.audioEnabled ? 'active' : ''}`} onClick={() => setSettings(s => ({ ...s, audioEnabled: !s.audioEnabled }))}></div>
              </div>
            </div>
            <div className="setting-group">
              <span className="setting-label">Data</span>
              <button className="secondary-btn" style={{ width: '100%', marginBottom: 10 }} onClick={exportData}>📤 Export Progress</button>
              <label className="secondary-btn" style={{ width: '100%', display: 'block', textAlign: 'center', cursor: 'pointer' }}>
                📥 Import Progress
                <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
              </label>
            </div>
            <div className="setting-group danger">
              <span className="setting-label">Danger Zone</span>
              <button className="danger-btn" style={{ width: '100%' }} onClick={() => { if (confirm('Reset ALL progress? This cannot be undone!')) { setStats(defaultStats); setFavorites([]); alert('Reset complete!'); } }}>Reset All Progress</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return <div className="app"><p style={{ padding: 20 }}>Loading...</p></div>;
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
