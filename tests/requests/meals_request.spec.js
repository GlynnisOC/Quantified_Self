var shell = require("shelljs");
var request = require("supertest");
var app = require('../../app');
const foods = require("../../models").Food;
const Meal = require("../../models").Meal;
const FoodMeal = require("../../models").FoodMeal;

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    });

  describe('Test GET /api/v1/meals path', () => {
    test('should return an index of meals with foods in meals', () => {
      let meal1 = Meal.create({name: "Breakfast", Food: [
        { name: "Banana", calories: 150 },
        { name: "Yogurt", calories: 550 },
        { name: "Apple", calories: 220 }
      ]}, {include: Food})

      let meal2 = Meal.create({name: "Snack", Food: [
        { name: "Peanut Butter", calories: 250 },
        { name: "Pretzels", calories: 175}
      ]}, {include: Food})
      return request(app).get("/api/v1/meals").then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
      })
    })
  })
});
