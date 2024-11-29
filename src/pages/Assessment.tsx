import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BARTLE_QUESTIONS } from '../lib/constants/bartleTest';
import { bartleService } from '../lib/services/bartleService';
import { BartleQuestion } from '../components/assessments/BartleQuestion';
import { BartleResults } from '../components/assessments/BartleResults';
import { useAuth } from '../contexts/auth';
import type { AssessmentResponse, BartleType } from '../lib/types';

export function Assessment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [results, setResults] = useState<Record<BartleType, number> | null>(null);

  const handleAnswer = (type: BartleType) => {
    const newResponses = [
      ...responses,
      { questionId: BARTLE_QUESTIONS[currentQuestion].id, selectedType: type },
    ];
    setResponses(newResponses);

    if (currentQuestion < BARTLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const scores = bartleService.calculateResults(newResponses);
      setResults(scores);
    }
  };

  const handleComplete = async () => {
    if (user && results) {
      await bartleService.saveResults(user.id!, results);
      navigate('/dashboard');
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setResults(null);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BartleResults
          scores={results}
          onRetake={handleRetake}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) / BARTLE_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          Question {currentQuestion + 1} of {BARTLE_QUESTIONS.length}
        </p>
      </div>

      <BartleQuestion
        question={BARTLE_QUESTIONS[currentQuestion]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}