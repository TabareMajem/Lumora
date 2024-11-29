// Add these types to your existing types.ts file

export type ValueType = 
  | 'LEADERSHIP'
  | 'CREATIVITY'
  | 'EMPATHY'
  | 'DETERMINATION'
  | 'WISDOM'
  | 'INTEGRITY'
  | 'COLLABORATION'
  | 'INDEPENDENCE';

export interface Question {
  id: number;
  text: string;
  imageUrl: string;
  options: {
    text: string;
    type: string;
  }[];
}

export interface ValuesResult {
  primary: ValueType;
  secondary: ValueType;
  scores: Record<ValueType, number>;
}