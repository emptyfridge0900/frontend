import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
