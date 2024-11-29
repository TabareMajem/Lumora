import type { Question, ValueType } from '../types';

export const VALUE_TYPES: Record<ValueType, string> = {
  LEADERSHIP: 'Leadership',
  CREATIVITY: 'Creativity',
  EMPATHY: 'Empathy',
  DETERMINATION: 'Determination',
  WISDOM: 'Wisdom',
  INTEGRITY: 'Integrity',
  COLLABORATION: 'Collaboration',
  INDEPENDENCE: 'Independence',
} as const;

export const VALUE_DESCRIPTIONS: Record<ValueType, string> = {
  LEADERSHIP: 'You excel at guiding and inspiring others, taking charge when needed.',
  CREATIVITY: 'You think outside the box and find innovative solutions to challenges.',
  EMPATHY: 'You understand and share the feelings of others, building strong connections.',
  DETERMINATION: 'You persist in the face of obstacles and maintain focus on your goals.',
  WISDOM: 'You make thoughtful decisions based on experience and understanding.',
  INTEGRITY: 'You uphold strong moral principles and stay true to your values.',
  COLLABORATION: 'You work well with others and value team success.',
  INDEPENDENCE: 'You are self-reliant and capable of working autonomously.',
} as const;

export const VALUES_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'In the bustling city of Sakura Town, Hiro is organizing a community event. However, unexpected obstacles arise. As Hiro, how do you handle the sudden challenges threatening the event\'s success?',
    imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a',
    options: [
      { text: 'Take charge, delegate tasks, and motivate everyone to push through', type: 'LEADERSHIP' },
      { text: 'Encourage the team to brainstorm creative solutions together', type: 'COLLABORATION' },
      { text: 'Work individually to solve the issues quietly behind the scenes', type: 'INDEPENDENCE' },
      { text: 'Seek advice from a mentor to find the best course of action', type: 'WISDOM' },
    ],
  },
  // Add more questions following the same pattern...
  {
    id: 20,
    text: 'At the end of your journey, you reflect on what\'s most important. What do you value the most?',
    imageUrl: 'https://images.unsplash.com/photo-1499363536502-87642509e31b',
    options: [
      { text: 'The relationships you\'ve built', type: 'EMPATHY' },
      { text: 'The growth and lessons learned', type: 'WISDOM' },
      { text: 'The achievements and accolades earned', type: 'DETERMINATION' },
      { text: 'The impact you\'ve made on the world', type: 'INTEGRITY' },
    ],
  },
];