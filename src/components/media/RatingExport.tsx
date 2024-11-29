import React from 'react';
import { Download, Upload } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import type { DetailedRating } from '../../lib/db/repositories/ratingRepository';

interface RatingExportProps {
  ratings: DetailedRating[];
  onImport: (ratings: DetailedRating[]) => void;
}

export function RatingExport({ ratings, onImport }: RatingExportProps) {
  const handleExport = () => {
    const data = JSON.stringify(ratings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ratings-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedRatings = JSON.parse(e.target?.result as string);
        onImport(importedRatings);
      } catch (error) {
        console.error('Error importing ratings:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Export/Import Ratings</h3>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button
            onClick={handleExport}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Ratings
          </Button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-ratings"
            />
            <Button
              onClick={() => document.getElementById('import-ratings')?.click()}
              variant="outline"
              className="flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Ratings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}