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
    price_range: "", // ערך ברירת המחדל לטווח המחירים כמחרוזת
    cuisine: '' // הוספת משתנה למטבח

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
    const price_range = e.target.value;
    setFilters({
      ...filters,
      price_range,
    });
  };

  // פונקציה המתבצעת כאשר משנים את סוג המיון
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  // פונקציה המתבצעת כאשר משנים את סוג המטבח
  const handleCuisineChange = (e) => {
    const cuisine = e.target.value;
    setFilters({
      ...filters,
      cuisine,
    });
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
        price_range: filters.price_range, // כולל את ערך הטווח המחירים כמחרוזת
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
      <select value={filters.price_range} onChange={handlePriceRangeChange}>
        <option value="">כל המחירים</option>
        <option value="50-100">50 - 100 ש"ח</option>
        <option value="100-150">100 - 150 ש"ח</option>
        <option value="150-200">150 - 200 ש"ח</option>
        <option value="200-300">200 - 300 ש"ח</option>
        <option value="300-500">300 - 500 ש"ח</option>
      </select>

      <select value={filters.cuisine} onChange={handleCuisineChange}>
        <option value="">בחר סוג מטבח</option>
        <option value="איטלקי">איטלקי</option>
        <option value="סיני">סיני</option>
        <option value="יפני">יפני</option>
        <option value="אסייאתי">אסייאתי</option>
        {/* הוסף סוגי מטבח נוספים כאן לפי הצורך */}
      </select>

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


