import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';
import type { BartleType } from '../../lib/types/assessment';

interface BartleChartProps {
  scores: Record<BartleType, number>;
}

export function BartleChart({ scores }: BartleChartProps) {
  const data = [
    { type: 'Achiever', value: scores.ACHIEVER * 100 },
    { type: 'Explorer', value: scores.EXPLORER * 100 },
    { type: 'Socializer', value: scores.SOCIALIZER * 100 },
    { type: 'Killer', value: scores.KILLER * 100 },
  ];

  const primaryType = Object.entries(scores)
    .reduce((a, b) => (b[1] > a[1] ? b : a))[0] as BartleType;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Your Gaming Personality</h3>
        <p className="text-sm text-gray-600">
          Primary Type: {primaryType.charAt(0) + primaryType.slice(1).toLowerCase()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <Radar
                name="Player Type"
                dataKey="value"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}