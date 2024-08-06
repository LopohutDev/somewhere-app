import Image from "next/image";
import React from "react";
import { Book } from "../api/books/types/book.types";

interface ComponentProps {
  book: Book;
  handleBookClick: (data: Book) => void;
}

const BookCard = ({ handleBookClick, book }: ComponentProps) => {
  return (
    <div
      key={book._id}
      className="bg-card p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => handleBookClick(book)}
    >
      <Image
        width={500}
        height={500}
        src={book.thumbnailUrl}
        alt={book.title}
        className="w-full h-64 object-cover object-top rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{book.title}</h3>
      <p className="text-muted-foreground mb-2">{book.authors.join(", ")}</p>
      <div className="flex flex-wrap gap-3">
        {book.categories.map((category) => (
          <p className=" bg-[#EBEBEB] px-4 py-1 rounded-lg font-normal">
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BookCard;
