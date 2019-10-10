var express = require ('express')
var router = express.Router()
const meals = require("../../../models").Meal
const foods = require("../../../models").Food
const models = require("../../../models")

router.get("/", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return meals.findAll({
    attributes: ['id', 'name'],
    include: [{
      model: models.Food,
      as: 'foods',
      attributes: ['id', 'name', 'calories'],
      through: {
        attributes: []
      }
    }]
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

router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return meals.findByPk((req.params.id), {
    attributes: ['id', 'name'],
    include: [{
      model: models.Food,
      as: 'foods',
      attributes: ['id', 'name', 'calories'],
      through: {
        attributes: []
      }
    }]
  }).then(results => {
    if (results) {
      res.status(200).send(results)
    } else {
      res.status(404).send({message: "Meal cannot be found"})
    }
  })
  .catch(error => {
    res.status(500).send({error})
  })
})

module.exports = router;
