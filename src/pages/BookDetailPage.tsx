import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookDetail } from '../hooks/useBookDetail';
import { updateBook } from '../services/api';
import { Book } from '../types/book';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = id ? parseInt(id) : 0;
  const { book, loading, error } = useBookDetail(bookId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Omit<Book, 'id' | 'publicationYear'> | null>(null);

  const handleEdit = () => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        quantity: book.quantity,
        totalSales: book.totalSales,
      });
      setIsEditing(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await updateBook(bookId, formData);
        setIsEditing(false);
        window.location.reload(); // Refresh to show updated data
      } catch (err) {
        console.error('Failed to update book:', err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.name === 'quantity' || e.target.name === 'totalSales' 
          ? parseInt(e.target.value) 
          : e.target.value,
      });
    }
  };

  if (loading) return <div className="text-center p-5 m-5">Loading...</div>;
  if (error) return <div className="text-center p-5 m-5 text-red-500">{error}</div>;
  if (!book) return <div className="text-center p-5 m-5">Book not found</div>;

  return (
    <div className="max-w-[800px] mx-auto my-5 p-5 bg-white rounded-lg shadow">
      {isEditing && formData ? (
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl text-gray-800 mb-5">Edit Book</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Title:</span>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Author:</span>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Quantity:</span>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Total Sales:</span>
              <input
                name="totalSales"
                type="number"
                value={formData.totalSales}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-2.5">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-2xl text-gray-800 mb-5">{book.title}</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Available Quantity:</span>
              <span className="text-gray-800">{book.quantity}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-gray-600 min-w-[150px]">Total Sales:</span>
              <span className="text-gray-800">{book.totalSales}</span>
            </div>
          </div>
          <div className="mt-5 flex gap-2.5">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={() => window.history.back()}
            >
              Back to List
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetailPage;