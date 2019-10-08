var express = require ('express')
var router = express.Router()
const foods = require("../../../models").Food

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  return foods.findAll({attributes: ['id', 'name', 'calories']}).then(response => {
    res.status(200).send(response)
  })
})

module.exports = router;
