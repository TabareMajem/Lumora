import React from 'react';
import { useAuth } from '../contexts/auth';
import { useRecommendations } from '../hooks/useRecommendations';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { Brain, Gamepad2, Film } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const recommendations = useRecommendations(user?.id || 0);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}!</h1>
        <p className="mt-2 text-gray-600">Here are your personalized recommendations based on your profile.</p>
      </div>

      {/* Assessment Status */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-600" />
            Your Psychological Profile
          </h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Bartle Test</h3>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-sm text-gray-600">Primary type: Explorer</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Big Five Personality</h3>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-sm text-gray-600">Last completed: 2 months ago</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            Update Assessments
          </Button>
        </CardContent>
      </Card>

      {/* Game Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-indigo-600" />
            Recommended Games
          </h2>
          <Button variant="outline">View All</Button>
        </div>
        {!recommendations ? (
          <div className="text-center py-8">Loading recommendations...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations
              .filter(rec => rec.media?.type === 'GAME')
              .slice(0, 3)
              .map(rec => rec.media && (
                <RecommendationCard
                  key={rec.id}
                  media={rec.media}
                  score={rec.score}
                />
              ))}
          </div>
        )}
      </section>

      {/* Movie & Series Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Film className="h-6 w-6 text-indigo-600" />
            Recommended Movies & Series
          </h2>
          <Button variant="outline">View All</Button>
        </div>
        {!recommendations ? (
          <div className="text-center py-8">Loading recommendations...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations
              .filter(rec => rec.media?.type === 'FILM' || rec.media?.type === 'SERIES')
              .slice(0, 3)
              .map(rec => rec.media && (
                <RecommendationCard
                  key={rec.id}
                  media={rec.media}
                  score={rec.score}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};