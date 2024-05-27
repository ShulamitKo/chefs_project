// SearchBar.js

import React, { useState ,useCallback} from 'react';
import './SearchBar.css'; 



function SearchBar({ onSearch }) {

  const [searchTerm, setSearchTerm] = useState('');

  const [filters, setFilters] = useState({
    kosher: false,
    gluten_free: false,
    free_delivery: false,
    price_range: "", 
    cuisine: '' 

  });
  const [sortBy, setSortBy] = useState('rating'); 

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

   const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handlePriceRangeChange = (e) => {
    const price_range = e.target.value;
    setFilters({
      ...filters,
      price_range,
    });
  };

   const handleCuisineChange = (e) => {
    const cuisine = e.target.value;
    setFilters({
      ...filters,
      cuisine,
    });
  };


  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      filters: {
        kosher: filters.kosher,
        gluten_free: filters.gluten_free,
        free_delivery: filters.free_delivery,
        price_range: filters.price_range, 
        cuisine:filters.cuisine,
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
        className="search-input"
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
      <label className="filter-label">טווח מחירים:</label>
      <select value={filters.price_range} onChange={handlePriceRangeChange} className="filter-select">
        <option value="">כל המחירים</option>
        <option value="50-100">50 - 100 ש"ח</option>
        <option value="100-150">100 - 150 ש"ח</option>
        <option value="150-200">150 - 200 ש"ח</option>
        <option value="200-300">200 - 300 ש"ח</option>
        <option value="300-500">300 - 500 ש"ח</option>
      </select>

      <label className="filter-label">סוג מטבח:</label>
      <select value={filters.cuisine} onChange={handleCuisineChange} className="filter-select">
        <option value="">בחר סוג מטבח</option>
        <option value="איטלקי">איטלקי</option>
        <option value="סיני">סיני</option>
        <option value="יפני">יפני</option>
        <option value="אסייאתי">אסייאתי</option>
      </select>

      <label className="filter-label">מיון לפי:</label>
      <select value={sortBy} onChange={handleSortByChange} className="filter-select">
        <option value="rating">דירוג</option>
        <option value="popularity">פופולריות</option>
        <option value="preparationTime">זמן הכנה </option>
      </select>

      <button type="submit" className="search-button">חפש</button>
    </form>
  );
}


export default SearchBar;


