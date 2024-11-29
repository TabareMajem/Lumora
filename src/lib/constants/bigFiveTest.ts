import type { Question, BigFiveType } from '../types';

export const BIG_FIVE_TYPES: Record<BigFiveType, string> = {
  OPENNESS: 'Openness',
  CONSCIENTIOUSNESS: 'Conscientiousness',
  EXTRAVERSION: 'Extraversion',
  AGREEABLENESS: 'Agreeableness',
  NEUROTICISM: 'Neuroticism',
} as const;

export const BIG_FIVE_DESCRIPTIONS: Record<BigFiveType, string> = {
  OPENNESS: 'You are curious, creative, and open to new experiences. You appreciate art, adventure, and diverse ideas.',
  CONSCIENTIOUSNESS: 'You are organized, responsible, and goal-oriented. You plan ahead and pay attention to details.',
  EXTRAVERSION: 'You are energized by social interactions and enjoy being around others. You are outgoing and enthusiastic.',
  AGREEABLENESS: 'You are compassionate, cooperative, and value harmony. You care about others\' well-being.',
  NEUROTICISM: 'You experience a range of emotions and may be sensitive to stress. You process feelings deeply.',
} as const;

export const BIG_FIVE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'I enjoy trying new things and exploring unfamiliar places.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    trait: 'OPENNESS',
    isReversed: false,
  },
  // Add more questions following the same pattern...
  {
    id: 20,
    text: 'I bounce back quickly after stressful events.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    trait: 'NEUROTICISM',
    isReversed: true,
  },
];