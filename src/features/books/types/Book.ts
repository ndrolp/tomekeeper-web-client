export interface Book {
  id?: number;

  title: string;

  author?: string;

  genre?: string;

  publicationYear?: number | string;

  description?: string;

  language?: string;

  series?: string;

  seriesOrder?: number | string;
}

export interface BookCreationDTO {
  id?: number;
  title: string;
  author?: string;
  genre?: string;
  publicationYear?: number;
  description?: string;
  language?: string;
  serie?: {
    id?: number;
    name: string;
    description?: string;
  };
  seriesOrder?: number;
}
