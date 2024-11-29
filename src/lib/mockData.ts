import { db } from './db';
import { hashPassword } from './utils/auth';

export async function seedMockData() {
  try {
    // Create mock user with proper password hash
    const passwordHash = await hashPassword('Password123!');
    const userId = await db.users.add({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Create mock media entries
    const mediaEntries = [
      {
        title: 'The Legend of Zelda: Breath of the Wild',
        type: 'GAME',
        genres: ['Action', 'Adventure', 'RPG'],
        plotSummary: 'An open-world action-adventure game where you explore the vast kingdom of Hyrule.',
        releaseDate: '2017-03-03',
        ratings: 9.5,
        platforms: ['Nintendo Switch', 'Wii U'],
        coverImageUrl: 'https://images.unsplash.com/photo-1585857188902-95fdb47e557f',
      },
      {
        title: 'Inception',
        type: 'FILM',
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        plotSummary: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        releaseDate: '2010-07-16',
        ratings: 8.8,
        platforms: ['Netflix', 'Amazon Prime'],
        coverImageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1',
      },
      {
        title: 'Breaking Bad',
        type: 'SERIES',
        genres: ['Crime', 'Drama', 'Thriller'],
        plotSummary: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future.',
        releaseDate: '2008-01-20',
        ratings: 9.5,
        platforms: ['Netflix'],
        coverImageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf',
      },
    ];

    const mediaIds = await Promise.all(
      mediaEntries.map(media => db.media.add(media))
    );

    // Create mock recommendations
    await Promise.all(
      mediaIds.map(mediaId =>
        db.recommendations.add({
          userId,
          mediaId,
          score: Math.random() * 0.3 + 0.7, // Random score between 0.7 and 1.0
          recommendedAt: new Date().toISOString(),
        })
      )
    );

    // Create mock assessment
    await db.assessments.add({
      userId,
      type: 'BARTLE',
      scores: {
        ACHIEVER: 0.3,
        EXPLORER: 0.4,
        SOCIALIZER: 0.2,
        KILLER: 0.1,
      },
      completedAt: new Date().toISOString(),
    });

    return {
      email: 'test@example.com',
      password: 'Password123!',
    };
  } catch (error) {
    console.error('Error seeding mock data:', error);
    throw error;
  }
}