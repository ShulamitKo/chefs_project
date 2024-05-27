// App.js

import './App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar'; 
import SearchResult from './SearchResult';


function App() {

  const [searchParams, setSearchParams] = useState(null);

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
        <SearchBar onSearch={handleSearch} /> 
      </div>
      <div className="results">
        <SearchResult searchParams={searchParams} />
      </div>
    </div>
  );
}

export default App;
