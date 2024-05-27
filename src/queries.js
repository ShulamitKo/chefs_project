import { gql } from '@apollo/client';

export const SEARCH_CHEFS = gql`
  query SearchChefs($name: String, $kosher: Boolean, $gluten_free: Boolean, $free_delivery: Boolean, $price_range:String, $cuisine:String, $sortBy:String) {
    searchChefs(name: $name, kosher: $kosher, gluten_free: $gluten_free, free_delivery: $free_delivery, price_range:$price_range, cuisine:$cuisine, sortBy:$sortBy) {
      _id
      name
      cuisine
      rating
      price_range
      kosher
      gluten_free
      free_delivery
      popularity
      preparationTime
    }
  }
`;

export const GET_ALL_CHEFS = gql`
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
      popularity
      preparationTime
    }
  }
`;


