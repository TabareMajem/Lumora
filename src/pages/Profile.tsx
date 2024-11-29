import React, { useState } from 'react';
import { useAuth } from '../contexts/auth';
import { ProfileCard } from '../components/profile/ProfileCard';
import { AssessmentCard } from '../components/profile/AssessmentCard';
import { EditProfileDialog } from '../components/profile/EditProfileDialog';
import { updateProfile } from '../lib/api/profile';
import type { z } from 'zod';
import type { updateProfileSchema } from '../lib/validations/user';

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export const Profile = () => {
  const { user } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);

  if (!user) return null;

  const handleUpdateProfile = async (data: UpdateProfileForm) => {
    try {
      await updateProfile(user.id, data);
      setShowEditDialog(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleStartAssessment = () => {
    // TODO: Implement assessment flow
    console.log('Starting assessment');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and take psychological assessments.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <ProfileCard user={user} onEdit={() => setShowEditDialog(true)} />
        <AssessmentCard
          assessments={[]} // TODO: Fetch actual assessments
          onStartAssessment={handleStartAssessment}
        />
      </div>

      {showEditDialog && (
        <EditProfileDialog
          user={user}
          onClose={() => setShowEditDialog(false)}
          onSubmit={handleUpdateProfile}
        />
      )}
    </div>
  );
};