// File: src/pages/FavoritePage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const favBooks = savedBooks.filter((book) => savedFavorites.includes(book.id));
    setFavorites(favBooks);
    setBooks(savedBooks);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">❤️ Buku Favorit</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Belum ada buku yang ditandai sebagai favorit.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((book) => (
            <div key={book.id} className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1 truncate">{book.title}</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-3 line-clamp-3 text-sm">{book.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/book/${book.id}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Detail
                </Link>
                <button
                  onClick={() => navigate(`/edit/${book.id}`)}
                  className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
