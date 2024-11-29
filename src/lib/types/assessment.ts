export type BartleType = 'ACHIEVER' | 'EXPLORER' | 'SOCIALIZER' | 'KILLER';

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  text: string;
  type: BartleType;
}

export interface BartleResult {
  primary: BartleType;
  scores: Record<BartleType, number>;
}

export interface AssessmentResponse {
  questionId: number;
  selectedType: BartleType;
}