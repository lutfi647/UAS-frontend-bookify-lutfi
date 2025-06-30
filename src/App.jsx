// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from './features/books/pages/BookListPage';
import BookDetailPage from './features/books/pages/BookDetailPage';
import BookFormPage from './features/books/pages/BookFormPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import FavoritePage from './pages/FavoritePage';
import ReadBookPage from './pages/ReadBookPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col text-gray-900 dark:text-white">
        <Navbar />
        <div className="pt-20 pb-10 flex-grow">
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/add" element={<BookFormPage />} />
            <Route path="/edit/:id" element={<BookFormPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/read/:id" element={<ReadBookPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;