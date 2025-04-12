import React, { useState } from 'react';

function CitySearch({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="city-search">
      <input
        type="text"
        placeholder="Enter city or town"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default CitySearch;