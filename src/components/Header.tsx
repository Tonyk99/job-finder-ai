import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      {/* Logo/Brand Name */}
      <div className="flex items-center space-x-2">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-bold text-white">Job Finder AI</span>
      </div>

      {/* Navigation Links and Login Button */}
      <nav className="flex items-center space-x-6">
        <a className="text-brand-text-subtle hover:text-white transition-colors" href="#">
          How it works
        </a>
        <a className="text-brand-text-subtle hover:text-white transition-colors" href="#">
          Pricing
        </a>
        <button className="bg-gray-200 text-gray-900 font-semibold px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors">
          Login
        </button>
      </nav>
    </header>
  );
}
