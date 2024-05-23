// App.js

//import React from 'react';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar'; // ייבוא קומפוננטה החדשה
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SearchResult from './SearchResult';

function App() {

  const [searchParams, setSearchParams] = useState(null);
//  const initialSearchParams = { searchTerm: '', filters: {}, sortBy: '' };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ברוכים הבאים לאפליקציית החיפוש שלנו!</h1>
        <p>מצאו בשלן מושלם עבורכם ותהנו מהזמנה מהירה וקלה.</p>
      </header>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} /> {/* הוספת קומפוננטה החדשה לחיפוש */}
      </div>
      <div className="results">
        {/* כאן יופיעו תוצאות החיפוש */}
        {/* תוכלי להוסיף קומפוננטות שמציגות את התוצאות */}
        <SearchResult searchParams={searchParams} />
      </div>
    </div>
  );
}

export default App;
