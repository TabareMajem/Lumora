import { prisma } from '../prisma';
import * as watchmode from '../api/watchmode';
import * as unogs from '../api/unogs';
import { stringifyJsonField } from '../utils/json';

export async function syncStreamingAvailability(mediaId: string) {
  const media = await prisma.media.findUnique({
    where: { id: mediaId },
    include: {
      filmSeries: true,
    },
  });

  if (!media) throw new Error('Media not found');

  // Get streaming info from Watchmode
  let watchmodeData = null;
  if (media.filmSeries?.watchmodeId) {
    watchmodeData = await watchmode.getStreamingInfo(media.filmSeries.watchmodeId);
  }

  // Get Netflix availability from uNoGS
  let netflixData = null;
  if (media.filmSeries?.netflixId) {
    netflixData = await unogs.getNetflixAvailability(media.filmSeries.netflixId);
  }

  // Combine streaming data
  const platforms = [
    ...(watchmodeData?.sources || []),
    ...(netflixData?.countries || []).map((country: any) => ({
      name: 'Netflix',
      region: country.country_code,
      url: `https://www.netflix.com/title/${media.filmSeries?.netflixId}`,
      type: 'subscription',
    })),
  ];

  // Update media with streaming platforms
  await prisma.media.update({
    where: { id: mediaId },
    data: {
      platforms: stringifyJsonField(platforms),
      updatedAt: new Date(),
    },
  });

  return platforms;
}