export interface Book {
  id: number;

  title: string;

  author?: string;

  genre?: string;

  publicationYear?: number;

  description?: string;

  language?: string;

  seriesOrder?: number;
}
