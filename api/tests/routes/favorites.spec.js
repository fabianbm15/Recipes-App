const request = require("supertest");
const app = require("../../index");

it("should reply the GET method with status code 300", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(300);
});
/*
const supertest = require("supertest");
const { postRecipes, getRecipes } = require("../../src/controllers/index");

const api = supertest()

describe("Recipes", () => {
  describe("Post recipe", () => {
    it("Must to post recipe correctly.", () => {
      const recipeData = {
        title: "Pollo",
        image:
          "https://img.freepik.com/foto-gratis/delicioso-pollo-mesa_144627-8758.jpg?w=740&t=st=1676474714~exp=1676475314~hmac=72ed3303d712a1c80e8fd5ab8f36e886cad98645dea98dceb4145e32b9b951f8",
        dishTypes: ["Lunch"],
        diets: [],
        summary: "",
        healthScore: 15,
        instructions: "",
      };

      const submit = async function () {
        await axios.post(`http://localhost:3001/recipes`, recipeData);
      };

      submit();

      const get = async function () {
        await axios.get(`http://localhost:3001/allrecipes`);
      };

      expect(get()).toEqual({
        title: "Pollo",
        image:
          "https://img.freepik.com/foto-gratis/delicioso-pollo-mesa_144627-8758.jpg?w=740&t=st=1676474714~exp=1676475314~hmac=72ed3303d712a1c80e8fd5ab8f36e886cad98645dea98dceb4145e32b9b951f8",
        dishTypes: ["Lunch"],
        diets: [],
        summary: "",
        healthScore: 15,
        instructions: "",
      });
    });
  });
});

*/
