"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Book, BooksList } from "./api/books/types/book.types";
import BookCard from "./components/BookCard";
import BookDetailsModal from "./components/BookDetailsModal";

const fetchBooks = async () => {
  try {
    const response = await fetch("/api/books");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: BooksList = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    // Handle errors or return a default value
    return [];
  }
};

export default function Home() {
  const [books, setBooks] = useState<BooksList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const filteredBooks =
    selectedGenre === "All"
      ? books
      : books?.filter((book) => book.categories.includes(selectedGenre));
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };
  const handleBookClick = (data: Book) => {
    setSelectedBook(data);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBook(undefined);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: BooksList = await response.json();

        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        // Handle errors or return a default value
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <main className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGenre === "All"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleGenreChange("All")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGenre === "Fiction"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleGenreChange("Fiction")}
            >
              Fiction
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGenre === "Science Fiction"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleGenreChange("Science Fiction")}
            >
              Science Fiction
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedGenre === "Fantasy"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => handleGenreChange("Fantasy")}
            >
              Fantasy
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks?.map((book) => (
            <BookCard
              handleBookClick={handleBookClick}
              book={book}
              key={book._id}
            />
          ))}
        </div>
      </main>
      <BookDetailsModal
        book={selectedBook}
        showModal={showModal}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
