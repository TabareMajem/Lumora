export interface BartleFeatures {
  achiever: number;
  explorer: number;
  socializer: number;
  killer: number;
}

export interface BigFiveFeatures {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface MentalHealthFeatures {
  emotionalAwareness: number;
  copingSkills: number;
  socialEngagement: number;
  selfCare: number;
  physicalWellbeing: number;
  selfEsteem: number;
  moodStability: number;
}

export interface MediaFeatures {
  bartleTypes: BartleFeatures;
  bigFiveTraits: BigFiveFeatures;
  mentalHealth: MentalHealthFeatures;
}