import type { AwardOrganization } from '../types';

export const AWARD_ORGANIZATIONS: AwardOrganization[] = [
  {
    name: 'Academy Awards',
    categories: [
      { name: 'Best Picture', significance: 10 },
      { name: 'Best Director', significance: 9 },
      { name: 'Best Actor', significance: 8 },
      { name: 'Best Actress', significance: 8 },
    ],
  },
  {
    name: 'Game Awards',
    categories: [
      { name: 'Game of the Year', significance: 10 },
      { name: 'Best Game Direction', significance: 9 },
      { name: 'Best Narrative', significance: 8 },
      { name: 'Best Art Direction', significance: 7 },
    ],
  },
  {
    name: 'Emmy Awards',
    categories: [
      { name: 'Outstanding Drama Series', significance: 10 },
      { name: 'Outstanding Comedy Series', significance: 10 },
      { name: 'Outstanding Limited Series', significance: 9 },
      { name: 'Outstanding Lead Actor', significance: 8 },
    ],
  },
];

export const getAwardSignificance = (organization: string, category: string): number => {
  const org = AWARD_ORGANIZATIONS.find(o => o.name === organization);
  const cat = org?.categories.find(c => c.name === category);
  return cat?.significance || 5; // Default to medium significance if not found
};