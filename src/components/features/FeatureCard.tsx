import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold text-center text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  );
};