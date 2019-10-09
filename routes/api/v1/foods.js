var express = require ('express')
var router = express.Router()
const foods = require("../../../models").Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.findAll({attributes: ['id', 'name', 'calories']}).then(response => {
    res.status(200).send(response)
  })
})

router.delete("/:id", function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  foods.destroy({
    where: {id: req.params.id}
  })
  .then(response => {
    res.status(204).send()
  })
  .catch(error => {
    res.status(404).send({message: "Food cannot be found"})
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

router.patch('/:id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  foods.update({
    name: req.body.name,
    calories: req.body.calories
  }, {
    where: { id: req.params.id },
    returning: true,
    plain: true
  })
  .then(results => {
    item = {
      id: results[1].dataValues.id,
      name: results[1].dataValues.name,
      calories: results[1].dataValues.calories
    }
    res.status(200).send(item)
  })
  .catch(error => {
    res.status(404).send({message: "Food ID not found"})
  })
})

module.exports = router;
