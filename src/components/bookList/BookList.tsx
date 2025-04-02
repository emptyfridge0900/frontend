import React, { useState } from 'react';
import { Book } from '../../types/book';
import AddBookModal from './AddBookModal';
import SearchBar from '../common/SearchBar';
import Pagination from '../common/Pagination';
import { addBook, deleteBook } from '../../services/api';
import { useBooks } from '../../hooks/useBooks';

interface BookListProps {
  onBookAdded?: (book: Book) => void; // Optional, as we'll manage state in useBooks
}

export const BookList: React.FC<BookListProps> = ({ onBookAdded }) => {
  const { books, totalRecords, pageIndex, setPageIndex, loading, error, setSearchParams } = useBooks(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = Math.ceil(totalRecords / 10);

  const handleAddBook = async (newBook: Omit<Book, 'id' | 'quantity' | 'totalSales'>) => {
    try {
      const response = await addBook(newBook);
      if (onBookAdded && response.Results.length > 0) {
        onBookAdded(response.Results[0]); // Assuming the new book is in Results
      }
      // Refresh the list
      setPageIndex(1); // Reset to first page to show new book
    } catch (error) {
      console.error('Failed to add book:', error);
    }
    setIsModalOpen(false);
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setPageIndex(1); // Refresh list
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleSearch = (term: string) => {
    setSearchParams({
      author: term,
      title: term,
    });
    setPageIndex(1); // Reset to first page on search
  };

  const handleBookClick = (bookId: number) => {
    window.location.href = `/book/${bookId}`;
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <div className="p-5 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-5">
        <SearchBar
          searchTerm=""
          onSearchChange={handleSearch}
        />
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Add Book
        </button>
      </div>

      <table className="w-full border-collapse mb-5">
        <thead>
          <tr>
            <th className="p-3 text-left border-b border-gray-200">Title</th>
            <th className="p-3 text-left border-b border-gray-200">Author</th>
            <th className="p-3 text-left border-b border-gray-200">Year</th>
            <th className="p-3 text-left border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book.id}>
              <td 
                className="p-3 border-b border-gray-200 text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleBookClick(book.id)}
              >
                {book.title}
              </td>
              <td className="p-3 border-b border-gray-200">{book.author}</td>

              <td className="p-3 border-b border-gray-200">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageIndex}
        totalPages={totalPages}
        onPageChange={setPageIndex}
      />

      {isModalOpen && (
        <AddBookModal
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleAddBook}
        />
      )}
    </div>
  );
};

export default BookList;