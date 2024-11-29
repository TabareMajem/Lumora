import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BIG_FIVE_TYPES, BIG_FIVE_DESCRIPTIONS } from '../../lib/constants/bigFiveTest';
import type { BigFiveType } from '../../lib/types';

interface BigFiveResultsProps {
  scores: Record<BigFiveType, number>;
  onRetake: () => void;
  onComplete: () => void;
}

export function BigFiveResults({ scores, onRetake, onComplete }: BigFiveResultsProps) {
  const data = Object.entries(scores).map(([trait, score]) => ({
    trait: BIG_FIVE_TYPES[trait as BigFiveType],
    score: score * 100,
  }));

  const dominantTrait = Object.entries(scores).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0] as BigFiveType;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Your Personality Profile</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Highest Trait: {BIG_FIVE_TYPES[dominantTrait]}
          </h3>
          <p className="text-gray-600">{BIG_FIVE_DESCRIPTIONS[dominantTrait]}</p>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="trait" />
              <Radar
                name="Personality Traits"
                dataKey="score"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Detailed Breakdown:</h4>
          {data.map((trait) => (
            <div key={trait.trait}>
              <div className="flex justify-between text-sm mb-1">
                <span>{trait.trait}</span>
                <span>{Math.round(trait.score)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${trait.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onRetake} className="flex-1">
            Retake Test
          </Button>
          <Button onClick={onComplete} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}