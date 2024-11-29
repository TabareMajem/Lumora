import React from 'react';
import { User as UserIcon, Mail, Camera } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { User } from '@prisma/client';

interface ProfileCardProps {
  user: User;
  onEdit: () => void;
}

export const ProfileCard = ({ user, onEdit }: ProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <Button variant="outline" onClick={onEdit}>
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 shadow-sm border border-gray-200">
                <Camera className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Username</label>
              <div className="mt-1 flex items-center space-x-2">
                <UserIcon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{user.username}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="mt-1 flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};