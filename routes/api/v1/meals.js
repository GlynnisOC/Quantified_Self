var express = require ('express')
var router = express.Router()
const meals = require("../../../models").Meal

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return meals.findAll({
    attributes: ['id', 'name'],
    include: [{
      model: Food,
      as: 'foods',
      required: false,
      attributes: ['id', 'name', 'calories'],
      through: {
        model: FoodMeal,
        as: 'foodMeals'
      }
    }]
  }).then(response => {
    // console.log(response.body)
    res.status(200).send(response)
  })
});

module.exports = router;
