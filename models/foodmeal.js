'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodMeal = sequelize.define('FoodMeal', {
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {});
  FoodMeal.associate = function(models) {
    // associations can be defined here
  };
  return FoodMeal;
};