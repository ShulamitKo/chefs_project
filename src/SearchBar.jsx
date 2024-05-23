// SearchBar.js

import React, { useState } from 'react';
import './SearchBar.css'; // ייבוא קובץ ה-CSS של SearchBar



function SearchBar({ onSearch }) {
  // משתנה מצב עבור שדה החיפוש
  const [searchTerm, setSearchTerm] = useState('');
  // משתנה מצב עבור המסננים
  const [filters, setFilters] = useState({
    kosher: false,
    gluten_free: false,
    free_delivery: false,
    priceRange: [50, 500], // ערכי הטווח המשתנים עכשיו
  });
  // משתנה מצב עבור סוג המיון
  const [sortBy, setSortBy] = useState('rating'); // הפרמטר המשתנה לסוג המיון

  // פונקציה המתבצעת כאשר משנים את ערך שדה החיפוש
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // פונקציה המתבצעת כאשר משנים ערך אחד מהסינונים
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  // פונקציה המתבצעת כאשר משנים את ערך שדה הטווח המחירים
  const handlePriceRangeChange = (e) => {
    const priceRange = e.target.value.split(',').map(Number);
    setFilters({
      ...filters,
      priceRange,
    });
  };

  // פונקציה המתבצעת כאשר משנים את סוג המיון
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  // פונקציה בעת לחיצה על חיפוש
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      filters: {
        kosher: filters.kosher,
        gluten_free: filters.gluten_free,
        free_delivery: filters.free_delivery,
      }, sortBy
    });
  };



  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="חפשו בשלן..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="kosher"
            checked={filters.kosher}
            onChange={handleCheckboxChange}
          />
          כשרות
        </label>
        <label>
          <input
            type="checkbox"
            name="gluten_free"
            checked={filters.gluten_free}
            onChange={handleCheckboxChange}
          />
          ללא גלוטן
        </label>
        <label>
          <input
            type="checkbox"
            name="free_delivery"
            checked={filters.free_delivery}
            onChange={handleCheckboxChange}
          />
          משלוחים חינם
        </label>
      </div>
      <input
        type="range"
        min="50"
        max="500"
        step="10"
        value={filters.priceRange.join(',')}
        onChange={handlePriceRangeChange}
      />
      <output>{filters.priceRange.join(' ש"ח - ')} ש"ח</output>

      <select value={sortBy} onChange={handleSortByChange}>
        <option value="rating">דירוג</option>
        <option value="distance">קרבה גאוגרפית</option>
        <option value="popularity">פופולריות</option>
      </select>

      <button type="submit" >חפש</button>
    </form>
  );
}


export default SearchBar;


