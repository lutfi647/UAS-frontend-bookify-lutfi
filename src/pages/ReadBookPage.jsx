// File: src/pages/ReadBookPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ReadBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const found = books.find((b) => b.id === id);
    setBook(found);
  }, [id]);

  if (!book || !book.link) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center text-red-600">Tidak dapat menampilkan buku.</h2>
        <div className="text-center mt-4">
          <Link to="/" className="text-green-600 hover:underline">← Kembali ke daftar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">📖 Membaca: {book.title}</h1>
      <div className="aspect-video w-full rounded overflow-hidden shadow-md border">
        <iframe
          src={book.link}
          title={`Baca ${book.title}`}
          className="w-full h-[80vh] border-none"
          allowFullScreen
        />
      </div>
      <div className="text-center mt-6">
        <Link to={`/book/${book.id}`} className="text-blue-600 hover:underline">
          ← Kembali ke Detail Buku
        </Link>
      </div>
    </div>
  );
}

export default ReadBookPage;
