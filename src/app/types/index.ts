export interface User {
  id: string;
  name: string;
  email: string;
  isVerified?: boolean;
}

export interface IntervalConfig {
  name: string;
  semitones: number;
  selected: boolean;
}

export interface ExerciseConfig {
  selectedIntervals: IntervalConfig[];
  direction: 'ascending' | 'descending' | 'both';
  playMode: 'harmonic' | 'melodic';
  rounds: number;
}

export interface Round {
  interval: string;
  isCorrect: boolean;
  userAnswer?: string;
}

export interface SessionResult {
  rounds: Round[];
  totalCorrect: number;
  accuracy: number;
  date: string;
} 