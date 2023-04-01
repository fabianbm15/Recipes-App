import axios from "axios";

import { ADD_FAVORITES, DELETE_FAVORITES, GET_RECIPES, SORT_RECIPES, SEARCH_RECIPES, GET_CREATED_RECIPES, DELETE_CREATED_RECIPES } from "./types";

const BACK = process.env.REACT_APP_BACK;

export const addFavorite = function (recipe) {
   return async function (dispatch) {
      try {
         const response = await axios.post(`${BACK}/fav`, recipe);
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
         await axios.delete(`${BACK}/fav/${id}`);
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
         const response = await axios.get(`${BACK}/allrecipes`);
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

export const sortRecipes = function (selectedFilter, selectedOrderAlpha, selectedOrderHs, searchTerm, favoritesPage, createdPage) {
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
         const response = await axios.get(`${BACK}/recipes?title=${title}`);
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
         const response = await axios.get(`${BACK}/createdrecipes/`);
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
         await axios.delete(`${BACK}/createdrecipes/${id}`);
         dispatch({
            type: DELETE_CREATED_RECIPES,
            payload: id,
         });
      } catch (error) {
         console.log(error);
      }
   };
};
