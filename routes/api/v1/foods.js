var express = require ('express')
var router = express.Router()
const foods = require("../../../models").Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.findAll({attributes: ['id', 'name', 'calories']}).then(response => {
    res.status(200).send(response)
  })
})

router.get("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'name', 'calories']
  })
  .then(food => {
    if (food) {
      res.status(200).send(food)
    } else {
      res.status(404).send({message: "Food does not exist"})
    }
  })
})

router.post('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.create({
    name: req.body.name,
    calories: req.body.calories
  }).then(food => {
    res.status(201).send(food)
  }).catch(error => {
    res.status(400).send({message: "Name and calories are required"})
  })
})

module.exports = router;
