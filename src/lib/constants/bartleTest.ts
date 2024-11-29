import type { Question, BartleType } from '../types';

export const BARTLE_TYPES: Record<BartleType, string> = {
  ACHIEVER: 'Achiever',
  EXPLORER: 'Explorer',
  SOCIALIZER: 'Socializer',
  KILLER: 'Killer',
} as const;

export const BARTLE_DESCRIPTIONS: Record<BartleType, string> = {
  ACHIEVER: 'You are driven by accomplishment, seeking to level up and accumulate status symbols.',
  EXPLORER: 'You enjoy discovering new areas, learning about hidden things, and understanding game mechanics.',
  SOCIALIZER: 'You value interaction with others and building relationships in the gaming world.',
  KILLER: 'You thrive on competition and enjoy testing your skills against other players.',
} as const;

export const BARTLE_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'In the virtual world of Arcadia, you enter a mysterious dungeon rumored to hold rare treasures. What is your primary goal?',
    imageUrl: 'https://images.unsplash.com/photo-1633218387095-7e4c23d82c3f',
    options: [
      { text: 'Complete all challenges to earn achievements and trophies', type: 'ACHIEVER' },
      { text: 'Explore every nook and cranny to discover hidden secrets', type: 'EXPLORER' },
      { text: 'Team up with other players to navigate the dungeon together', type: 'SOCIALIZER' },
      { text: 'Compete against others to reach the treasures first', type: 'KILLER' },
    ],
  },
  // Add more questions following the same pattern...
  {
    id: 20,
    text: 'A beloved NPC\'s storyline is coming to an end. How do you feel?',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    options: [
      { text: 'Focused on completing any remaining achievements related to them', type: 'ACHIEVER' },
      { text: 'Sad but curious about what comes next in the story', type: 'EXPLORER' },
      { text: 'Emotionally connected and will miss their interactions', type: 'SOCIALIZER' },
      { text: 'Indifferent unless it affects gameplay', type: 'KILLER' },
    ],
  },
];