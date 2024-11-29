import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Award, Star, Clock, Calendar, Users, Trophy, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StreamingAvailability } from '../components/media/StreamingAvailability';
import { RatingDisplay } from '../components/media/RatingDisplay';
import { RatingStats } from '../components/media/RatingStats';
import { RatingTrends } from '../components/media/RatingTrends';
import { RatingComparison } from '../components/media/RatingComparison';
import { RatingHeatmap } from '../components/media/RatingHeatmap';
import { RatingLeaderboard } from '../components/media/RatingLeaderboard';
import { GamingRatingCard } from '../components/media/GamingRatingCard';
import { AchievementGrid } from '../components/media/AchievementGrid';
import { RatingMilestones } from '../components/media/RatingMilestones';
import { RatingLevel } from '../components/media/RatingLevel';

export const MediaDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [media, setMedia] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  // Mock data for demonstration
  const mockAchievements = [
    {
      id: '1',
      title: 'First Review',
      description: 'Submit your first rating',
      type: 'bronze' as const,
      unlocked: true,
      progress: 100,
    },
    {
      id: '2',
      title: 'Expert Critic',
      description: 'Submit 10 detailed reviews',
      type: 'silver' as const,
      unlocked: false,
      progress: 60,
    },
    {
      id: '3',
      title: 'Master Reviewer',
      description: 'Achieve 100 helpful votes',
      type: 'gold' as const,
      unlocked: false,
      progress: 45,
    },
    {
      id: '4',
      title: 'Legend',
      description: 'Top reviewer of the month',
      type: 'platinum' as const,
      unlocked: false,
      progress: 20,
    },
  ];

  const mockMilestones = [
    {
      id: '1',
      title: 'Review Novice',
      description: 'Submit your first 5 reviews',
      threshold: 5,
      currentValue: 3,
      icon: 'star' as const,
    },
    {
      id: '2',
      title: 'Genre Expert',
      description: 'Review 10 titles in the same genre',
      threshold: 10,
      currentValue: 7,
      icon: 'trophy' as const,
    },
    {
      id: '3',
      title: 'Dedicated Critic',
      description: 'Maintain a review streak for 30 days',
      threshold: 30,
      currentValue: 15,
      icon: 'medal' as const,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Media Info */}
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 flex-shrink-0">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800"
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold">Example Title</h1>
                    <p className="text-gray-400">Action, Adventure, RPG</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">4.8</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="ml-1">2h 30m</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="ml-1">2023</span>
                    </div>
                  </div>

                  <p className="text-gray-300">
                    A compelling description of the media content goes here, providing an overview
                    of the story, gameplay, or series premise.
                  </p>

                  <div className="flex space-x-4">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Add to Library
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                      Rate & Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Rating Analytics */}
          <div className="space-y-8">
            <GamingRatingCard
              rating={{
                id: '1',
                userId: '1',
                mediaId: '1',
                type: 'GAME',
                scores: {
                  gameplay: 9,
                  graphics: 8,
                  sound: 9,
                  story: 7,
                  performance: 8,
                },
                createdAt: new Date().toISOString(),
              }}
            />

            <RatingStats
              ratings={[]}
              type="GAME"
            />

            <RatingTrends
              ratings={[]}
              type="GAME"
            />

            <RatingHeatmap
              ratings={[]}
            />
          </div>

          {/* Achievements and Milestones */}
          <div className="space-y-8">
            <AchievementGrid
              achievements={mockAchievements}
            />

            <RatingMilestones
              milestones={mockMilestones}
            />

            <RatingLevel
              level={5}
              experience={750}
              nextLevelExperience={1000}
              rewards={[
                'Exclusive Badge',
                'Custom Profile Theme',
                'Early Access Reviews',
              ]}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Rating Leaderboard */}
          <RatingLeaderboard
            ratings={[]}
            category="Overall"
          />

          {/* Streaming Availability */}
          <StreamingAvailability
            platforms={[
              {
                name: 'Netflix',
                url: 'https://netflix.com',
                type: 'subscription'
              },
              {
                name: 'Amazon Prime',
                url: 'https://amazon.com',
                price: '$3.99',
                type: 'rent'
              },
              {
                name: 'iTunes',
                url: 'https://itunes.apple.com',
                price: '$14.99',
                type: 'buy'
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};