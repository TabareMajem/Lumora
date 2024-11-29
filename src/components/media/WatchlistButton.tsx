import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import type { WatchlistItem } from '../../lib/db';

interface WatchlistButtonProps {
  mediaId: number;
  watchlistItem?: WatchlistItem;
  onToggle: () => Promise<void>;
}

export function WatchlistButton({
  mediaId,
  watchlistItem,
  onToggle,
}: WatchlistButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await onToggle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={watchlistItem ? 'default' : 'outline'}
      onClick={handleClick}
      disabled={isLoading}
      className="w-full sm:w-auto"
    >
      {watchlistItem ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          In Watchlist
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}