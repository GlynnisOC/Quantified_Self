var shell = require("shelljs");
var request = require("supertest");
var app = require('../../app');
const foods = require("../../models").Food;

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
    shell.exec('npx sequelize db:migrate --env test')
  });

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
    });

  describe('Test GET /api/v1/foods path', () => {
    test('should return an index of food', () => {
      return foods.bulkCreate([
        { name: "Banana", calories: 150 },
        { name: "Yogurt", calories: 550 },
        { name: "Apple", calories: 220 }
      ]).then(index => {
        return request(app).get("/api/v1/foods").then(response => {
          expect(response.status).toBe(200)
          expect(Object.keys(response.body[0])).toContain('id')
          expect(Object.keys(response.body[0])).toContain('name')
          expect(Object.keys(response.body[0])).toContain('calories')
          expect(response.body[0].id).toBe(1)
          expect(response.body[0].name).toBe("Banana")
          expect(response.body[0].calories).toBe(150)
          })
        })
      });
  });

  describe('Test GET /api/v1/foods/:id', () => {
    test('should return food by id requested', () => {
      return foods.bulkCreate([
        { name: "Banana", calories: 150 },
        { name: "Yogurt", calories: 550 },
        { name: "Apple", calories: 220 }
      ]).then(show => {
        return request(app).get("/api/v1/foods/1").then(response => {
          expect(response.status).toBe(200)
          expect(response.body['id']).toBe(1)
          expect(response.body['name']).toBe("Banana")
        })
      }).then(show => {
        return request(app).get("/api/v1/foods/26").then(response => {
          expect(response.status).toBe(404)
        })
      })
    });
  });

  describe('Test POST /api/v1/foods', () => {
    test('should create a new food when given name and calories in params', () => {
      const food = {
        name: "Cheetos",
        calories: 500
      }
      return request(app).post("/api/v1/foods").send(food).then(response => {
        expect(response.status).toBe(201)
        expect(response.body.name).toBe("Cheetos")
        expect(response.body.calories).toBe(500)
        return foods.findOne({order: [['createdAt', 'DESC']]}).then(newFood => {
          expect(newFood.name).toBe("Cheetos")
          expect(newFood.calories).toBe(500)
        })
      })
    })
    test('should return 400 if name or calories are not given', () => {
      const food = {
        name: "Cheetos"
      }
      return request(app).post("/api/v1/foods").send(food).then(response => {
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Name and calories are required")
      })
    })
  })
});
