const express = require("express");
const router = express.Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getRecipesName,
  getRecipesId,
  getRecipes,
  postRecipes,
  getDiets,
  getFav,
  postFav,
  deleteFavId,
  downloadRecipes,
} = require("./../controllers/index");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", getRecipesName);
router.get("/recipes/:id", getRecipesId);
router.get("/allrecipes", getRecipes);
router.post("/recipes", postRecipes);
router.get("/diets", getDiets);

// Favorites
router.get("/fav", getFav);
router.post("/fav", postFav);
router.delete("/fav/:id", deleteFavId);

// Download recipes
router.get("/downloadrecipes", downloadRecipes);

module.exports = router;
