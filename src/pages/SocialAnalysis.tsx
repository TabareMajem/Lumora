import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Brain, Twitter, Instagram, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { BartleChart } from '../components/profile/BartleChart';
import { SocialMediaAnalyzer } from '../lib/services/socialMediaAnalyzer';

const analysisSchema = z.object({
  platform: z.enum(['twitter', 'instagram']),
  handle: z.string().min(1, 'Handle is required'),
});

type AnalysisForm = z.infer<typeof analysisSchema>;

export function SocialAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalysisForm>({
    resolver: zodResolver(analysisSchema),
  });

  const onSubmit = async (data: AnalysisForm) => {
    try {
      setLoading(true);
      setError(null);

      const analyzer = new SocialMediaAnalyzer(import.meta.env.VITE_OPENAI_API_KEY);
      const results = await analyzer.analyzeSocialProfile(data.platform, data.handle);
      setResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Analysis</h1>
          <p className="mt-2 text-gray-600">
            Analyze your social media presence to discover your psychological profile
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Enter Social Media Details</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative flex cursor-pointer">
                      <input
                        type="radio"
                        value="twitter"
                        className="peer sr-only"
                        {...register('platform')}
                      />
                      <div className="flex items-center justify-center w-full p-4 border rounded-lg peer-checked:border-indigo-600 peer-checked:bg-indigo-50">
                        <Twitter className="h-5 w-5 mr-2" />
                        Twitter
                      </div>
                    </label>
                    <label className="relative flex cursor-pointer">
                      <input
                        type="radio"
                        value="instagram"
                        className="peer sr-only"
                        {...register('platform')}
                      />
                      <div className="flex items-center justify-center w-full p-4 border rounded-lg peer-checked:border-indigo-600 peer-checked:bg-indigo-50">
                        <Instagram className="h-5 w-5 mr-2" />
                        Instagram
                      </div>
                    </label>
                  </div>
                  {errors.platform && (
                    <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username/Handle
                  </label>
                  <Input
                    {...register('handle')}
                    placeholder="Enter username without @"
                    error={errors.handle?.message}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <span className="flex items-center">
                    <Brain className="animate-pulse h-5 w-5 mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Analyze Profile
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Analysis Results</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{results.summary}</p>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Gaming Personality</h3>
                    <BartleChart scores={results.bartleTypes} />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Personality Traits</h3>
                    <div className="space-y-4">
                      {Object.entries(results.bigFive).map(([trait, score]) => (
                        <div key={trait}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{trait}</span>
                            <span>{Math.round(Number(score) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${Number(score) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}