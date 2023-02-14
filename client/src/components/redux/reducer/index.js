import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  FILTER,
  ORDER_BY_ALPHA,
  ORDER_BY_HS,
} from "../actions/types";

const initialState = {
  myFavorites: [],
  myFavoritesOrigin: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_FAVORITES:
      return {
        ...state,
        myFavorites: [...state.myFavoritesOrigin, payload],
        myFavoritesOrigin: [...state.myFavoritesOrigin, payload],
      };
    case DELETE_FAVORITES:
      const filterMyFavorites = state.myFavorites.filter((recipe) => {
        return recipe.id !== payload;
      });
      return {
        ...state,
        myFavorites: filterMyFavorites,
        myFavoritesOrigin: filterMyFavorites,
      };
    case FILTER:
      if (payload === "Default") {
        return {
          ...state,
          myFavorites: [...state.myFavoritesOrigin],
        };
      } else {
        const filterCopy = [...state.myFavoritesOrigin];
        const filter = filterCopy.filter((recipe) => {
          return recipe.diets.includes(payload);
        });
        return {
          ...state,
          myFavorites: filter,
        };
      }
    case ORDER_BY_ALPHA:
      if (payload === "Default") {
        return {
          ...state,
          myFavorites: [...state.myFavoritesOrigin],
        };
      } else {
        const orderCopy = [...state.myFavoritesOrigin];
        let order = "";
        if (payload === "A-Z") {
          order = orderCopy.sort((a, b) => a.title.localeCompare(b.title));
        } else if (payload === "Z-A") {
          order = orderCopy.sort((a, b) => b.title.localeCompare(a.title));
        }
        return {
          ...state,
          myFavorites: order,
        };
      }
    case ORDER_BY_HS:
      if (payload === "Default") {
        return {
          ...state,
          myFavorites: [...state.myFavoritesOrigin],
        };
      } else {
        const orderCopy = [...state.myFavoritesOrigin];
        let order = "";
        if (payload === "Ascendente") {
          order = orderCopy.sort((a, b) => a.healthScore - b.healthScore);
        } else if (payload === "Descendente") {
          order = orderCopy.sort((a, b) => b.healthScore - a.healthScore);
        }
        return {
          ...state,
          myFavorites: order,
        };
      }
    default:
      return state;
  }
}
