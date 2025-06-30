import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t py-4 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Bookify Lutfi App
      </div>
    </footer>
  );
}

export default Footer;
