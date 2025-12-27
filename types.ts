export enum Category {
  FOOD = 'FOOD',
  WATCH = 'WATCH',
  DO = 'DO',
  LEARN = 'LEARN',
  CHAOS = 'CHAOS'
}

export interface Suggestion {
  title: string;
  description: string;
  emoji: string;
  actionItem: string;
  reason: string;
  colorHex: string;
}

export interface HistoryItem extends Suggestion {
  id: string;
  timestamp: number;
}
