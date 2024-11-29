import { PrismaClient } from '@prisma/client';
import { stringifyJsonField } from '../src/lib/utils/json';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.media.deleteMany();

  // Create a test user
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashed_password_here',
    },
  });

  // Create some initial media entries
  const game = await prisma.media.create({
    data: {
      title: 'The Legend of Zelda: Breath of the Wild',
      type: 'GAME',
      genres: stringifyJsonField(['Action', 'Adventure', 'RPG']),
      plotSummary: 'An open-world action-adventure game...',
      releaseDate: new Date('2017-03-03'),
      ratings: 9.5,
      platforms: stringifyJsonField(['Nintendo Switch', 'Wii U']),
      coverImageUrl: 'https://example.com/botw.jpg',
      trailerUrl: 'https://example.com/botw-trailer',
      game: {
        create: {
          gameplayMechanics: stringifyJsonField(['Open World', 'Physics-Based Puzzles']),
          storytellingNarrative: 'Non-linear with environmental storytelling',
          visualAudioDesign: 'Cel-shaded art style with dynamic music',
          replayability: 'High',
          difficulty: 'Moderate',
          socialInteraction: 'Single-player',
          playerAgency: 'High',
          innovation: 'Physics engine and emergent gameplay',
          immersion: 'High with minimal UI',
        },
      },
    },
  });

  console.log({ user, game });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });