var express = require ('express')
var router = express.Router()
const meals = require("../../../models").Meal
const foods = require("../../../models").Food

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return meals.findAll({
    attributes: ['id', 'name'],
    include: 'foods'
  }).then(results => {
    res.status(200).send(results)
  })
  .catch(error => {
    res.status(404).send({message: "No meals exist"})
  })
});

router.post('/:meal_id/foods/:food_id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  meals.findOne({where: {id: req.params.meal_id}})
  .then(meal => {
    foods.findOne({where: {id: req.params.food_id}})
    .then(food => {
      meal.addFood(food)
      .then(response => {
        res.status(201).send({message: `Successfully added ${food.name} to ${meal.name}`})
      })
    })
    .catch(error => {
      res.status(404).send({message: "Food ID does not exist"})
    })
  })
  .catch(error => {
    res.status(404).send({message: "Meal ID does not exist"})
  })
})

module.exports = router;
