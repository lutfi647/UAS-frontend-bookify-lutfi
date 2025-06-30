import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50 transition-all">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-700 dark:text-green-300">
          📘 Bookify by Lutfi
        </Link>
        <div className="space-x-6 flex items-center text-lg">
          <Link
            to="/"
            className={`px-3 py-1 rounded-md transition duration-200 ease-in-out hover:scale-105 hover:underline font-medium ${
              location.pathname === '/' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/add"
            className={`px-3 py-1 rounded-md transition duration-200 ease-in-out hover:scale-105 hover:underline font-medium ${
              location.pathname === '/add' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Tambah Buku
          </Link>
          <Link
            to="/categories"
            className={`px-3 py-1 rounded-md transition duration-200 ease-in-out hover:scale-105 hover:underline font-medium ${
              location.pathname === '/categories' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Kategori
          </Link>
          <Link
            to="/favorites"
            className={`px-3 py-1 rounded-md transition duration-200 ease-in-out hover:scale-105 hover:underline font-medium ${
              location.pathname === '/favorites' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Favorit
          </Link>
          <button
            onClick={() => setDark(!dark)}
            className="text-2xl px-2 transition-transform duration-200 hover:scale-125"
            title="Ganti mode terang/gelap"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;