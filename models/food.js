'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {
      through: "FoodMeal",
      as: "meals",
      foreignKey: 'foodId',
      otherKey: 'mealId'
    })
  };
  return Food;
};
