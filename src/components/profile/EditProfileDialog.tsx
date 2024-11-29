import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { type z } from 'zod';
import { updateProfileSchema } from '../../lib/validations/user';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { User } from '@prisma/client';

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

interface EditProfileDialogProps {
  user: User;
  onClose: () => void;
  onSubmit: (data: UpdateProfileForm) => Promise<void>;
}

export const EditProfileDialog = ({ user, onClose, onSubmit }: EditProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              error={errors.username?.message}
              {...register('username')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};