import React, { useState } from 'react';
import { Book } from '../../types/book';

interface AddBookModalProps {
  onClose: () => void;
  onAddBook: (book: Omit<Book, 'id' | 'quantity' | 'totalSales'>) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, author };
    onAddBook(newBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[400px]">
        <h2 className="text-xl mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mb-2.5 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full mb-2.5 p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end gap-2.5">
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Book
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;