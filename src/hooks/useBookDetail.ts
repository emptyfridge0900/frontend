import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { fetchBookById } from '../services/api';

export const useBookDetail = (id: number) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  return { book, loading, error };
};
