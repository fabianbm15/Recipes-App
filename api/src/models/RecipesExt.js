const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "RecipesExts",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      diets: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      summary: {
        type: DataTypes.TEXT,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
