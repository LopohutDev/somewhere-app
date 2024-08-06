import BookList from "@/app/api/books/book-list.json";

export default async function getBooksService(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search")?.toLowerCase() || "";
  const take = parseInt(searchParams.get("take") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);

  try {
    const filteredBooks = BookList.filter(
      (book) =>
        book.title.toLowerCase().includes(search) ||
        book.authors.some((author) => author.toLowerCase().includes(search))
    );

    const paginatedBooks = filteredBooks.slice(skip, skip + take);

    // Return the JSON response with the book list
    return new Response(JSON.stringify(paginatedBooks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load books" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
