import React, { useState } from 'react';
import { BARTLE_QUESTIONS, BARTLE_TYPES, BARTLE_DESCRIPTIONS } from '../../lib/constants/bartleTest';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import type { AssessmentResponse, BartleResult } from '../../lib/types/assessment';

interface BartleTestProps {
  onComplete: (result: BartleResult) => void;
}

export const BartleTest = ({ onComplete }: BartleTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<BartleResult | null>(null);

  const progress = (responses.length / BARTLE_QUESTIONS.length) * 100;

  const handleOptionSelect = (type: string) => {
    const newResponses = [
      ...responses,
      { questionId: BARTLE_QUESTIONS[currentQuestion].id, selectedType: type as any },
    ];
    setResponses(newResponses);

    if (currentQuestion < BARTLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newResponses);
    }
  };

  const calculateResult = (responses: AssessmentResponse[]) => {
    const scores: Record<string, number> = {
      ACHIEVER: 0,
      EXPLORER: 0,
      SOCIALIZER: 0,
      KILLER: 0,
    };

    responses.forEach((response) => {
      scores[response.selectedType] += 1;
    });

    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const normalizedScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, (value / total) * 100])
    ) as Record<any, number>;

    const primary = Object.entries(normalizedScores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0] as any;

    const result = {
      primary,
      scores: normalizedScores,
    };

    setResult(result);
    setShowResult(true);
    onComplete(result);
  };

  if (showResult && result) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Your Gaming Personality</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-indigo-600">
              You are primarily a {BARTLE_TYPES[result.primary]}
            </h3>
            <p className="mt-2 text-gray-600">{BARTLE_DESCRIPTIONS[result.primary]}</p>
          </div>

          <div className="space-y-4">
            {Object.entries(result.scores).map(([type, score]) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{BARTLE_TYPES[type as any]}</span>
                  <span>{Math.round(score)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = BARTLE_QUESTIONS[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Bartle Test</h2>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-gray-600">
            Question {currentQuestion + 1} of {BARTLE_QUESTIONS.length}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium text-center">{question.text}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option.type}
              onClick={() => handleOptionSelect(option.type)}
              className="w-full text-left justify-start h-auto py-4 px-6"
              variant="outline"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};