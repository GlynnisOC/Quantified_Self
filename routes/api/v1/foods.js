var express = require ('express')
var router = express.Router()
const foods = require("../../../models").Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.findAll({attributes: ['id', 'name', 'calories']}).then(response => {
    res.status(200).send(response)
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

module.exports = router;
