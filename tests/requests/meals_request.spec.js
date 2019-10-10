var shell = require("shelljs");
var request = require("supertest");
var app = require('../../app');
const foods = require("../../models").Food;
const meals = require("../../models").Meal;

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    });

  describe('Test GET /api/v1/meals path', () => {
    test('return all meals and associated foods', async () => {
      items = [
        await foods.create({name: "Chocolate", calories: 250}),
        await foods.create({name: "Cheetos", calories: 200}),
        await foods.create({name: "Cheese", calories: 300})
      ]
      return meals.create({name: "Dessert"}).then(async meal => {
        await meal.addFoods(items)
        return request(app).get('/api/v1/meals').then(response => {
          expect(response.status).toBe(200)
          expect(response.body[0].foods[0].name).toBe("Chocolate")
          expect(response.body[0].foods[0].calories).toBe(250)
          expect(response.body[0].foods[1].name).toBe("Cheetos")
          expect(response.body[0].foods[1].calories).toBe(200)
          expect(response.body[0].foods[2].name).toBe("Cheese")
          expect(response.body[0].foods[2].calories).toBe(300)
        })
      })
    })
  });


  describe('Test GET /api/v1/meals/:meal_id/foods', () => {
    test('should return all foods associated with a specific meal id', async () => {
      items = [
        await foods.create({name: "Chocolate", calories: 250}),
        await foods.create({name: "Cheetos", calories: 200}),
        await foods.create({name: "Cheese", calories: 300})
      ]
      return meals.create({name: "Snack"}).then(async meal1 => {
        await meal1.addFoods(items)
        return request(app).get(`/api/v1/meals/${meal1.id}/foods`).then(response => {
          expect(response.status).toBe(200)
          expect(response.body.foods[0].name).toBe("Chocolate")
          expect(response.body.foods[0].calories).toBe(250)
          expect(response.body.foods[1].name).toBe("Cheetos")
          expect(response.body.foods[1].calories).toBe(200)
          expect(response.body.foods[2].name).toBe("Cheese")
          expect(response.body.foods[2].calories).toBe(300)
        })
      })
    })
  });
});
