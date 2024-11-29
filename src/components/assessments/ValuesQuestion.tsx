import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Question, ValueType } from '../../lib/types';

interface ValuesQuestionProps {
  question: Question;
  onAnswer: (type: ValueType) => void;
}

export function ValuesQuestion({ question, onAnswer }: ValuesQuestionProps) {
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
          {question.options.map((option) => (
            <Button
              key={option.type}
              variant="outline"
              className="w-full justify-start h-auto py-4 px-6 text-left"
              onClick={() => onAnswer(option.type as ValueType)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}