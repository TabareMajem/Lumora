import { prisma } from '../prisma';
import * as tmdb from '../api/tmdb';
import * as omdb from '../api/omdb';
import { stringifyJsonField } from '../utils/json';

export async function syncMovieFromTMDb(tmdbId: number) {
  const movieDetails = await tmdb.getMovieDetails(tmdbId);

  const media = await prisma.media.create({
    data: {
      title: movieDetails.title,
      type: 'FILM',
      genres: stringifyJsonField(movieDetails.genres.map((g: any) => g.name)),
      plotSummary: movieDetails.overview,
      releaseDate: new Date(movieDetails.release_date),
      ratings: movieDetails.vote_average,
      platforms: stringifyJsonField(['Theaters', 'Streaming']),
      coverImageUrl: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
      trailerUrl: movieDetails.videos?.results[0]?.key
        ? `https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`
        : null,
      filmSeries: {
        create: {
          tmdbId: String(tmdbId),
        },
      },
    },
  });

  return media;
}

export async function syncTVShowFromTMDb(tmdbId: number) {
  const showDetails = await tmdb.getTVShowDetails(tmdbId);

  const media = await prisma.media.create({
    data: {
      title: showDetails.name,
      type: 'SERIES',
      genres: stringifyJsonField(showDetails.genres.map((g: any) => g.name)),
      plotSummary: showDetails.overview,
      releaseDate: new Date(showDetails.first_air_date),
      ratings: showDetails.vote_average,
      platforms: stringifyJsonField(['Streaming']),
      coverImageUrl: `https://image.tmdb.org/t/p/w500${showDetails.poster_path}`,
      trailerUrl: showDetails.videos?.results[0]?.key
        ? `https://www.youtube.com/watch?v=${showDetails.videos.results[0].key}`
        : null,
      filmSeries: {
        create: {
          tmdbId: String(tmdbId),
          episodeCount: showDetails.number_of_episodes,
          seasonCount: showDetails.number_of_seasons,
        },
      },
    },
  });

  return media;
}

export async function syncFromOMDb(imdbId: string) {
  const details = await omdb.getDetailsByImdbId(imdbId);

  const media = await prisma.media.create({
    data: {
      title: details.Title,
      type: details.Type.toUpperCase(),
      genres: stringifyJsonField(details.Genre.split(', ')),
      plotSummary: details.Plot,
      releaseDate: new Date(details.Released),
      ratings: parseFloat(details.imdbRating),
      platforms: stringifyJsonField(['Streaming']),
      coverImageUrl: details.Poster,
      filmSeries: {
        create: {
          imdbId,
          omdbId: imdbId,
          episodeCount: details.totalSeasons ? parseInt(details.totalSeasons) * 10 : undefined,
          seasonCount: details.totalSeasons ? parseInt(details.totalSeasons) : undefined,
        },
      },
    },
  });

  return media;
}