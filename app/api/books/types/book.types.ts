interface PublishedDate {
  $date: string; // ISO 8601 date string
}

export interface Book {
  _id: number;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: PublishedDate;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: "PUBLISH" | "UNPUBLISH"; // Assuming possible values
  authors: string[];
  categories: string[];
}

export type BooksList = Book[];
