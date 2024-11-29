import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Gamepad2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const AssessmentSelection = () => {
  const navigate = useNavigate();

  const handleStartTest = (type: string) => {
    navigate(`/assessment?type=${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Psychological Assessments</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete these assessments to get personalized recommendations based on your psychological profile.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Gamepad2 className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Bartle Test</h2>
                <p className="text-sm text-gray-500">10-15 minutes</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Discover your gaming personality type and understand what motivates you in games.
              This test helps us recommend games that match your play style.
            </p>
            <Button 
              onClick={() => handleStartTest('bartle')}
              className="w-full"
            >
              Start Test
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Big Five Personality</h2>
                <p className="text-sm text-gray-500">15-20 minutes</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Understand your core personality traits that influence your entertainment preferences.
              This helps us recommend content that resonates with you.
            </p>
            <Button 
              onClick={() => handleStartTest('bigfive')}
              className="w-full"
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};