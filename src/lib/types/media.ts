export type MediaType = 'FILM' | 'SERIES' | 'GAME';

export interface MediaCategory {
  id: string;
  name: string;
  description: string;
  type: MediaType;
  subcategories?: MediaCategory[];
}

export const FILM_CATEGORIES: MediaCategory[] = [
  {
    id: 'genre',
    name: 'Genre',
    description: 'Primary classification based on narrative style and content',
    type: 'FILM',
    subcategories: [
      { id: 'action', name: 'Action', description: '', type: 'FILM' },
      { id: 'comedy', name: 'Comedy', description: '', type: 'FILM' },
      { id: 'drama', name: 'Drama', description: '', type: 'FILM' },
      { id: 'horror', name: 'Horror', description: '', type: 'FILM' },
      { id: 'scifi', name: 'Sci-Fi', description: '', type: 'FILM' },
      { id: 'fantasy', name: 'Fantasy', description: '', type: 'FILM' },
      { id: 'romance', name: 'Romance', description: '', type: 'FILM' },
      { id: 'thriller', name: 'Thriller', description: '', type: 'FILM' },
      { id: 'documentary', name: 'Documentary', description: '', type: 'FILM' },
      { id: 'animation', name: 'Animation', description: '', type: 'FILM' },
    ],
  },
  {
    id: 'plotComplexity',
    name: 'Plot Complexity',
    description: 'Measures the intricacy and depth of the storyline',
    type: 'FILM',
    subcategories: [
      { id: 'simple', name: 'Simple', description: '', type: 'FILM' },
      { id: 'moderate', name: 'Moderate', description: '', type: 'FILM' },
      { id: 'complex', name: 'Complex', description: '', type: 'FILM' },
    ],
  },
  // Add other film categories...
];

export const SERIES_CATEGORIES: MediaCategory[] = [
  {
    id: 'genre',
    name: 'Genre',
    description: 'Primary classification based on narrative style and content',
    type: 'SERIES',
    subcategories: [
      { id: 'drama', name: 'Drama Series', description: '', type: 'SERIES' },
      { id: 'comedy', name: 'Comedy Series', description: '', type: 'SERIES' },
      { id: 'limited', name: 'Limited Series', description: '', type: 'SERIES' },
      // Add other series genres...
    ],
  },
  // Add other series categories...
];

export const GAME_CATEGORIES: MediaCategory[] = [
  {
    id: 'genre',
    name: 'Genre',
    description: 'Primary classification based on gameplay style and content',
    type: 'GAME',
    subcategories: [
      { id: 'action', name: 'Action', description: '', type: 'GAME' },
      { id: 'adventure', name: 'Adventure', description: '', type: 'GAME' },
      { id: 'rpg', name: 'Role-Playing (RPG)', description: '', type: 'GAME' },
      { id: 'strategy', name: 'Strategy', description: '', type: 'GAME' },
      { id: 'simulation', name: 'Simulation', description: '', type: 'GAME' },
      { id: 'sports', name: 'Sports', description: '', type: 'GAME' },
      { id: 'puzzle', name: 'Puzzle', description: '', type: 'GAME' },
      { id: 'horror', name: 'Horror', description: '', type: 'GAME' },
      { id: 'moba', name: 'MOBA', description: '', type: 'GAME' },
      { id: 'sandbox', name: 'Sandbox', description: '', type: 'GAME' },
    ],
  },
  // Add other game categories...
];