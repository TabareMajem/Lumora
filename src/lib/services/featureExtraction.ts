import OpenAI from 'openai';
import { prisma } from '../prisma';
import { stringifyJsonField } from '../utils/json';
import type { MediaType } from '@prisma/client';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

interface ExtractedFeatures {
  bartleTypes: {
    achiever: number;
    explorer: number;
    socializer: number;
    killer: number;
  };
  bigFiveTraits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  mentalHealth: {
    emotionalAwareness: number;
    copingSkills: number;
    socialEngagement: number;
    selfCare: number;
    physicalWellbeing: number;
    selfEsteem: number;
    moodStability: number;
  };
}

export async function extractMediaFeatures(mediaId: string): Promise<ExtractedFeatures> {
  const media = await prisma.media.findUnique({
    where: { id: mediaId },
    include: {
      game: true,
      filmSeries: true,
    },
  });

  if (!media) throw new Error('Media not found');

  const prompt = generateAnalysisPrompt(media);
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a psychological content analyzer that evaluates media content based on Bartle types, Big Five personality traits, and mental health aspects. Provide numerical scores between 0 and 1 for each category."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  const features = JSON.parse(completion.choices[0].message.content) as ExtractedFeatures;

  // Store the extracted features
  await updateMediaFeatures(mediaId, features);

  return features;
}

function generateAnalysisPrompt(media: any): string {
  const basePrompt = `Analyze the following ${media.type.toLowerCase()} and provide scores for psychological aspects:

Title: ${media.title}
Plot: ${media.plotSummary}
Genres: ${JSON.parse(media.genres).join(', ')}`;

  if (media.type === 'GAME') {
    return `${basePrompt}
Gameplay Mechanics: ${media.game.gameplayMechanics}
Storytelling: ${media.game.storytellingNarrative}
Social Interaction: ${media.game.socialInteraction}
Player Agency: ${media.game.playerAgency}
Innovation: ${media.game.innovation}
Immersion: ${media.game.immersion}`;
  }

  return basePrompt;
}

async function updateMediaFeatures(mediaId: string, features: ExtractedFeatures) {
  await prisma.media.update({
    where: { id: mediaId },
    data: {
      psychologicalFeatures: stringifyJsonField(features),
      updatedAt: new Date(),
    },
  });
}

export async function getRecommendationsBasedOnFeatures(
  userId: string,
  mediaType?: MediaType
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      assessments: true,
    },
  });

  if (!user) throw new Error('User not found');

  const media = await prisma.media.findMany({
    where: {
      ...(mediaType && { type: mediaType }),
      psychologicalFeatures: { not: null },
    },
  });

  const recommendations = media.map((item) => {
    const score = calculateCompatibilityScore(item, user);
    return {
      mediaId: item.id,
      score,
    };
  });

  // Sort by score and take top 10
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function calculateCompatibilityScore(media: any, user: any): number {
  const mediaFeatures = JSON.parse(media.psychologicalFeatures);
  const userAssessments = user.assessments;

  let totalScore = 0;
  let weightSum = 0;

  // Bartle Type compatibility (weight: 0.4)
  const bartleAssessment = userAssessments.find(a => a.assessmentType === 'BARTLE');
  if (bartleAssessment) {
    const bartleScore = calculateBartleCompatibility(
      JSON.parse(bartleAssessment.scores),
      mediaFeatures.bartleTypes
    );
    totalScore += bartleScore * 0.4;
    weightSum += 0.4;
  }

  // Big Five compatibility (weight: 0.4)
  const bigFiveAssessment = userAssessments.find(a => a.assessmentType === 'BIG_FIVE');
  if (bigFiveAssessment) {
    const bigFiveScore = calculateBigFiveCompatibility(
      JSON.parse(bigFiveAssessment.scores),
      mediaFeatures.bigFiveTraits
    );
    totalScore += bigFiveScore * 0.4;
    weightSum += 0.4;
  }

  // Mental Health compatibility (weight: 0.2)
  const mentalHealthAssessment = userAssessments.find(a => a.assessmentType === 'MENTAL_HEALTH');
  if (mentalHealthAssessment) {
    const mentalHealthScore = calculateMentalHealthCompatibility(
      JSON.parse(mentalHealthAssessment.scores),
      mediaFeatures.mentalHealth
    );
    totalScore += mentalHealthScore * 0.2;
    weightSum += 0.2;
  }

  return weightSum > 0 ? totalScore / weightSum : 0;
}

function calculateBartleCompatibility(userScores: any, mediaScores: any): number {
  // Calculate cosine similarity between user and media Bartle type scores
  const types = ['achiever', 'explorer', 'socializer', 'killer'];
  const dotProduct = types.reduce((sum, type) => 
    sum + (userScores[type] * mediaScores[type]), 0);
  
  const userMagnitude = Math.sqrt(types.reduce((sum, type) => 
    sum + Math.pow(userScores[type], 2), 0));
  
  const mediaMagnitude = Math.sqrt(types.reduce((sum, type) => 
    sum + Math.pow(mediaScores[type], 2), 0));

  return dotProduct / (userMagnitude * mediaMagnitude);
}

function calculateBigFiveCompatibility(userScores: any, mediaScores: any): number {
  const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  const dotProduct = traits.reduce((sum, trait) => 
    sum + (userScores[trait] * mediaScores[trait]), 0);
  
  const userMagnitude = Math.sqrt(traits.reduce((sum, trait) => 
    sum + Math.pow(userScores[trait], 2), 0));
  
  const mediaMagnitude = Math.sqrt(traits.reduce((sum, trait) => 
    sum + Math.pow(mediaScores[trait], 2), 0));

  return dotProduct / (userMagnitude * mediaMagnitude);
}

function calculateMentalHealthCompatibility(userScores: any, mediaScores: any): number {
  const aspects = [
    'emotionalAwareness',
    'copingSkills',
    'socialEngagement',
    'selfCare',
    'physicalWellbeing',
    'selfEsteem',
    'moodStability'
  ];

  const dotProduct = aspects.reduce((sum, aspect) => 
    sum + (userScores[aspect] * mediaScores[aspect]), 0);
  
  const userMagnitude = Math.sqrt(aspects.reduce((sum, aspect) => 
    sum + Math.pow(userScores[aspect], 2), 0));
  
  const mediaMagnitude = Math.sqrt(aspects.reduce((sum, aspect) => 
    sum + Math.pow(mediaScores[aspect], 2), 0));

  return dotProduct / (userMagnitude * mediaMagnitude);
}