const axios = require("axios");
const Sequelize = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipes, Diets, RecipesExts } = require("../db");
const { v4: uuidv4 } = require("uuid");

var fav = [];

const getRecipesName = async function (req, res) {
  try {
    const { title } = req.query;
    let data = [];
    let recipes = [];

    data = await Recipes.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${title}%`,
        },
      },
    });

    if (data.length) {
      data.forEach(async (recipe) => {
        const diets = await recipe.getDiets();
        recipes.push({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          dishTypes: recipe.dishTypes,
          diets: diets.map((diet) => diet.name),
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          instructions: recipe.instructions,
        });
      });
    }

    if (!recipes.length) {
      data = await RecipesExts.findAll({
        where: {
          title: {
            [Sequelize.Op.iLike]: `%${title}%`,
          },
        },
      });
      if (data.length) {
        data.forEach((recipe) => {
          recipes.push({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            dishTypes: recipe.dishTypes,
            diets: recipe.diets,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            instructions: recipe.instructions,
          });
        });
      }
    }

    if (!recipes.length) {
      return res.status(200).json({
        message: "No se encontraron recetas con este nombre.",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Recetas encontradas con éxito.",
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al buscar las recetas.",
      error: error.message,
    });
  }
};

const getRecipesId = async function (req, res) {
  try {
    const { id } = req.params;
    // const API_URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    let data = {};
    let recipe = {};

    data = await Recipes.findByPk(id);
    console.log(data);
    if (data) {
      const diets = await data.getDiets();
      console.log(data);
      recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        dishTypes: data.dishTypes,
        diets: diets.map((diet) => diet.name),
        summary: data.summary,
        healthScore: data.healthScore,
        instructions: data.instructions,
      };
    } else {
      const data = await RecipesExts.findByPk(id);
      if (data) {
        recipe = {
          id: data.id,
          title: data.title,
          image: data.image,
          dishTypes: data.dishTypes,
          diets: data.diets,
          summary: data.summary,
          healthScore: data.healthScore,
          instructions: data.instructions,
        };
      } else {
        return res.status(200).json({
          message: "No existen recetas con este id.",
          data: [],
        });
      }
    }

    return res.status(200).json({
      message: "Detalle de receta obtenido con éxito.",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al obtener el detalle de la receta.",
      error: error.message,
    });
  }
};

const getRecipes = async function (req, res) {
  try {
    let localRecipes = await Recipes.findAll();
    let apiRecipes = await RecipesExts.findAll();

    // Aquí se agrega la información de las dietas solo a las localRecipes
    localRecipes = await Promise.all(
      localRecipes.map(async (recipe) => {
        const diets = await recipe.getDiets();
        return {
          ...recipe.toJSON(),
          diets: diets.map((diet) => diet.name),
        };
      })
    );

    return res.status(200).json({
      message: "Recetas obtenidas con éxito.",
      data: [...localRecipes, ...apiRecipes],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al obtener las recetas.",
      error: error.message,
    });
  }
};

const getDiets = async function (req, res) {
  try {
    const dietsApiExt = [
      "vegetarian",
      "gluten free",
      "dairy free",
      "lacto ovo vegetarian",
      "vegan",
      "paleolithic",
      "primal",
      "whole 30",
      "pescatarian",
      "ketogenic",
      "fodmap friendly",
    ];
    const diets = await Diets.findAll();
    // console.log(diets.length);

    if (!diets.length) {
      return res.status(200).json({
        message: "Dietas encontradas con éxito.",
        data: dietsApiExt,
      });
    }

    return res.status(200).json({
      message: "Dietas encontradas con éxito.",
      data: diets,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al buscar las dietas de las recetas.",
      error: error.message,
    });
  }
};

const postRecipes = async (req, res) => {
  try {
    const {
      id,
      title,
      image,
      dishTypes,
      diets,
      summary,
      healthScore,
      instructions,
    } = req.body;

    console.log(title);

    if (
      !title ||
      !image ||
      !dishTypes ||
      !summary ||
      !healthScore ||
      !instructions
    ) {
      return res.status(200).json({
        message: "Faltan datos para crear la receta.",
        data: [],
      });
    }

    const recipe = await Recipes.create({
      id,
      title,
      image,
      dishTypes,
      summary,
      healthScore,
      instructions,
    });

    for (const dietName of diets) {
      const [diet, created] = await Diets.findOrCreate({
        where: { name: dietName },
      });
      await recipe.addDiet(diet);
    }

    return res.status(200).json({
      message: "Receta creada con éxito.",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al crear la receta.",
      error: error.message,
    });
  }
};

const downloadRecipes = async (req, res) => {
  try {
    let recipe = {};
    for (let i = 360; i <= 490; i++) {
      const API_URL = `https://api.spoonacular.com/recipes/${i}/information?apiKey=${API_KEY}`;

      try {
        const response = await axios(API_URL);
        const data = response.data;

        recipe = await RecipesExts.create({
          id: uuidv4(),
          title: data.title,
          image: data.image,
          dishTypes: data.dishTypes,
          diets: data.diets,
          summary: data.summary ? data.summary.replace(/<[^>]+>/g, "") : null,
          healthScore: data.healthScore,
          instructions: data.instructions
            ? data.instructions.replace(/<[^>]+>/g, "")
            : null,
        });
      } catch (error) {
        console.error(error);
        continue;
      }
    }

    return res.status(200).json({
      message: "Recetas descargadas con éxito.",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al descargar las recetas.",
      error: error.message,
    });
  }
};

const getFav = async (req, res) => {
  res.status(200).end(JSON.stringify(fav));
};

const postFav = async (req, res) => {
  const favorite = req.body;
  fav.push(favorite);
  res.status(200).end(JSON.stringify(favorite));
};

const deleteFavId = function (req, res) {
  const { id } = req.params;
  let recipe = {};

  recipe = fav.find((e) => e.id === String(id));
  if (recipe) {
    fav = fav.filter((e) => e.id !== String(id));
  }

  res.status(200).end(JSON.stringify(fav));
};

const deleteRecipe = function (req, res) {
  const { id } = req.params;
  let recipe = {};

  if (!Number(id)) {
    recipe = fav.find((e) => e.id === String(id));
    if (recipe) {
      fav = fav.filter((e) => e.id !== String(id));
    }
  } else {
    recipe = fav.find((e) => e.id === Number(id));
    if (recipe) {
      fav = fav.filter((e) => e.id !== Number(id));
    }
  }
  res.status(200).end(JSON.stringify(fav));
};

const getCreatedRecipes = async function (req, res) {
  try {
    let localRecipes = await Recipes.findAll();

    localRecipes = await Promise.all(
      localRecipes.map(async (recipe) => {
        const diets = await recipe.getDiets();
        return {
          ...recipe.toJSON(),
          diets: diets.map((diet) => diet.name),
        };
      })
    );

    return res.status(200).json({
      message: "Recetas obtenidas con éxito.",
      data: localRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ha ocurrido un error al obtener las recetas.",
      data: error,
    });
  }
};

const deleteCreatedRecipesId = async function (req, res) {
  try {
    const { id } = req.params; // obtén el identificador de los parámetros de la solicitud

    data = await Recipes.findByPk(id);
    if (data) {
      await Recipes.destroy({ where: { id } }); // elimina la receta con el identificador especificado
    } else {
      return res.status(200).json({
        message: "No hay recetas con este id.",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Receta eliminaca con éxito.",
      data: [],
    });
  } catch (error) {
    return res.status(200).json({
      message: "Ha ocurrido un error al intentar eliminar la receta.",
      data: error,
    });
  }
};

module.exports = {
  getRecipesName,
  getRecipesId,
  getRecipes,
  postRecipes,
  getDiets,
  getFav,
  postFav,
  deleteFavId,
  downloadRecipes,
  getCreatedRecipes,
  deleteCreatedRecipesId,
};

/*

[ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

[ ] POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación 
de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.
[ ] GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos 
con los tipos de datos indicados por spoonacular acá

*/
