var express = require ('express')
var router = express.Router()
const meals = require("../../../models").Meal

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

module.exports = router;
