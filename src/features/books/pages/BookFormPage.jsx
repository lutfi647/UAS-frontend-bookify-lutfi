// File: src/features/books/pages/BookFormPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function BookFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (id) {
      const books = JSON.parse(localStorage.getItem('books')) || [];
      const book = books.find((b) => b.id === id);
      if (book) {
        setTitle(book.title);
        setDescription(book.description);
        setImage(book.image || '');
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const books = JSON.parse(localStorage.getItem('books')) || [];

    const newBook = {
      id: id || Date.now().toString(),
      title,
      description,
      image: image || 'https://via.placeholder.com/150'
    };

    if (id) {
      const updatedBooks = books.map((b) => (b.id === id ? newBook : b));
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    } else {
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
    }

    navigate('/');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {id ? 'Edit Buku' : 'Tambah Buku Baru'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Masukkan judul buku"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
            placeholder="Masukkan deskripsi buku"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL Gambar Buku</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="https://contoh.com/gambar.jpg"
          />
        </div>
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-gray-600 hover:underline text-sm"
          >
            ← Batal dan kembali
          </Link>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookFormPage;