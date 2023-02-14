import axios from "axios";

import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  FILTER,
  ORDER_BY_ALPHA,
  ORDER_BY_HS,
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

export const filterCards = function (status) {
  return {
    type: FILTER,
    payload: status,
  };
};

export const orderCardsAlpha = function (id) {
  return {
    type: ORDER_BY_ALPHA,
    payload: id,
  };
};

export const orderCardsHs = function (id) {
  return {
    type: ORDER_BY_HS,
    payload: id,
  };
};
