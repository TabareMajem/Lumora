import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Question } from '../../lib/types';

interface BigFiveQuestionProps {
  question: Question;
  onAnswer: (score: number) => void;
}

export function BigFiveQuestion({ question, onAnswer }: BigFiveQuestionProps) {
  const options = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="aspect-video rounded-lg overflow-hidden mb-6">
          <img
            src={question.imageUrl}
            alt={question.text}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{question.text}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {options.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className="w-full justify-start h-auto py-4 px-6 text-left"
              onClick={() => onAnswer(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}