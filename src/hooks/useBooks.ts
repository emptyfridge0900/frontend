import { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { fetchBooks } from '../services/api';

export const useBooks = (itemsPerPage: number = 10) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{ author?: string; title?: string }>({});

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks(pageIndex, itemsPerPage, searchParams.author, searchParams.title);
      setBooks(data.Results);
      setTotalRecords(data.totalRecords);
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [pageIndex, searchParams]);

  return {
    books,
    totalRecords,
    pageIndex,
    setPageIndex,
    loading,
    error,
    setSearchParams,
  };
};
