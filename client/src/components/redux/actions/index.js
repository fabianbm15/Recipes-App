import axios from "axios";

import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  GET_RECIPES,
  SORT_RECIPES,
  SEARCH_RECIPES,
  GET_CREATED_RECIPES,
  DELETE_CREATED_RECIPES,
} from "./types";

export const addFavorite = function (recipe) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/fav`, recipe);
      const data = response.data;
      dispatch({
        type: ADD_FAVORITES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteFavorite = function (id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/fav/${id}`);
      dispatch({
        type: DELETE_FAVORITES,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRecipes = function () {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/allrecipes`);
      const data = response.data.data;
      dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortRecipes = function (
  selectedFilter,
  selectedOrderAlpha,
  selectedOrderHs,
  searchTerm,
  favoritesPage,
  createdPage
) {
  return {
    type: SORT_RECIPES,
    payload: {
      selectedFilter,
      selectedOrderAlpha,
      selectedOrderHs,
      searchTerm,
      favoritesPage,
      createdPage,
    },
  };
};

export const searchRecipes = function (title) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/recipes?title=${title}`
      );
      const data = response.data.data;
      dispatch({
        type: SEARCH_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCreatedRecipe = function () {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/createdrecipes/`);
      const data = response.data.data;
      dispatch({
        type: GET_CREATED_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCreatedRecipe = function (id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/createdrecipes/${id}`);
      dispatch({
        type: DELETE_CREATED_RECIPES,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
