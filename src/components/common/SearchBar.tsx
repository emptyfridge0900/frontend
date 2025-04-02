import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search by title or author...',
}) => {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 border border-gray-300 rounded text-base transition-border duration-200 focus:border-blue-600 focus:shadow-[0_0_5px_rgba(0,102,204,0.2)]"
      />
    </div>
  );
};

export default SearchBar;