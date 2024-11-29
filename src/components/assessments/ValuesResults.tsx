import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { VALUE_TYPES, VALUE_DESCRIPTIONS } from '../../lib/constants/valuesTest';
import type { ValueType } from '../../lib/types';

interface ValuesResultsProps {
  scores: Record<ValueType, number>;
  onRetake: () => void;
  onComplete: () => void;
}

export function ValuesResults({ scores, onRetake, onComplete }: ValuesResultsProps) {
  const data = Object.entries(scores).map(([value, score]) => ({
    value: VALUE_TYPES[value as ValueType],
    score: score * 100,
  }));

  const sortedValues = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type]) => type as ValueType);

  const primaryValue = sortedValues[0];
  const secondaryValue = sortedValues[1];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Your Core Values</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-indigo-600">
              Primary Value: {VALUE_TYPES[primaryValue]}
            </h3>
            <p className="text-gray-600">{VALUE_DESCRIPTIONS[primaryValue]}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-indigo-600">
              Secondary Value: {VALUE_TYPES[secondaryValue]}
            </h3>
            <p className="text-gray-600">{VALUE_DESCRIPTIONS[secondaryValue]}</p>
          </div>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="value" />
              <Radar
                name="Values"
                dataKey="score"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Values Breakdown:</h4>
          {data.map((item) => (
            <div key={item.value}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.value}</span>
                <span>{Math.round(item.score)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onRetake} className="flex-1">
            Retake Assessment
          </Button>
          <Button onClick={onComplete} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}