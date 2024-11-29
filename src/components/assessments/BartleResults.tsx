import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BARTLE_TYPES, BARTLE_DESCRIPTIONS } from '../../lib/constants/bartleTest';
import type { BartleType } from '../../lib/types';

interface BartleResultsProps {
  scores: Record<BartleType, number>;
  onRetake: () => void;
  onComplete: () => void;
}

export function BartleResults({ scores, onRetake, onComplete }: BartleResultsProps) {
  const data = Object.entries(scores).map(([type, score]) => ({
    name: BARTLE_TYPES[type as BartleType],
    value: score * 100,
  }));

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  const primaryType = Object.entries(scores).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0] as BartleType;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Your Gaming Personality</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            You are primarily a {BARTLE_TYPES[primaryType]}
          </h3>
          <p className="text-gray-600">{BARTLE_DESCRIPTIONS[primaryType]}</p>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Detailed Breakdown:</h4>
          {data.map((type, index) => (
            <div key={type.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{type.name}</span>
                <span>{Math.round(type.value)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${type.value}%`,
                    backgroundColor: COLORS[index],
                  }}
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