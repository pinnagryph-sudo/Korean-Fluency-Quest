// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Utility Functions
// Storage, date helpers, and common utilities
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// STORAGE HELPERS
// ═══════════════════════════════════════════════════════════════

window.store = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('Storage unavailable:', e);
    return false;
  }
};

window.load = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.warn('Error loading from storage:', e);
    return defaultValue;
  }
};

window.remove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

// ═══════════════════════════════════════════════════════════════
// DATE & TIME HELPERS
// ═══════════════════════════════════════════════════════════════

window.getDateKey = (date = new Date()) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

window.getDayOfWeek = (date = new Date()) => date.getDay();

window.isSameDay = (d1, d2) => window.getDateKey(d1) === window.getDateKey(d2);

window.getWeekNumber = () => Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));

window.getMonthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

window.formatTime = (hours, minutes) => {
  const h = hours % 12 || 12;
  const m = String(minutes).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${h}:${m} ${ampm}`;
};

window.formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

window.getDaysSince = (dateString) => {
  if (!dateString) return Infinity;
  const past = new Date(dateString);
  const now = new Date();
  return Math.floor((now - past) / (1000 * 60 * 60 * 24));
};

window.isNightTime = () => {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 6;
};

window.isEarlyMorning = () => {
  const hour = new Date().getHours();
  return hour >= 4 && hour < 6;
};

// ═══════════════════════════════════════════════════════════════
// ARRAY UTILITIES
// ═══════════════════════════════════════════════════════════════

window.shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

window.pickRandom = (array, count = 1) => {
  const shuffled = window.shuffleArray(array);
  return count === 1 ? shuffled[0] : shuffled.slice(0, count);
};

window.pickRandomExcluding = (array, exclude, count = 1) => {
  const filtered = array.filter(item => !exclude.includes(item));
  return window.pickRandom(filtered, count);
};

// ═══════════════════════════════════════════════════════════════
// STRING UTILITIES
// ═══════════════════════════════════════════════════════════════

window.normalizeKorean = (str) => {
  return str.trim().replace(/\s+/g, '').replace(/[.,!?]/g, '');
};

window.compareKorean = (a, b) => {
  return window.normalizeKorean(a) === window.normalizeKorean(b);
};

window.containsKorean = (str) => /[가-힣]/.test(str);

// ═══════════════════════════════════════════════════════════════
// DEBOUNCE & THROTTLE
// ═══════════════════════════════════════════════════════════════

window.debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

window.throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ═══════════════════════════════════════════════════════════════
// DEEP CLONE & MERGE
// ═══════════════════════════════════════════════════════════════

window.deepClone = (obj) => JSON.parse(JSON.stringify(obj));

window.deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = window.deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

// ═══════════════════════════════════════════════════════════════
// PERFORMANCE HELPERS
// ═══════════════════════════════════════════════════════════════

window.calculateAccuracy = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

window.calculateStreak = (history) => {
  if (!history || history.length === 0) return 0;
  let streak = 0;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].correct) streak++;
    else break;
  }
  return streak;
};

console.log('✅ Korean Fluency Quest: Utilities loaded');
