// SearchResult.js


import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import OrderForm from './OrderForm';
import './SearchResult.css';
import { SEARCH_CHEFS, GET_ALL_CHEFS } from './queries';





function SearchResult({ searchParams }) {


  const [chefs, setChefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 5;
  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedChef, setSelectedChef] = useState(null); 
  const [isInitialLoad, setIsInitialLoad] = useState(true);


  const handleOrderButtonClick = useCallback((chef) => {
    setSelectedChef(chef);
    setIsOrderFormOpen(true);
  }, []);

  const handleCloseOrderForm = useCallback(() => {
    setIsOrderFormOpen(false);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => prevPage - 1);
  }, []);


  const { loading: loadingAllChefs, data: dataAllChefs, error: errorAllChefs } = useQuery(GET_ALL_CHEFS, {
    skip: !isInitialLoad
  });

  const { loading, data, error } = useQuery(SEARCH_CHEFS, {
    variables: {
      name: searchParams?.searchTerm || "",
      kosher: searchParams?.filters?.kosher || null,
      gluten_free: searchParams?.filters?.gluten_free || null,
      free_delivery: searchParams?.filters?.free_delivery || null,
      price_range: searchParams?.filters.price_range || "",
      cuisine: searchParams?.filters.cuisine || "",
      sortBy: searchParams?.sortBy || "rating"
    },
    skip: isInitialLoad || !searchParams
  });

  useEffect(() => {
    if (isInitialLoad && dataAllChefs) {
      setChefs(dataAllChefs.allChefs);
      setIsInitialLoad(false);
    } else if (searchParams && data) {
      setChefs(data.searchChefs);
    }
  }, [dataAllChefs, data, isInitialLoad, searchParams]);



  if (loadingAllChefs || loading) return <p>Loading...</p>;
  if (errorAllChefs) return <p>התרחשה שגיאה בטעינת השפים. אנא נסו שוב מאוחר יותר.</p>;
  if (error) return <p>התרחשה שגיאה במהלך החיפוש. אנא נסו שוב מאוחר יותר.</p>;

  


  return (
    <div className="search-results">
      {currentChefs.map((chef, index) => (
        <div key={index} className="chef-card">
          <img src={chef.image} alt={chef.name} />
          <div className="chef-details">
            <h2>{chef.name}</h2>
            <p>{chef.cuisine}</p>
            <p>דירוג: {chef.rating}</p>
            <p>טווח מחירים: {chef.price_range} ש"ח</p>
            <p>פופלריות: {chef.popularity}</p>
            <p>זמן הכנה: {chef.preparationTime}</p>

            <button onClick={() => handleOrderButtonClick(chef)}>הזמן</button>
          </div>
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>הקודם</button>
        <button onClick={handleNextPage} disabled={indexOfLastChef >= chefs.length}>הבא</button>
      </div>
      {isOrderFormOpen && (
        <div className="overlay">
          <div className="order-form-container">
            <span className="close-btn" onClick={handleCloseOrderForm}>×</span>
            <OrderForm chefId={selectedChef._id} onSubmit={handleCloseOrderForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
