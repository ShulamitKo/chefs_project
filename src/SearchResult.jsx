import React, { useState, useEffect } from 'react';
import OrderForm from './OrderForm';
import './SearchResult.css';
//import axios from 'axios';
//import { GET_DISHES } from './queries.graphql'; // הייבוא של השאילתה
import { useQuery, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// הגדרת Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:5022/graphql', // הנתיב הנכון ל-GraphQL
  cache: new InMemoryCache()
});

const SEARCH_CHEFS = gql`
  query SearchChefs($name: String, $kosher: Boolean, $gluten_free: Boolean, $free_delivery: Boolean, $price_range:String) {
    searchChefs(name: $name, kosher: $kosher, gluten_free: $gluten_free, free_delivery: $free_delivery, price_range:$price_range) {
      _id
      name
      cuisine
      rating
      price_range
      kosher
      gluten_free
      free_delivery
      location {
        type
        coordinates
      }
    }
  }
`;

// שאילתא ללקיחת כל השפים
const GET_ALL_CHEFS = gql`
  query GetAllChefs {
    allChefs {
      _id
      name
      cuisine
      rating
      price_range
      kosher
      gluten_free
      free_delivery
      location {
        type
        coordinates
      }
    }
  }
`;

const GET_CHEF_BY_NAME = gql`
  query GetChefByName($name: String!) {
    chefByName(name: $name) {
      _id
      name
      cuisine
      rating
      price_range
      kosher
      gluten_free
      free_delivery
      location {
        type
        coordinates
      }
    }
  }
`;

function SearchResult({ searchParams }) {


  const [chefs, setChefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 5;
  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = chefs.slice(indexOfFirstChef, indexOfLastChef);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);



  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };


  const handleOrderButtonClick = () => {
    setIsOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setIsOrderFormOpen(false);
  };

  // ביצוע שאילתא לקבלת כל השפים
  const { loading: loadingAllChefs, data: dataAllChefs, error: errorAllChefs } = useQuery(GET_ALL_CHEFS, {
    skip: !isInitialLoad
  });

  /*
  // ביצוע שאילתא לחיפוש שפים לפי שם
  const { loading: loadingChefByName, data: dataChefByName, error: errorChefByName } = useQuery(GET_CHEF_BY_NAME, {
    variables: { name: searchParams.searchTerm },
    skip: !searchParams || searchParams.searchTerm === ''
  });

  */

  const { loading, data, error } = useQuery(SEARCH_CHEFS, {
      variables: {
        name: searchParams?.searchTerm || "",
        kosher: searchParams?.filters?.kosher || null,
        gluten_free: searchParams?.filters?.gluten_free || null,
        free_delivery: searchParams?.filters?.free_delivery || null,
        price_range:searchParams?.filters.price_range||""
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
  if (errorAllChefs) return <p>Error: {errorAllChefs.message}</p>;
  if (error) return <p>Error: {error.message}</p>;


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
            <button onClick={() => handleOrderButtonClick()}>הזמן</button>
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
            <OrderForm onSubmit={handleCloseOrderForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
