// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Levels & Achievements
// Course structure and gamification elements
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// LEVELS - Course Structure from Korean Fluency Quest
// ═══════════════════════════════════════════════════════════════

window.LEVELS = [
  // PART 1: THE FOUNDATION (Levels 1-10)
  { level: 1, title: 'First Contact', emoji: '👋', focus: 'Introductions & Basic Particles (은/는, 이/가, 이다)', part: 1, xpRequired: 0 },
  { level: 2, title: 'Where Is Everything?', emoji: '📍', focus: 'Existence (있다/없다) & Location Markers', part: 1, xpRequired: 100 },
  { level: 3, title: 'Doing Stuff', emoji: '🎬', focus: 'Action Verbs & Object Marker (을/를)', part: 1, xpRequired: 200 },
  { level: 4, title: 'Describing Your World', emoji: '🎨', focus: 'Adjectives & Descriptions', part: 1, xpRequired: 300 },
  { level: 5, title: 'Asking Questions', emoji: '❓', focus: 'Question Words (뭐, 누구, 어디, 언제, 왜, 어떻게)', part: 1, xpRequired: 400 },
  { level: 6, title: 'Time Travel', emoji: '⏰', focus: 'Past, Present, Future Tenses', part: 1, xpRequired: 500 },
  { level: 7, title: 'Wants, Likes & Wishes', emoji: '💫', focus: 'Expressing Desires (-고 싶다, 좋아하다)', part: 1, xpRequired: 600 },
  { level: 8, title: 'Making Suggestions', emoji: '🤝', focus: 'Proposals & Invitations (-ㄹ/을까요, -ㄹ/을래요)', part: 1, xpRequired: 700 },
  { level: 9, title: 'Connecting Ideas', emoji: '🔗', focus: 'Conjunctions (그리고, 그래서, 그런데, -고)', part: 1, xpRequired: 800 },
  { level: 10, title: 'Negation Station', emoji: '🚫', focus: 'Negation (안, 못, 아니다, -지 않다)', part: 1, xpRequired: 900 },

  // PART 2: THE EXPANSION (Levels 11-20)
  { level: 11, title: 'Can & Can\'t', emoji: '💪', focus: 'Ability (-ㄹ/을 수 있다/없다, 잘하다/못하다)', part: 2, xpRequired: 1000 },
  { level: 12, title: 'Been There, Done That', emoji: '✈️', focus: 'Experience Marker (-아/어 봤다)', part: 2, xpRequired: 1150 },
  { level: 13, title: 'Gotta Do It', emoji: '📋', focus: 'Obligations (-아/어야 하다/되다)', part: 2, xpRequired: 1300 },
  { level: 14, title: 'If This, Then That', emoji: '🔀', focus: 'Conditionals (-(으)면)', part: 2, xpRequired: 1450 },
  { level: 15, title: 'Comparing Things', emoji: '⚖️', focus: 'Comparisons (더, 덜, 가장, 보다)', part: 2, xpRequired: 1600 },
  { level: 16, title: 'Giving & Receiving', emoji: '🎁', focus: 'Give/Receive Verbs (주다, 받다, -아/어 주다)', part: 2, xpRequired: 1750 },
  { level: 17, title: 'Explaining Why', emoji: '📢', focus: 'Reason Connectors (-아/어서, -니까)', part: 2, xpRequired: 1900 },
  { level: 18, title: 'Future Plans', emoji: '🎯', focus: 'Future Tense & Plans (-ㄹ/을 거예요, -겠-)', part: 2, xpRequired: 2050 },
  { level: 19, title: 'While Doing', emoji: '🧘', focus: 'Simultaneous Actions (-면서)', part: 2, xpRequired: 2200 },
  { level: 20, title: 'Reported Speech', emoji: '📣', focus: 'Quoting Others (-다고 하다)', part: 2, xpRequired: 2350 },

  // PART 3: THE ADVANCEMENT (Levels 21-30)
  { level: 21, title: 'Speaking Respectfully', emoji: '🙏', focus: 'Honorifics (-시-, Special Verbs)', part: 3, xpRequired: 2500 },
  { level: 22, title: 'What Others Think', emoji: '🔮', focus: 'Guessing & Supposing (-것 같다)', part: 3, xpRequired: 2700 },
  { level: 23, title: 'If Only...', emoji: '💭', focus: 'Past Regrets & Hypotheticals (-았/었더라면)', part: 3, xpRequired: 2900 },
  { level: 24, title: 'Smooth Transitions', emoji: '🌊', focus: 'Advanced Connectors (-는데, -더니)', part: 3, xpRequired: 3100 },
  { level: 25, title: 'Passive Voice', emoji: '🎭', focus: 'Passive Constructions (-이/히/리/기)', part: 3, xpRequired: 3300 },
  { level: 26, title: 'Making Things Happen', emoji: '🎪', focus: 'Causative Constructions (-시키다, -게 하다)', part: 3, xpRequired: 3500 },
  { level: 27, title: 'Despite Everything', emoji: '⚖️', focus: 'Concession (-아/어도, -지만)', part: 3, xpRequired: 3700 },
  { level: 28, title: 'To What Degree', emoji: '📊', focus: 'Degree Expressions (-을 정도로, -을 만큼)', part: 3, xpRequired: 3900 },
  { level: 29, title: 'Natural Speech', emoji: '🗣️', focus: 'Speech Levels & Register Shifting', part: 3, xpRequired: 4100 },
  { level: 30, title: 'Part 3 Complete', emoji: '📚', focus: 'Review & Consolidation', part: 3, xpRequired: 4300 },

  // PART 4: THE FLUENCY (Levels 31-40)
  { level: 31, title: 'Expression Expert', emoji: '💝', focus: 'Common Expressions & Idioms', part: 4, xpRequired: 4500 },
  { level: 32, title: 'Wisdom Keeper', emoji: '🎲', focus: 'Proverbs & 4-Character Idioms', part: 4, xpRequired: 4750 },
  { level: 33, title: 'Internet Native', emoji: '💬', focus: 'Slang, Texting & Internet Language', part: 4, xpRequired: 5000 },
  { level: 34, title: 'Corporate Ready', emoji: '👔', focus: 'Work Korean & Professional Communication', part: 4, xpRequired: 5250 },
  { level: 35, title: 'Social Butterfly', emoji: '🎉', focus: 'Social Situations & Small Talk', part: 4, xpRequired: 5500 },
  { level: 36, title: 'Heart Flutter', emoji: '💕', focus: 'Dating & Romance Korean', part: 4, xpRequired: 5750 },
  { level: 37, title: 'Tourist Ready', emoji: '✈️', focus: 'Travel & Emergency Korean', part: 4, xpRequired: 6000 },
  { level: 38, title: 'Grammar Wizard', emoji: '🌍', focus: 'Advanced Grammar Review', part: 4, xpRequired: 6250 },
  { level: 39, title: 'Practice Champion', emoji: '🧩', focus: 'Comprehensive Practice', part: 4, xpRequired: 6500 },
  { level: 40, title: 'Fluency Master', emoji: '🌟', focus: 'Final Assessment & Celebration', part: 4, xpRequired: 6750 },
];

// ═══════════════════════════════════════════════════════════════
// ACHIEVEMENTS - Gamification System
// ═══════════════════════════════════════════════════════════════

window.ACHIEVEMENTS = [
  // Milestone Achievements
  { id: 'first_card', name: 'First Contact', desc: 'Review your first flashcard', icon: '👋', xp: 10, category: 'milestone' },
  { id: 'first_quiz', name: 'Quiz Taker', desc: 'Complete your first quiz', icon: '❓', xp: 15, category: 'milestone' },
  { id: 'first_sentence', name: 'Sentence Builder', desc: 'Complete your first sentence exercise', icon: '✍️', xp: 15, category: 'milestone' },
  { id: 'first_listen', name: 'Good Listener', desc: 'Complete your first listening exercise', icon: '👂', xp: 15, category: 'milestone' },

  // Streak Achievements
  { id: 'streak_5', name: 'On Fire', desc: 'Get 5 correct in a row', icon: '🔥', xp: 25, category: 'streak' },
  { id: 'streak_10', name: 'Unstoppable', desc: 'Get 10 correct in a row', icon: '⚡', xp: 50, category: 'streak' },
  { id: 'streak_25', name: 'Legendary Streak', desc: 'Get 25 correct in a row', icon: '💎', xp: 100, category: 'streak' },
  { id: 'streak_50', name: 'Perfect Flow', desc: 'Get 50 correct in a row', icon: '🏆', xp: 200, category: 'streak' },

  // Vocabulary Achievements
  { id: 'vocab_25', name: 'Word Collector', desc: 'Master 25 vocabulary words', icon: '📚', xp: 50, category: 'vocabulary' },
  { id: 'vocab_50', name: 'Vocabulary Pro', desc: 'Master 50 vocabulary words', icon: '🎓', xp: 100, category: 'vocabulary' },
  { id: 'vocab_100', name: 'Word Wizard', desc: 'Master 100 vocabulary words', icon: '🧙', xp: 200, category: 'vocabulary' },
  { id: 'vocab_150', name: 'Lexicon Legend', desc: 'Master 150 vocabulary words', icon: '👑', xp: 300, category: 'vocabulary' },

  // Quiz Achievements
  { id: 'quiz_perfect', name: 'Perfect Score', desc: 'Get 100% on a quiz', icon: '💯', xp: 30, category: 'quiz' },
  { id: 'quiz_10', name: 'Quiz Enthusiast', desc: 'Complete 10 quizzes', icon: '📝', xp: 50, category: 'quiz' },
  { id: 'quiz_25', name: 'Quiz Master', desc: 'Complete 25 quizzes', icon: '🎯', xp: 100, category: 'quiz' },
  { id: 'quiz_50', name: 'Quiz Champion', desc: 'Complete 50 quizzes', icon: '🏅', xp: 150, category: 'quiz' },

  // Sentence Achievements
  { id: 'sentence_10', name: 'Sentence Starter', desc: 'Complete 10 sentence exercises', icon: '🔨', xp: 40, category: 'sentence' },
  { id: 'sentence_25', name: 'Grammar Guru', desc: 'Complete 25 sentence exercises', icon: '📖', xp: 75, category: 'sentence' },
  { id: 'sentence_50', name: 'Sentence Master', desc: 'Complete 50 sentence exercises', icon: '✨', xp: 150, category: 'sentence' },

  // Listening Achievements
  { id: 'listen_10', name: 'Keen Ears', desc: 'Complete 10 listening exercises', icon: '👂', xp: 40, category: 'listening' },
  { id: 'listen_25', name: 'Sound Scholar', desc: 'Complete 25 listening exercises', icon: '🎧', xp: 75, category: 'listening' },
  { id: 'listen_50', name: 'Listening Legend', desc: 'Complete 50 listening exercises', icon: '🎵', xp: 150, category: 'listening' },

  // Daily Practice
  { id: 'daily_3', name: 'Daily Dedication', desc: 'Practice 3 days in a row', icon: '📅', xp: 75, category: 'daily' },
  { id: 'daily_7', name: 'Week Warrior', desc: 'Practice 7 days in a row', icon: '🗓️', xp: 150, category: 'daily' },
  { id: 'daily_14', name: 'Fortnight Fighter', desc: 'Practice 14 days in a row', icon: '💪', xp: 250, category: 'daily' },
  { id: 'daily_30', name: 'Month Master', desc: 'Practice 30 days in a row', icon: '🌟', xp: 500, category: 'daily' },

  // Level Achievements
  { id: 'level_5', name: 'Rising Star', desc: 'Reach Level 5', icon: '⭐', xp: 100, category: 'level' },
  { id: 'level_10', name: 'Foundation Complete', desc: 'Complete Part 1 (Level 10)', icon: '🏗️', xp: 200, category: 'level' },
  { id: 'level_20', name: 'Expansion Complete', desc: 'Complete Part 2 (Level 20)', icon: '🚀', xp: 300, category: 'level' },
  { id: 'level_30', name: 'Advancement Complete', desc: 'Complete Part 3 (Level 30)', icon: '🎓', xp: 400, category: 'level' },
  { id: 'level_40', name: 'Fluency Master', desc: 'Complete all 40 levels!', icon: '👑', xp: 1000, category: 'level' },

  // Special Achievements
  { id: 'night_owl', name: 'Night Owl', desc: 'Study after midnight', icon: '🦉', xp: 25, category: 'special' },
  { id: 'early_bird', name: 'Early Bird', desc: 'Study before 6 AM', icon: '🐦', xp: 25, category: 'special' },
  { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete a quiz in under 30 seconds', icon: '⚡', xp: 30, category: 'special' },
  { id: 'perfectionist', name: 'Perfectionist', desc: 'Get 5 perfect quizzes', icon: '✨', xp: 100, category: 'special' },
  { id: 'comeback_kid', name: 'Comeback Kid', desc: 'Return after 7+ days away', icon: '🔄', xp: 50, category: 'special' },
];

// ═══════════════════════════════════════════════════════════════
// PART INFORMATION
// ═══════════════════════════════════════════════════════════════

window.PARTS = [
  { part: 1, name: 'The Foundation', levels: '1-10', description: 'Build your Korean skeleton', color: '#4ade80' },
  { part: 2, name: 'The Expansion', levels: '11-20', description: 'Expand your abilities', color: '#60a5fa' },
  { part: 3, name: 'The Advancement', levels: '21-30', description: 'Advanced grammar & nuance', color: '#c084fc' },
  { part: 4, name: 'The Fluency', levels: '31-40', description: 'Real-world Korean mastery', color: '#f472b6' },
];

// Helper functions
window.getLevelInfo = (level) => window.LEVELS.find(l => l.level === level);
window.getLevelsByPart = (part) => window.LEVELS.filter(l => l.part === part);
window.getPartInfo = (part) => window.PARTS.find(p => p.part === part);
window.getAchievementsByCategory = (category) => window.ACHIEVEMENTS.filter(a => a.category === category);
window.calculateLevelFromXP = (xp) => {
  const levels = [...window.LEVELS].reverse();
  return levels.find(l => xp >= l.xpRequired)?.level || 1;
};
