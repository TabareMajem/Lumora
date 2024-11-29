import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const Games = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Recommendations</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover games that match your personality type and playing style preferences.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for game recommendations */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
            <p className="text-gray-600">Game recommendations will appear here based on your profile.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};