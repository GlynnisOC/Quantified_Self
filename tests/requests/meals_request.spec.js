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
  })

  describe('Test POST /api/v1/meals/:meal_id/foods/:id', () => {
    test('adds the food with :id to the meal with :meal_id', async () => {
      await meals.create({name: "Breakfast"}).then(async meal => {
        await foods.create({name: "Egg", calories: 78}).then(food => {
          return request(app).post(`/api/v1/meals/${meal.id}/foods/${food.id}`).then(response => {
            expect(response.status).toBe(201)
            expect(response.body.message).toBe("Successfully added Egg to Breakfast")
          })
        })
      })
    })
    test('trys to add food to a meal that doesnt exist', () => {
      foods.create({name: "Egg", calories: 78}).then(food => {
        return request(app).post(`/api/v1/meals/5213/foods/${food.id}`).then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe("Meal ID does not exist")
        })
      })
    })
    test('trys to add a food that does not exist to a meal', () => {
      meals.create({name: "Breakfast"}).then(meal => {
        return request(app).post(`/api/v1/meals/${meal.id}/foods/3213`).then(response => {
          expect(response.status).toBe(404)
          expect(response.body.message).toBe("Food ID does not exist")
        })
      })
    })
  })


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
