// File: src/pages/CategoryPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const dummyCategories = [
  { name: 'Pengembangan Diri', count: 3 },
  { name: 'Sejarah', count: 2 },
  { name: 'Teknologi', count: 2 },
  { name: 'Fiksi', count: 4 },
  { name: 'Ekonomi', count: 1 },
];

function CategoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 shadow rounded">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-6">📂 Kategori Buku</h1>
      <ul className="space-y-4">
        {dummyCategories.map((category, idx) => (
          <li key={idx} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded hover:bg-green-50 dark:hover:bg-green-900 transition">
            <span className="text-lg text-gray-800 dark:text-white">{category.name}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{category.count} buku</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-6">
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">← Kembali ke Beranda</Link>
      </div>
    </div>
  );
}

export default CategoryPage;
