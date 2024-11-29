import React from 'react';
import { Share2, Twitter, Facebook, Link } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [showCopied, setShowCopied] = React.useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex flex-wrap gap-2">
      {navigator.share && (
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      )}

      <Button
        variant="outline"
        as="a"
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="h-4 w-4 mr-2" />
        Tweet
      </Button>

      <Button
        variant="outline"
        as="a"
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook className="h-4 w-4 mr-2" />
        Share
      </Button>

      <Button variant="outline" onClick={handleCopyLink}>
        <Link className="h-4 w-4 mr-2" />
        {showCopied ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
}