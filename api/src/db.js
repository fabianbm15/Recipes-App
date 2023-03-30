require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const { Sequelize } = require("sequelize");
const modelRecipe = require("./models/Recipe");
const modelDiet = require("./models/Diet");
const modelRecipesExt = require("./models/RecipesExt");

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
   logging: false,
});

// Invocar los models
modelRecipe(db);
modelDiet(db);
modelRecipesExt(db);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Recipes, Diets } = db.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipes.belongsToMany(Diets, { through: "RecipeDiets", timestamps: false });
Diets.belongsToMany(Recipes, { through: "RecipeDiets", timestamps: false });

module.exports = {
   ...db.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   db, // para importart la conexión { conn } = require('./db.js');
};
