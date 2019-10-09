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
  }).then(response => {
    res.status(201).send({message: `${req.body.name} was successfully created`})
  }).catch(error => {
    res.status(400).send({message: "Name and calories are required"})
  })
})

router.delete("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  foods.destroy({
    where: {id: req.params.id},
  })
  .then(response => {
    console.log(response.body, 'here is the body')
    if (response) {
      res.status(204)
    } else {
      res.status(404).send({message: "Food cannot be found"})
    }
  })
})

module.exports = router;
