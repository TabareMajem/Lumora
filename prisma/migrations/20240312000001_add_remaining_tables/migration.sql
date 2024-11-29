-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mediaId" TEXT NOT NULL,
    "steamId" TEXT UNIQUE,
    "rawgId" TEXT UNIQUE,
    "igdbId" TEXT UNIQUE,
    "gameplayMechanics" TEXT NOT NULL,
    "storytellingNarrative" TEXT NOT NULL,
    "visualAudioDesign" TEXT NOT NULL,
    "replayability" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "socialInteraction" TEXT NOT NULL,
    "playerAgency" TEXT NOT NULL,
    "innovation" TEXT NOT NULL,
    "immersion" TEXT NOT NULL,
    CONSTRAINT "games_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "films_series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mediaId" TEXT NOT NULL,
    "imdbId" TEXT UNIQUE,
    "omdbId" TEXT UNIQUE,
    "tmdbId" TEXT UNIQUE,
    "episodeCount" INTEGER,
    "seasonCount" INTEGER,
    CONSTRAINT "films_series_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "awards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL,
    CONSTRAINT "awards_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "recommendedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recommendations_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "feedbackType" TEXT NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,
    "providedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_feedback_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);