export interface Vocabulary {
  id: string;
  spaceId: string;
  term: string;
  meaning: string[];
  exampleSentence: string | null;
  imageUrl: string | null;
  referenceLink: string | null;
  referenceName: string | null;
  tags: string[];
  /** @format int32 */
  repetitionLevel: number;
  /** @format date-time */
  nextReview: string | null;
  createdBy: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  audioUrl: string;
  example: string;
  tags: string[];
  createdDate: string;
}

export enum RepetitionLevel {
  NEW = 0, // First time
  LEVEL_1 = 1, // Review after 1 day
  LEVEL_2 = 2, // Review after 3 days
  LEVEL_3 = 3, // Review after 7 days
  LEVEL_4 = 4, // Review after 14 days
  LEVEL_5 = 5, // Review after 30 days
  MASTERED = 6, // Review after 90 days
}
