import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Gamepad2, Film, ArrowRight, Star, Trophy, TrendingUp, BarChart2, Award, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAuth } from '../contexts/auth';

export function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoAccess = async () => {
    try {
      await login('test@example.com', 'Password123!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920"
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              Your Ultimate Entertainment
              <span className="block mt-2 text-indigo-400">Rating & Discovery Platform</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rate, review, and discover games, movies, and series based on your psychological profile.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto"
              >
                <Brain className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleDemoAccess}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Try Demo Access
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Discover Our Features</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Psychological Assessments */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Psychological Profile</h3>
                <p className="text-gray-600 mb-4">
                  Take our assessments to get personalized recommendations based on your personality.
                </p>
                <Button onClick={() => navigate('/assessment-selection')} className="w-full">
                  Take Assessment
                </Button>
              </CardContent>
            </Card>

            {/* Game Ratings */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Game Ratings</h3>
                <p className="text-gray-600 mb-4">
                  Rate and review games across multiple categories with our detailed rating system.
                </p>
                <Button onClick={() => navigate('/games')} className="w-full">
                  Rate Games
                </Button>
              </CardContent>
            </Card>

            {/* Movie & Series Ratings */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Film className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Movie & Series Ratings</h3>
                <p className="text-gray-600 mb-4">
                  Evaluate films and series with our comprehensive rating categories.
                </p>
                <Button onClick={() => navigate('/media')} className="w-full">
                  Rate Media
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized recommendations based on your ratings and psychological profile.
                </p>
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  View Recommendations
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rating Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Explore detailed analytics and insights about your ratings and preferences.
                </p>
                <Button onClick={() => navigate('/profile')} className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Social Analysis */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Analyze your social media profile to enhance recommendations.
                </p>
                <Button onClick={() => navigate('/social-analysis')} className="w-full">
                  Analyze Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievement System */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Achievement System</h2>
            <p className="text-gray-600">Level up your profile and unlock rewards as you rate and review.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Earn Achievements</h3>
                <p className="text-gray-600">Complete milestones and unlock special badges.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your rating journey and level progression.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Unlock Rewards</h3>
                <p className="text-gray-600">Gain access to exclusive features and customizations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Rating Journey Today
              </h2>
              <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join our community and discover entertainment that truly matches your personality.
              </p>
              <Button
                size="lg"
                onClick={handleDemoAccess}
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Try Demo Account
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}