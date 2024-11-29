import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface Platform {
  name: string;
  url: string;
  price?: string;
  type: 'subscription' | 'rent' | 'buy';
}

interface StreamingAvailabilityProps {
  platforms: Platform[];
}

export const StreamingAvailability = ({ platforms }: StreamingAvailabilityProps) => {
  const groupedPlatforms = platforms.reduce((acc, platform) => {
    if (!acc[platform.type]) {
      acc[platform.type] = [];
    }
    acc[platform.type].push(platform);
    return acc;
  }, {} as Record<string, Platform[]>);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Where to Watch</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedPlatforms).map(([type, platforms]) => (
          <div key={type}>
            <h4 className="text-sm font-medium text-gray-500 mb-2 capitalize">
              {type}
            </h4>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <a
                  key={platform.url}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span>{platform.name}</span>
                    <div className="flex items-center space-x-2">
                      {platform.price && (
                        <span className="text-sm text-gray-500">
                          {platform.price}
                        </span>
                      )}
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </Button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};