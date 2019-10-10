var express = require ('express')
var router = express.Router()
const meals = require("../../../models").Meal
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
    console.log(error)
  })
});

router.get("/:id/foods", function(req, res, next) {
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
    res.status(500).send({message: "Error"})
  })
})

module.exports = router;
