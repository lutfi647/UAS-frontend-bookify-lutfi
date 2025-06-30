// File: src/features/books/pages/BookDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const found = books.find((b) => b.id === id);
    setBook(found);
  }, [id]);

  if (!book) return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-center">Buku tidak ditemukan.</h2>
      <div className="text-center mt-4">
        <Link to="/" className="text-green-600 hover:underline">← Kembali ke daftar</Link>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">{book.title}</h1>
      <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-line">{book.description}</p>

      {book.link && (
        <div className="text-center mb-6">
          <Link
            to={`/read/${book.id}`}
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            📖 Baca Sekarang
          </Link>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Kembali
        </button>
        <Link
          to={`/edit/${book.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ✏️ Edit Buku Ini
        </Link>
      </div>
    </div>
  );
}

export default BookDetailPage;
