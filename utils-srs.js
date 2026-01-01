// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Spaced Repetition System (SRS)
// SM-2 inspired algorithm for optimal learning
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// SRS CARD STATE STRUCTURE
// Each card tracks: { id, easeFactor, interval, repetitions, dueDate, lastReview }
// ═══════════════════════════════════════════════════════════════

const SRS_STORAGE_KEY = 'kfq_srs_data';

// Default ease factor (2.5 is standard for SM-2)
const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;
const MAX_EASE = 3.0;

// Response quality ratings
window.SRS_QUALITY = {
  AGAIN: 0,      // Complete blackout, wrong answer
  HARD: 1,       // Correct but with significant difficulty
  GOOD: 2,       // Correct with some hesitation
  EASY: 3,       // Perfect recall, no hesitation
};

// ═══════════════════════════════════════════════════════════════
// SRS DATA MANAGEMENT
// ═══════════════════════════════════════════════════════════════

window.SRS = {
  // Load all SRS data from storage
  loadData: () => {
    return window.load(SRS_STORAGE_KEY, {});
  },

  // Save SRS data to storage
  saveData: (data) => {
    window.store(SRS_STORAGE_KEY, data);
  },

  // Get card data (or create new if doesn't exist)
  getCard: (cardId) => {
    const data = window.SRS.loadData();
    if (!data[cardId]) {
      return {
        id: cardId,
        easeFactor: DEFAULT_EASE,
        interval: 0,        // Days until next review
        repetitions: 0,     // Number of successful reviews
        dueDate: null,      // When card is due
        lastReview: null,   // Last review timestamp
        history: [],        // Review history
      };
    }
    return data[cardId];
  },

  // Update card after review
  reviewCard: (cardId, quality) => {
    const data = window.SRS.loadData();
    const card = window.SRS.getCard(cardId);
    const now = new Date().toISOString();

    // Record history
    card.history.push({
      date: now,
      quality: quality,
    });

    // Keep only last 20 reviews
    if (card.history.length > 20) {
      card.history = card.history.slice(-20);
    }

    if (quality < window.SRS_QUALITY.GOOD) {
      // Failed review - reset progress
      card.repetitions = 0;
      card.interval = 0;
      
      // Decrease ease factor
      card.easeFactor = Math.max(MIN_EASE, card.easeFactor - 0.2);
    } else {
      // Successful review
      if (card.repetitions === 0) {
        card.interval = 1; // 1 day
      } else if (card.repetitions === 1) {
        card.interval = 3; // 3 days
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }

      card.repetitions++;

      // Adjust ease factor based on quality
      if (quality === window.SRS_QUALITY.EASY) {
        card.easeFactor = Math.min(MAX_EASE, card.easeFactor + 0.15);
      } else if (quality === window.SRS_QUALITY.HARD) {
        card.easeFactor = Math.max(MIN_EASE, card.easeFactor - 0.1);
      }
    }

    // Calculate next due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + card.interval);
    card.dueDate = dueDate.toISOString().split('T')[0];
    card.lastReview = now;

    // Save updated data
    data[cardId] = card;
    window.SRS.saveData(data);

    return card;
  },

  // Get cards due for review
  getDueCards: (cardIds) => {
    const today = window.getDateKey();
    const data = window.SRS.loadData();
    
    return cardIds.filter(id => {
      const card = data[id];
      if (!card || !card.dueDate) return true; // New cards are always due
      return card.dueDate <= today;
    });
  },

  // Get cards that are new (never reviewed)
  getNewCards: (cardIds) => {
    const data = window.SRS.loadData();
    return cardIds.filter(id => !data[id] || data[id].repetitions === 0);
  },

  // Get cards sorted by priority (due first, then new)
  getPriorityQueue: (cardIds, maxCards = 20) => {
    const today = window.getDateKey();
    const data = window.SRS.loadData();
    
    const categorized = cardIds.map(id => {
      const card = data[id];
      let priority;
      
      if (!card || !card.dueDate) {
        priority = 1; // New cards - medium priority
      } else if (card.dueDate <= today) {
        priority = 0; // Overdue - highest priority
      } else {
        priority = 2; // Not due yet - low priority
      }
      
      return { id, priority, card };
    });

    // Sort by priority, then shuffle within each priority
    categorized.sort((a, b) => a.priority - b.priority);
    
    return categorized.slice(0, maxCards).map(c => c.id);
  },

  // Get mastery level for a card (0-5)
  getMasteryLevel: (cardId) => {
    const card = window.SRS.getCard(cardId);
    if (card.repetitions === 0) return 0;
    if (card.interval < 3) return 1;
    if (card.interval < 7) return 2;
    if (card.interval < 21) return 3;
    if (card.interval < 60) return 4;
    return 5; // Mastered
  },

  // Get overall stats
  getStats: (cardIds) => {
    const data = window.SRS.loadData();
    let mastered = 0;
    let learning = 0;
    let newCards = 0;
    let totalReviews = 0;

    cardIds.forEach(id => {
      const card = data[id];
      if (!card || card.repetitions === 0) {
        newCards++;
      } else if (card.interval >= 21) {
        mastered++;
      } else {
        learning++;
      }
      if (card) {
        totalReviews += card.history?.length || 0;
      }
    });

    return { mastered, learning, newCards, totalReviews };
  },

  // Reset a specific card
  resetCard: (cardId) => {
    const data = window.SRS.loadData();
    delete data[cardId];
    window.SRS.saveData(data);
  },

  // Reset all SRS data
  resetAll: () => {
    window.store(SRS_STORAGE_KEY, {});
  },

  // Export SRS data (for backup)
  exportData: () => {
    return JSON.stringify(window.SRS.loadData(), null, 2);
  },

  // Import SRS data (from backup)
  importData: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      window.SRS.saveData(data);
      return true;
    } catch (e) {
      console.error('Failed to import SRS data:', e);
      return false;
    }
  },
};

console.log('✅ Korean Fluency Quest: SRS System loaded');
