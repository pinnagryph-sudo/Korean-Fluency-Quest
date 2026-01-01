// ═══════════════════════════════════════════════════════════════
// KOREAN FLUENCY QUEST - Grammar Reference
// Comprehensive grammar points organized by level
// ═══════════════════════════════════════════════════════════════

window.GRAMMAR = [
  // ═══════════════════════════════════════════════════════════════
  // LEVEL 1: First Contact - Basic Particles & To Be
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g001',
    level: 1,
    title: 'Topic Marker: 은/는',
    shortDesc: 'Marks the topic of a sentence ("As for X...")',
    pattern: 'Noun + 은 (after consonant) / 는 (after vowel)',
    explanation: `The topic marker 은/는 puts a spotlight on something and says "As for THIS thing, let me tell you about it."

**When to use 은/는:**
• Introducing a topic: 저는 학생이에요 (As for me, I am a student)
• Contrast: 사과는 좋아해요. 바나나는 싫어해요. (I like apples. [But] I do not like bananas)
• Known/old information: When the listener already knows what you are talking about

**The Rule:**
• 은 after consonants: 책은, 선생님은
• 는 after vowels: 나는, 커피는`,
    examples: [
      { korean: '저는 학생이에요.', english: "As for me, I am a student." },
      { korean: '오늘은 날씨가 좋아요.', english: 'As for today, the weather is good.' },
      { korean: '커피는 맛있어요.', english: 'As for coffee, it\'s delicious.' },
      { korean: 'BTS는 한국 가수예요.', english: 'As for BTS, they\'re Korean singers.' },
    ],
    tips: 'Think of 은/는 as putting a spotlight on something before talking about it.',
    related: ['g002', 'g003'],
    emoji: '🔦'
  },
  {
    id: 'g002',
    level: 1,
    title: 'Subject Marker: 이/가',
    shortDesc: 'Marks the grammatical subject (new/emphasized info)',
    pattern: 'Noun + 이 (after consonant) / 가 (after vowel)',
    explanation: `The subject marker 이/가 marks the grammatical subject and often points to NEW information or adds emphasis.

**When to use 이/가:**
• New information: 친구가 왔어요 (A friend came - announcing new info)
• Questions with 누구/뭐: 누가 했어요? (WHO did it?)
• After question words: 뭐가 있어요? (What is there?)
• Emphasis on the subject itself

**The Rule:**
• 이 after consonants: 책이, 음식이
• 가 after vowels: 친구가, 커피가`,
    examples: [
      { korean: '비가 와요.', english: "It is raining. (Rain is coming)" },
      { korean: '친구가 왔어요.', english: 'A friend came. (New info!)' },
      { korean: '뭐가 있어요?', english: 'What is there?' },
      { korean: '누가 했어요?', english: 'Who did it?' },
    ],
    tips: 'Use 이/가 when answering "who" or "what" questions, or introducing new information.',
    related: ['g001', 'g003'],
    emoji: '👆'
  },
  {
    id: 'g003',
    level: 1,
    title: 'Copula: 이다 (To Be)',
    shortDesc: 'Connects nouns to say "X is Y"',
    pattern: 'Noun + 이에요 (after consonant) / 예요 (after vowel)',
    explanation: `이다 means "to be" and attaches directly to nouns. It is how you say "X is Y" in Korean.

**Polite Present Tense:**
• After consonant: 이에요 → 학생이에요 (I am a student)
• After vowel: 예요 → 의사예요 (I am a doctor)

**Negative:** 아니에요 (is not)
• 학생이 아니에요 (I am not a student)`,
    examples: [
      { korean: '학생이에요.', english: "I am a student." },
      { korean: '의사예요.', english: "I am a doctor." },
      { korean: '이것은 책이에요.', english: 'This is a book.' },
      { korean: '저는 미국 사람이에요.', english: "I am American." },
    ],
    tips: 'Unlike English, 이다 doesn\'t need a subject - context tells us who "is" what.',
    related: ['g001', 'g002'],
    emoji: '='
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 2: Existence & Location
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g004',
    level: 2,
    title: 'Existence: 있다/없다',
    shortDesc: 'To exist/have and to not exist/not have',
    pattern: 'Noun + 이/가 있어요/없어요',
    explanation: `있다 (to exist, to have) and 없다 (to not exist, to not have) are essential verbs.

**있다 means:**
• Something exists: 고양이가 있어요 (There is a cat)
• Someone has something: 시간이 있어요 (I have time)

**없다 means:**
• Something does not exist: 문제없어요 (No problem)
• Someone does not have: 돈이 없어요 (I do not have money)`,
    examples: [
      { korean: '시간이 있어요.', english: 'I have time.' },
      { korean: '돈이 없어요.', english: "I do not have money." },
      { korean: '고양이가 있어요.', english: 'There is a cat.' },
      { korean: '와이파이 있어요?', english: 'Is there WiFi?' },
    ],
    tips: '있다/없다 are your survival verbs - use them for "Is there...?" and "Do you have...?"',
    related: ['g005', 'g006'],
    emoji: '📍'
  },
  {
    id: 'g005',
    level: 2,
    title: 'Location Particle: 에',
    shortDesc: 'Static location & destination',
    pattern: 'Place + 에 + 있다/가다/오다',
    explanation: `에 marks:
1. **Static location** (where something IS): 집에 있어요 (I am at home)
2. **Destination** (where you are GOING): 학교에 가요 (I am going to school)
3. **Time**: 3시에 만나요 (Let us meet at 3 o'clock)

**Note:** 에 is for BEING somewhere or GOING somewhere, not for DOING something somewhere.`,
    examples: [
      { korean: '집에 있어요.', english: "I am at home." },
      { korean: '학교에 가요.', english: "I am going to school." },
      { korean: '한국에 가고 싶어요.', english: 'I want to go to Korea.' },
      { korean: '몇 시에 만나요?', english: 'What time shall we meet?' },
    ],
    tips: 'Remember: 에 = WHERE you are or WHERE you\'re going',
    related: ['g006', 'g004'],
    emoji: '📌'
  },
  {
    id: 'g006',
    level: 2,
    title: 'Action Location: 에서',
    shortDesc: 'Where an action takes place',
    pattern: 'Place + 에서 + Action Verb',
    explanation: `에서 marks where an ACTION happens - where you DO something.

**Use 에서 when:**
• Working: 회사에서 일해요 (I work at a company)
• Studying: 도서관에서 공부해요 (I study at the library)
• Eating: 식당에서 먹어요 (I eat at a restaurant)

**에 vs 에서:**
• 학교에 있어요 (I AM at school) - just being there
• 학교에서 공부해요 (I STUDY at school) - doing something`,
    examples: [
      { korean: '회사에서 일해요.', english: 'I work at a company.' },
      { korean: '카페에서 공부해요.', english: 'I study at a cafe.' },
      { korean: '집에서 쉬어요.', english: 'I rest at home.' },
      { korean: '어디에서 만날까요?', english: 'Where shall we meet?' },
    ],
    tips: '에서 = WHERE you DO something (action location)',
    related: ['g005', 'g004'],
    emoji: '🏃'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 3: Object Marker
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g007',
    level: 3,
    title: 'Object Marker: 을/를',
    shortDesc: 'Marks the direct object of a verb',
    pattern: 'Object + 을 (after consonant) / 를 (after vowel) + Verb',
    explanation: `을/를 marks what receives the action - the direct object.

**The Rule:**
• 을 after consonants: 책을 읽어요 (reading a book)
• 를 after vowels: 커피를 마셔요 (drinking coffee)

In casual speech, 을/를 is often dropped, but it's important to know!`,
    examples: [
      { korean: '밥을 먹어요.', english: 'I eat rice/food.' },
      { korean: '커피를 마셔요.', english: 'I drink coffee.' },
      { korean: '영화를 봐요.', english: 'I watch a movie.' },
      { korean: '한국어를 공부해요.', english: 'I study Korean.' },
    ],
    tips: 'Think: "What is being [verb]ed?" That\'s your object!',
    related: ['g001', 'g002'],
    emoji: '🎯'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 5: Question Words
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g008',
    level: 5,
    title: 'Question Words',
    shortDesc: 'How to ask who, what, where, when, why, how',
    pattern: 'Question Word + Sentence Structure',
    explanation: `Korean question words stay in place - you do not move them to the front like in English.

**Key Question Words:**
• 뭐 (mwo) - what
• 누구 (nugu) - who  
• 어디 (eodi) - where
• 언제 (eonje) - when
• 왜 (wae) - why
• 어떻게 (eotteoke) - how
• 얼마 (eolma) - how much
• 몇 (myeot) - how many`,
    examples: [
      { korean: '이거 뭐예요?', english: 'What is this?' },
      { korean: '어디에 가요?', english: 'Where are you going?' },
      { korean: '언제 와요?', english: 'When are you coming?' },
      { korean: '왜 그래요?', english: 'Why are you like that?' },
      { korean: '어떻게 해요?', english: 'How do you do it?' },
      { korean: '이거 얼마예요?', english: 'How much is this?' },
    ],
    tips: 'Question words replace the unknown info - they don\'t move to the front!',
    related: [],
    emoji: '❓'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 6: Tenses
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g009',
    level: 6,
    title: 'Past Tense: -았/었어요',
    shortDesc: 'Talking about completed actions',
    pattern: 'Verb Stem + 았어요 (after ㅏ/ㅗ) / 었어요 (other vowels)',
    explanation: `To make past tense, add -았/었어요 to the verb stem.

**Rules:**
• Stem ends in ㅏ or ㅗ → 았어요: 가다 → 갔어요
• Other vowels → 었어요: 먹다 → 먹었어요
• 하다 verbs → 했어요: 공부하다 → 공부했어요

**Contractions:**
• 가 + 았 → 갔 (went)
• 오 + 았 → 왔 (came)
• 마시 + 었 → 마셨 (drank)`,
    examples: [
      { korean: '어제 뭐 했어요?', english: 'What did you do yesterday?' },
      { korean: '학교에 갔어요.', english: 'I went to school.' },
      { korean: '친구를 만났어요.', english: 'I met a friend.' },
      { korean: '영화를 봤어요.', english: 'I watched a movie.' },
    ],
    tips: 'Look at the last vowel of the stem to decide 았 vs 었!',
    related: ['g010'],
    emoji: '⏪'
  },
  {
    id: 'g010',
    level: 6,
    title: 'Future Tense: -ㄹ/을 거예요',
    shortDesc: 'Talking about future plans and intentions',
    pattern: 'Verb Stem + ㄹ 거예요 (after vowel) / 을 거예요 (after consonant)',
    explanation: `-ㄹ/을 거예요 expresses future plans and intentions - "will" or "going to."

**Rules:**
• Stem ends in vowel → ㄹ 거예요: 가다 → 갈 거예요
• Stem ends in consonant → 을 거예요: 먹다 → 먹을 거예요
• ㄹ stems: drop ㄹ and add ㄹ 거예요: 살다 → 살 거예요`,
    examples: [
      { korean: '내일 갈 거예요.', english: "I'll go tomorrow." },
      { korean: '뭐 먹을 거예요?', english: 'What will you eat?' },
      { korean: '한국어 공부할 거예요.', english: "I am going to study Korean." },
      { korean: '주말에 쉴 거예요.', english: "I'll rest on the weekend." },
    ],
    tips: 'Use this for plans you\'ve decided on, not just possibilities.',
    related: ['g009'],
    emoji: '⏩'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 7: Wanting
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g011',
    level: 7,
    title: 'Wanting: -고 싶다',
    shortDesc: 'Expressing what you want to do',
    pattern: 'Verb Stem + 고 싶어요',
    explanation: `-고 싶다 means "want to [verb]." It attaches to any verb stem.

**Structure:**
Verb stem + 고 싶어요 = want to [verb]

**Note:** This is for ACTIONS you want to do. For wanting THINGS, use 원하다 or (noun)이/가 갖고 싶어요.`,
    examples: [
      { korean: '뭐 먹고 싶어요?', english: 'What do you want to eat?' },
      { korean: '한국에 가고 싶어요.', english: 'I want to go to Korea.' },
      { korean: '쉬고 싶어요.', english: 'I want to rest.' },
      { korean: '친구 만나고 싶어요.', english: 'I want to meet my friend.' },
    ],
    tips: 'For past: 고 싶었어요 (wanted to). For questions about others: 고 싶으세요?',
    related: ['g012'],
    emoji: '💫'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 10: Negation
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g012',
    level: 10,
    title: 'Negation: 안 vs 못',
    shortDesc: 'Two ways to say "not" or "can\'t"',
    pattern: '안 + Verb (won\'t) vs 못 + Verb (can\'t)',
    explanation: `Korean has two main negation words, and they are NOT interchangeable:

**안 (an)** = "do not" / "will not" - CHOICE
• You choose not to do something
• 안 먹어요 = I do not eat (I choose not to)

**못 (mot)** = "cannot" - INABILITY
• You are unable to do something
• 못 먹어요 = I cannot eat (circumstances prevent me)`,
    examples: [
      { korean: '안 먹어요.', english: "I do not eat / will not eat." },
      { korean: '못 가요.', english: "I cannot go." },
      { korean: '시간이 없어서 못 했어요.', english: "I could not do it because I didn't have time." },
      { korean: '매운 거 안 먹어요.', english: "I do not eat spicy food (by choice)." },
    ],
    tips: 'Ask yourself: Is this a CHOICE (안) or INABILITY (못)?',
    related: ['g011'],
    emoji: '🚫'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 11: Ability
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g013',
    level: 11,
    title: 'Ability: -ㄹ/을 수 있다',
    shortDesc: 'Expressing "can" or "able to"',
    pattern: 'Verb Stem + ㄹ/을 수 있어요',
    explanation: `-ㄹ/을 수 있다 expresses ability or possibility - "can" or "able to."

**Rules:**
• Vowel stem → ㄹ 수 있다: 가다 → 갈 수 있어요
• Consonant stem → 을 수 있다: 먹다 → 먹을 수 있어요

**Negative:** -ㄹ/을 수 없다 = cannot / unable to`,
    examples: [
      { korean: '한국어 할 수 있어요.', english: 'I can speak Korean.' },
      { korean: '운전할 수 있어요?', english: 'Can you drive?' },
      { korean: '매운 거 먹을 수 있어요.', english: 'I can eat spicy food.' },
      { korean: '내일 갈 수 없어요.', english: "I cannot go tomorrow." },
    ],
    tips: 'For learned skills, you can also use -ㄹ/을 줄 알다.',
    related: ['g012'],
    emoji: '💪'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 12: Experience
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g014',
    level: 12,
    title: 'Experience: -아/어 봤다',
    shortDesc: 'Talking about experiences ("have tried/been")',
    pattern: 'Verb Stem + 아/어 봤어요',
    explanation: `-아/어 보다 means "to try" something. In past tense (-아/어 봤다), it means "have tried" or "have experienced."

**Rules:**
• ㅏ/ㅗ stems → 아 봤어요: 가다 → 가 봤어요
• Other stems → 어 봤어요: 먹다 → 먹어 봤어요
• 하다 → 해 봤어요

**Questions:** "Have you ever...?" = -아/어 봤어요?`,
    examples: [
      { korean: '한국에 가 봤어요?', english: 'Have you been to Korea?' },
      { korean: '이거 먹어 봤어요?', english: 'Have you tried this?' },
      { korean: '처음 먹어 봐요.', english: "I am trying it for the first time." },
      { korean: '스카이다이빙 해 봤어요.', english: "I've tried skydiving." },
    ],
    tips: 'Perfect for asking "Have you ever...?" questions!',
    related: ['g009'],
    emoji: '✈️'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 13: Obligation
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g015',
    level: 13,
    title: 'Must/Have to: -아/어야 하다',
    shortDesc: 'Expressing obligations and necessities',
    pattern: 'Verb Stem + 아/어야 해요',
    explanation: `-아/어야 하다 expresses obligation - "must" or "have to."

**Rules:**
• ㅏ/ㅗ stems → 아야 해요: 가다 → 가야 해요
• Other stems → 어야 해요: 먹다 → 먹어야 해요
• 하다 → 해야 해요

**Note:** 되다 can replace 하다: 가야 돼요 = 가야 해요`,
    examples: [
      { korean: '지금 가야 해요.', english: 'I have to go now.' },
      { korean: '공부해야 돼요.', english: 'I have to study.' },
      { korean: '일찍 일어나야 해요.', english: 'I have to wake up early.' },
      { korean: '약을 먹어야 해요.', english: 'I have to take medicine.' },
    ],
    tips: '해요 and 돼요 are interchangeable here!',
    related: ['g012', 'g013'],
    emoji: '📋'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 14: Conditionals
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g016',
    level: 14,
    title: 'If/When: -(으)면',
    shortDesc: 'Conditional sentences',
    pattern: 'Verb/Adj Stem + 면 (after vowel/ㄹ) / 으면 (after consonant)',
    explanation: `-(으)면 means "if" or "when" - setting up a condition.

**Rules:**
• Vowel/ㄹ stems → 면: 가다 → 가면, 알다 → 알면
• Consonant stems → 으면: 먹다 → 먹으면

**Note:** Unlike English, the same form works for both "if" and "when."`,
    examples: [
      { korean: '시간이 있으면 가요.', english: "If I have time, I'll go." },
      { korean: '비가 오면 집에 있어요.', english: "If it rains, I'll stay home." },
      { korean: '한국에 가면 뭐 하고 싶어요?', english: 'If you go to Korea, what do you want to do?' },
      { korean: '모르면 물어보세요.', english: "If you do not know, please ask." },
    ],
    tips: 'Works for both hypothetical "if" and expected "when."',
    related: ['g017'],
    emoji: '🔀'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 15: Comparisons
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g017',
    level: 15,
    title: 'Comparison: 보다',
    shortDesc: 'Comparing things ("more than")',
    pattern: 'A보다 B가 더 [adjective]',
    explanation: `보다 means "than" and 더 means "more."

**Structure:**
A보다 B가 더 [adjective] = B is more [adj] than A

**Superlatives:**
• 가장 = most (formal)
• 제일 = most (casual)`,
    examples: [
      { korean: '커피보다 차가 더 좋아요.', english: 'I like tea more than coffee.' },
      { korean: '저보다 키가 커요.', english: "They're taller than me." },
      { korean: '이게 제일 맛있어요.', english: 'This is the most delicious.' },
      { korean: '한국어가 영어보다 어려워요.', english: 'Korean is harder than English.' },
    ],
    tips: 'The thing being compared to (the "loser") gets 보다.',
    related: ['g016'],
    emoji: '⚖️'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 17: Reasons
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g018',
    level: 17,
    title: 'Because: -아/어서 vs -(으)니까',
    shortDesc: 'Two ways to give reasons',
    pattern: 'Verb Stem + 아/어서 OR -(으)니까',
    explanation: `Both mean "because" but have different nuances:

**-아/어서** = Neutral cause → result
• Can't use with commands/suggestions
• 배가 아파서 병원에 갔어요 (My stomach hurt so I went to the hospital)

**-(으)니까** = Emphasized reason, often justifying
• CAN use with commands/suggestions
• 배가 아프니까 병원에 가세요 (Since your stomach hurts, go to the hospital)`,
    examples: [
      { korean: '바빠서 못 갔어요.', english: "I was busy so I could not go." },
      { korean: '피곤해서 일찍 잤어요.', english: 'I was tired so I slept early.' },
      { korean: '시간이 없으니까 빨리 하세요.', english: "Since there's no time, do it quickly." },
      { korean: '맛있으니까 더 드세요.', english: "Since it's delicious, have some more." },
    ],
    tips: 'Use 니까 when giving advice or making suggestions!',
    related: ['g016'],
    emoji: '📢'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 21: Honorifics
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g019',
    level: 21,
    title: 'Honorific: -시-',
    shortDesc: 'Showing respect to the subject',
    pattern: 'Verb Stem + 시 + Ending',
    explanation: `-시- is inserted into verbs to show respect for the SUBJECT (the person doing the action).

**When to use:**
• Talking about/to elders, bosses, strangers
• Showing respect for the person you are discussing

**Forms:**
• Present: -세요 / -시어요
• Past: -셨어요
• Future: -실 거예요`,
    examples: [
      { korean: '어디 가세요?', english: 'Where are you going? (respectful)' },
      { korean: '선생님이 말씀하셨어요.', english: 'The teacher said.' },
      { korean: '어머니가 계세요?', english: 'Is your mother here?' },
      { korean: '많이 드세요.', english: 'Please eat a lot.' },
    ],
    tips: 'Some verbs have special honorific forms: 먹다→드시다, 자다→주무시다, 있다→계시다',
    related: ['g020'],
    emoji: '🙏'
  },
  {
    id: 'g020',
    level: 21,
    title: 'Special Honorific Verbs',
    shortDesc: 'Verbs that completely change for respect',
    pattern: 'Special verb forms for honorific situations',
    explanation: `Some common verbs have completely different honorific forms:

**Regular → Honorific:**
• 먹다/마시다 → 드시다 (to eat/drink)
• 자다 → 주무시다 (to sleep)
• 있다 → 계시다 (to be/exist)
• 말하다 → 말씀하시다 (to speak)
• 죽다 → 돌아가시다 (to pass away)

**Humble verbs (lower yourself):**
• 주다 → 드리다 (to give)
• 묻다 → 여쭈다 (to ask)`,
    examples: [
      { korean: '많이 드세요.', english: 'Please eat a lot.' },
      { korean: '안녕히 주무세요.', english: 'Sleep well. (honorific)' },
      { korean: '할머니가 계세요.', english: 'Grandmother is here.' },
      { korean: '선물을 드렸어요.', english: 'I gave (them) a gift. (humble)' },
    ],
    tips: 'Use the honorific form when the subject deserves respect, humble form when you\'re the subject doing something for them.',
    related: ['g019'],
    emoji: '👑'
  },

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 22: Guessing
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'g021',
    level: 22,
    title: 'Seems like: -것 같다',
    shortDesc: 'Expressing guesses and opinions softly',
    pattern: 'Verb/Adj + 는/ㄴ/ㄹ 것 같다',
    explanation: `-것 같다 means "it seems like" or "I think" - perfect for softening statements.

**Tenses:**
• Present action: -는 것 같다: 비가 오는 것 같아요
• Past: -ㄴ/은 것 같다: 갔던 것 같아요
• Adjective/Future: -ㄹ/을 것 같다: 맛있을 것 같아요

This is very common in Korean - it sounds less direct and more polite!`,
    examples: [
      { korean: '비가 올 것 같아요.', english: 'It looks like it will rain.' },
      { korean: '맛있을 것 같아요.', english: 'It seems like it will be delicious.' },
      { korean: '바쁜 것 같아요.', english: 'They seem busy.' },
      { korean: '이미 간 것 같아요.', english: 'It seems like they already left.' },
    ],
    tips: 'Great for softening opinions! Instead of "it\'s delicious," say "it seems delicious."',
    related: ['g018'],
    emoji: '🔮'
  },
];

// Helper functions
window.getGrammarByLevel = (level) => window.GRAMMAR.filter(g => g.level === level);
window.getGrammarUpToLevel = (maxLevel) => window.GRAMMAR.filter(g => g.level <= maxLevel);
window.getGrammarById = (id) => window.GRAMMAR.find(g => g.id === id);
window.getRelatedGrammar = (grammarItem) => {
  if (!grammarItem.related) return [];
  return grammarItem.related.map(id => window.getGrammarById(id)).filter(Boolean);
};
window.searchGrammar = (query) => {
  const q = query.toLowerCase();
  return window.GRAMMAR.filter(g => 
    g.title.toLowerCase().includes(q) ||
    g.shortDesc.toLowerCase().includes(q) ||
    g.pattern.toLowerCase().includes(q)
  );
};

console.log('✅ Korean Fluency Quest: Grammar Reference loaded (' + window.GRAMMAR.length + ' grammar points)');
