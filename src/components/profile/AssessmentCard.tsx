import React from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { PsychologicalAssessment } from '@prisma/client';

interface AssessmentCardProps {
  assessments: PsychologicalAssessment[];
  onStartAssessment: () => void;
}

export const AssessmentCard = ({ assessments, onStartAssessment }: AssessmentCardProps) => {
  const hasCompletedBartle = assessments.some(a => a.assessmentType === 'BARTLE');
  const hasCompletedBigFive = assessments.some(a => a.assessmentType === 'BIG_FIVE');

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Psychological Profile</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Complete these assessments to get personalized recommendations based on your
              psychological profile.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">Bartle Test</h3>
                  <p className="text-sm text-gray-500">Gaming personality type</p>
                </div>
              </div>
              {hasCompletedBartle ? (
                <span className="text-sm text-green-600 font-medium">Completed</span>
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">Big Five Personality Test</h3>
                  <p className="text-sm text-gray-500">Core personality traits</p>
                </div>
              </div>
              {hasCompletedBigFive ? (
                <span className="text-sm text-green-600 font-medium">Completed</span>
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          <Button
            onClick={onStartAssessment}
            className="w-full"
            variant={hasCompletedBartle && hasCompletedBigFive ? 'outline' : 'default'}
          >
            {hasCompletedBartle && hasCompletedBigFive
              ? 'Retake Assessments'
              : 'Start Assessment'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};