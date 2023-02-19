import {
  ADD_FAVORITES,
  DELETE_FAVORITES,
  GET_RECIPES,
  SORT_RECIPES,
  SEARCH_RECIPES,
  DELETE_CREATED_RECIPES,
  GET_CREATED_RECIPES,
} from "../actions/types";

const initialState = {
  myFavorites: [],
  myFavoritesOrigin: [],
  allRecipes: [],
  allRecipesOrigin: [],
  searchedRecipes: [],
  createdRecipes: [],
  createdRecipesOrigin: [],
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
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        allRecipesOrigin: payload,
      };
    case SORT_RECIPES:
      let allData = [];
      const {
        selectedFilter,
        selectedOrderAlpha,
        selectedOrderHs,
        favoritesPage,
        createdPage,
      } = payload;
      if (!payload.searchTerm && !favoritesPage && !createdPage) {
        allData = [...state.allRecipesOrigin];
      } else if (favoritesPage) {
        allData = [...state.myFavoritesOrigin];
      } else if (createdPage) {
        allData = [...state.createdRecipesOrigin];
      } else {
        allData = [...state.searchedRecipes];
      }

      let filteredData = allData;

      if (selectedFilter !== "Default") {
        filteredData = allData.filter((e) => {
          return e.diets.includes(selectedFilter);
        });
      }

      if (selectedOrderAlpha === "A-Z") {
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (selectedOrderAlpha === "Z-A") {
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (selectedOrderHs === "Ascendente") {
        filteredData.sort((a, b) => a.healthScore - b.healthScore);
      } else if (selectedOrderHs === "Descendente") {
        filteredData.sort((a, b) => b.healthScore - a.healthScore);
      }
      if (favoritesPage) {
        return {
          ...state,
          myFavorites: filteredData,
        };
      } else if (createdPage) {
        return {
          ...state,
          createdRecipes: filteredData,
        };
      } else {
        return {
          ...state,
          allRecipes: filteredData,
        };
      }

    case SEARCH_RECIPES:
      return {
        ...state,
        allRecipes: payload,
        searchedRecipes: payload,
      };

    case GET_CREATED_RECIPES:
      return {
        ...state,
        createdRecipes: payload,
        createdRecipesOrigin: payload,
      };

    case DELETE_CREATED_RECIPES:
      const filterCreatedRecipe = state.createdRecipes.filter((recipe) => {
        return recipe.id !== payload;
      });
      return {
        ...state,
        createdRecipes: filterCreatedRecipe,
        createdRecipesOrigin: filterCreatedRecipe,
      };
    default:
      return state;
  }
}
