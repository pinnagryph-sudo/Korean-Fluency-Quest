# Korean Fluency Quest v3.0 🇰🇷

A gamified Korean learning app with comprehensive features for vocabulary, grammar, dialogue practice, and more. Built as a Progressive Web App (PWA) for offline use.

## ✨ What's New in v3.0

### 🎨 Theme System
- **Dark/Light Theme Toggle** - Switch between themes with one tap
- Smooth transitions between themes
- Theme preference saved automatically

### 🏆 Achievements System
- **17 unlockable badges** to earn
- Achievement popup animations when unlocked
- Tracks streaks, XP milestones, quiz completions
- Special achievements: Night Owl, Early Bird, Perfectionist

### 📚 Extended Dialogues
- **106 dialogue lines** covering levels 3-40
- More conversation topics: work, health, housing, travel, internet slang
- Native-speaker style expressions

### 🆕 New Practice Modes
- **Audio Quiz** - Listen to Korean, pick the meaning
- **Typing Practice** - See romanization, type Hangul
- Both modes track progress and award XP

### ⭐ Favorites System
- Star any word to save it
- Quick access from home screen
- Review your saved words anytime

### 💾 Data Management
- **Export Progress** - Download your stats as JSON
- **Import Progress** - Restore from backup
- Never lose your streak again!

### 🎓 Onboarding Tutorial
- Welcome screen for new users
- Feature overview with icons
- Gets new learners started quickly

## All Features

### Practice Modes
| Mode | Description | XP |
|------|-------------|-----|
| 🃏 Flashcards | Review vocabulary with SRS | +5 per card |
| ❓ Text Quiz | Multiple choice vocabulary | +10 per correct |
| 🔊 Audio Quiz | Listen and choose meaning | +10 per correct |
| ✍️ Sentence Builder | Type Korean translations | +15 per sentence |
| 👂 Listening | Type what you hear | +12 per correct |
| 💬 Dialogue | Practice conversations | +8 per line |
| ⌨️ Typing Practice | Romanization → Hangul | +10 per word |

### Gamification
- 🔥 Daily Streaks - Keep practicing to maintain your streak
- ⚡ XP System - Earn points for all activities
- 🏆 17 Achievements - Unlock badges for milestones
- 📊 Statistics Dashboard - Track all your progress

### Content
- **413 vocabulary words** across 40 levels
- **114 practice sentences**
- **106 dialogue lines** (18+ conversations)
- **21 grammar points** with examples
- **40 levels** based on the Korean Fluency Quest course

## Deployment

### GitHub Pages
1. Upload all files to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main → root
4. Your app will be live at `https://username.github.io/repo-name`

### After Updates
Bump the version in `sw.js` to force cache refresh:
```javascript
const CACHE_NAME = 'korean-fluency-quest-v3.0.1';
```

## Achievements

| Badge | Name | Requirement |
|-------|------|-------------|
| 🎯 | First Steps | Complete first flashcard |
| 🔥 | Getting Warm | 3 day streak |
| 🔥🔥 | On Fire | 7 day streak |
| 🔥🔥🔥 | Unstoppable | 30 day streak |
| ⚡ | Centurion | Earn 100 XP |
| ⭐ | Rising Star | Earn 500 XP |
| 📚 | Scholar | Earn 1000 XP |
| 🏆 | Master | Earn 5000 XP |
| ❓ | Quiz Taker | Complete 10 quizzes |
| 🧠 | Quiz Pro | Complete 50 quizzes |
| 📖 | Reviewer | Review 100 cards |
| 💪 | Dedicated | Review 500 cards |
| 💬 | Conversationalist | Complete 1 dialogue |
| 🗣️ | Chatterbox | Complete 10 dialogues |
| 💯 | Perfectionist | Get 100% on a quiz |
| 🦉 | Night Owl | Practice after midnight |
| 🐦 | Early Bird | Practice before 7am |

---

화이팅! 🇰🇷 Good luck with your Korean studies!
