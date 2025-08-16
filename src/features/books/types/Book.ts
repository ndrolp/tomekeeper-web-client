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

    externalCoverUrl?: string;
}

export interface BookCreationDTO {
    book: {
        title: "",
        genre: "",
        description: "",
        externalCoverUrl: "",
        seriesOrder: ""
    },
    serie?: {
        id?: number;
        name: string;
        description?: string;
    };
}

export interface BookFilterDTO {
    authors: string[];
    genres: string[];
}
