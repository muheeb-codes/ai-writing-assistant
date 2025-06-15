export interface WordSuggestion {
  word: string;
  score: number;
  tags?: string[];
  numSyllables?: number;
  defs?: string[];
}

export type SearchType = 'synonyms' | 'rhymes' | 'sounds-like' | 'means-like' | 'adjectives' | 'nouns';

export interface SearchOption {
  id: SearchType;
  label: string;
  apiParam: string;
  description: string;
}