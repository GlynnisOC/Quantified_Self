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
});
