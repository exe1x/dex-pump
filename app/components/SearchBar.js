import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-4 py-2 w-96 border border-gray-400 rounded-md text-black"
        placeholder="Enter contract address"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}
