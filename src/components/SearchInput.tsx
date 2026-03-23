'use client';

import { useState, useEffect } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Keep in sync if parent resets
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative">
      {/* Magnifying glass icon */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/40">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 border border-navy/20 rounded-lg text-sm text-navy placeholder:text-navy/40 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all duration-200"
      />
    </div>
  );
}
