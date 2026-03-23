'use client';

interface FilterBarProps {
  options: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
}

export default function FilterBar({ options, activeFilter, onChange }: FilterBarProps) {
  const allOptions = ['All', ...options];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {allOptions.map((option) => {
        const isActive = option === activeFilter || (option === 'All' && activeFilter === '');

        return (
          <button
            key={option}
            onClick={() => onChange(option === 'All' ? '' : option)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-navy text-white shadow-sm'
                : 'border border-navy/20 text-navy/70 hover:border-navy hover:text-navy'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
