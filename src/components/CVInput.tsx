'use client';

import React, { useState } from 'react';

interface CVInputProps {
  onSubmit: (cvText: string) => void;
}

export default function CVInput({ onSubmit }: CVInputProps) {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // For PDF files, you'll need to parse them
    // Install: npm install pdfjs-dist
    // For now, we'll just handle text files
    if (file.type === 'text/plain') {
      const text = await file.text();
      setCvText(text);
    } else if (file.type === 'application/pdf') {
      // TODO: Implement PDF parsing
      // You can use pdfjs-dist or send to backend for parsing
      alert('PDF parsing coming soon! For now, please paste your CV text.');
    }
  };

  const handleSubmit = () => {
    if (cvText.trim()) {
      onSubmit(cvText);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      if (file.type === 'text/plain') {
        const text = await file.text();
        setCvText(text);
      }
    }
  };

  return (
    <div className="mt-8">
      <div
        className="relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <textarea
          className="w-full h-32 p-4 bg-brand-card border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition border-gray-600"
          placeholder="Paste your CV here or drag & drop a file..."
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
        />

        {fileName && (
          <div className="mt-2 text-sm text-brand-teal">
            File loaded: {fileName}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-block px-6 py-2 bg-brand-card border border-brand-border text-white rounded-lg hover:bg-gray-800 transition">
            Upload File
          </span>
        </label>

        <button
          onClick={handleSubmit}
          disabled={!cvText.trim()}
          className="px-10 py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold rounded-lg hover-effect disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Find Jobs For Me
        </button>
      </div>

      <p className="mt-4 text-sm text-brand-text-subtle">
        No signup required • Free for first 3 searches
      </p>
    </div>
  );
}
