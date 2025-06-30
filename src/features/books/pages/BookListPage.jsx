// File: src/features/books/pages/BookListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    if (savedBooks.length === 0) {
      const dummyBooks = [
        {
          id: '1',
          title: 'Atomic Habits',
          description: 'Buku pengembangan diri tentang bagaimana kebiasaan kecil membentuk hidup kita.',
          image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L.jpg'
        },
        {
          id: '2',
          title: 'Sapiens',
          description: 'Sejarah singkat umat manusia dari era purba hingga modern.',
          image: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg'
        },
        {
          id: '3',
          title: 'Deep Work',
          description: 'Panduan untuk fokus mendalam dan produktivitas dalam era distraksi digital.',
          image: 'https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg'
        },
      ];
      localStorage.setItem('books', JSON.stringify(dummyBooks));
      setBooks(dummyBooks);
    } else {
      setBooks(savedBooks);
    }
  }, []);

  const fetchFromAPI = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=pahlawan+indonesia');
      const results = response.data.items.map((item, index) => ({
        id: 'api-' + index,
        title: item.volumeInfo.title,
        description: item.volumeInfo.description || 'Deskripsi tidak tersedia',
        image: item.volumeInfo.imageLinks?.thumbnail || ''
      }));
      localStorage.setItem('books', JSON.stringify(results));
      setBooks(results);
    } catch (error) {
      console.error('Gagal ambil data dari API', error);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (!confirmDelete) return;

    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const toggleFavorite = (id) => {
    let updated = [...favorites];
    if (favorites.includes(id)) {
      updated = updated.filter((fid) => fid !== id);
    } else {
      updated.push(id);
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-900 dark:text-white">
      <div className="text-center py-12 bg-gradient-to-r from-green-100 to-white dark:from-gray-800 dark:to-gray-900 mb-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-300">📘Yu Baca Buku Di Bookify by Lutfi</h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
         Saatnya menjelajah dunia lewat buku – baca di sini! 🌍📖✨
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">📚 Daftar Buku</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari judul buku..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            onClick={() => navigate('/add')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Tambah
          </button>
          <button
            onClick={fetchFromAPI}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📡 Ambil dari API
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Menampilkan {filteredBooks.length} dari {books.length} buku
      </p>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada buku ditemukan.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <button
                onClick={() => toggleFavorite(book.id)}
                className="absolute top-2 right-2 text-xl"
                title="Tandai sebagai favorit"
              >
                {favorites.includes(book.id) ? '❤️' : '🤍'}
              </button>
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1 truncate">{book.title}</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-3 line-clamp-3 text-sm">{book.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/book/${book.id}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Detail
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit/${book.id}`)}
                    className="text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookListPage;