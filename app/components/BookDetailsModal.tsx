import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import React from "react";
import { Book } from "../api/books/types/book.types";
import Image from "next/image";

interface ComponentProps {
  showModal: boolean;
  handleModalClose: () => void;
  book?: Book;
}

const BookDetailsModal = ({
  handleModalClose,
  showModal,
  book,
}: ComponentProps) => {
  return (
    <Dialog open={showModal} onOpenChange={handleModalClose}>
      <DialogContent className="bg-background rounded-lg shadow-md max-w-[90vw] max-h-[90vh] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Image
            src={book?.thumbnailUrl || ""}
            alt={book?.title || "BOOK"}
            width={300}
            height={400}
            className="w-full object-cover rounded-lg"
            style={{ objectFit: "cover" }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{book?.title}</h3>
            <p className="text-sm text-muted-foreground">
              {book?.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-5">
              {book?.authors.join(", ")}
            </div>
            <div className="flex flex-wrap gap-3">
              {book?.categories.map((category) => (
                <p className=" bg-[#EBEBEB] px-4 py-1 rounded-lg font-normal">
                  {category}
                </p>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal;
