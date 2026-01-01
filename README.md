# Korean Fluency Quest 🇰🇷

A gamified Korean learning app with flashcards, quizzes, spaced repetition, listening practice, and comprehensive grammar reference. Built as a Progressive Web App (PWA) for offline use.

## ✨ What's New in v2.0

- **Expanded Vocabulary**: 267 words (up from 180+)
- **More Sentences**: 114 sentences + 153 dialogue lines
- **Grammar Reference**: 21 comprehensive grammar explanations with examples
- **PWA Icons**: Full icon set for installation on any device

## Features

### 🃏 Flashcard Mode
- **267 vocabulary words** from all 40 levels
- Spaced Repetition System (SRS) for optimal learning
- Four response options: Again, Hard, Good, Easy
- Audio pronunciation using Web Speech API
- Mastery tracking with visual indicators

### ❓ Quiz Mode
- Multiple choice vocabulary quizzes
- 10 questions per session
- Immediate feedback
- Speed achievements for fast completion

### ✍️ Sentence Builder
- **114 practice sentences** + **153 dialogue lines**
- Type Korean translations from English prompts
- Grammar hints and difficulty levels

### 👂 Listening Practice
- Audio pronunciation challenges
- Slow and normal speed options
- Type what you hear exercises

### 📖 Grammar Reference (NEW!)
- **21 comprehensive grammar points**
- Detailed explanations with examples
- Audio playback for all example sentences
- Related grammar linking
- Pro tips and usage notes

### 🏆 Gamification
- XP points for all activities
- 40 levels based on the Korean Fluency Quest course
- 30+ achievements to unlock
- Daily streak tracking
- Statistics dashboard

## File Structure (Flat - GitHub Web Upload Compatible)

```
korean-fluency-quest/
├── index.html           # Main HTML entry point
├── manifest.json        # PWA manifest
├── sw.js                # Service worker v2.0.0
├── styles.css           # All styles
├── app.jsx              # Main React application
├── data-vocabulary.js   # 267 vocabulary words
├── data-sentences.js    # 114 sentences + 153 dialogues
├── data-levels.js       # 40 levels & 30 achievements
├── data-grammar.js      # 21 grammar reference points
├── utils-helpers.js     # Storage & utility functions
├── utils-srs.js         # Spaced Repetition System
├── utils-audio.js       # Text-to-Speech (Web Speech API)
├── icon-72.png          # PWA icons (all sizes)
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png
├── icon-384.png
├── icon-512.png
├── icon.svg
└── README.md
```

## Editing Guide

| Want to change... | Edit this file |
|-------------------|----------------|
| Vocabulary words | `data-vocabulary.js` |
| Practice sentences | `data-sentences.js` |
| Grammar explanations | `data-grammar.js` |
| Levels & achievements | `data-levels.js` |
| SRS algorithm | `utils-srs.js` |
| Audio settings | `utils-audio.js` |
| App UI & logic | `app.jsx` |
| Colors & styling | `styles.css` |

### To add vocabulary:
Edit `data-vocabulary.js`:
```javascript
{ id: 'v999', korean: '새단어', romanization: 'saedaneo', english: 'new word', level: 1, audio: true }
```

### To add grammar points:
Edit `data-grammar.js`:
```javascript
{
  id: 'g999', level: 5, title: 'New Pattern', shortDesc: 'Brief description',
  pattern: 'Pattern', explanation: 'Full explanation...',
  examples: [{ korean: '예문', english: 'Example' }],
  tips: 'Pro tip', emoji: '📝'
}
```

## Deployment

### GitHub Pages
1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main → root
4. Your app will be live at `https://username.github.io/repo-name`

### After any changes:
**Important:** Bump the version in `sw.js`:
```javascript
const CACHE_NAME = 'korean-fluency-quest-v2.0.1'; // Change version number
```

## PWA Features

- **Installable**: Can be installed on desktop and mobile
- **Offline**: Works without internet after first load
- **Auto-update**: Prompts to reload when updates are available

## Browser Support

Chrome ✅ | Safari ✅ | Firefox ✅ | Edge ✅

Note: Text-to-Speech quality depends on available Korean voices in the browser/OS.

---

화이팅! 🇰🇷 Good luck with your Korean studies!
