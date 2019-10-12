## Quantified_Self

Calorie tracker built on Node.js and running on Express.

Deployed on Heroku at https://damp-forest-79731.herokuapp.com/

## Food Endpoints

* GET /api/v1/foods

Returns all foods currently in the database (example response below)
```
{
    "id": 1,
    "name": "Banana",
    "calories": 150
}
```


* GET /api/v1/foods/:id
Returns the food object with the specific :id you’ve passed in or 404 if the food is not found

* POST /api/v1/foods

Allows creating a new food with the parameters
```
{ "food": { "name": "Name of food here", "calories": "Calories here"} }
```

* PATCH /api/v1/foods/:id

Allows one to update an existing food with the parameters
```
{ "food": { "name": "Mint", "calories": "14"} }
```

* DELETE /api/v1/foods/:id

Will delete the food with the id passed in and return a 204 status code. If the food can’t be found, a 404 will be returned.

## Meal Endpoints

* GET /api/v1/meals

Returns all the meals in the database along with their associated foods
```
[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": [
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            }
        ]
    }
]
```

* GET /api/v1/meals/:meal_id/foods

Returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found

* POST /api/v1/meals/:meal_id/foods/:id

Adds the food with :id to the meal with :meal_id

This creates a new record in the MealFoods table to establish the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.

If successful, this request will return a status code of 201 with the following body:
```
{
    "message": "Successfully added Pancakes to Breakfast"
}
```

* DELETE /api/v1/meals/:meal_id/foods/:id

Removes the food with :id from the meal with :meal_id

This deletes the existing record in the MealFoods table that creates the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.

If successful, this request will return a 204 status code.

## Contributors 
* [Tyler Bierwirth](https://github.com/tbierwirth)
* [Glynnis O'Connell](https://github.com/GlynnisOC)

## Testing

In order to test this app, enter:
```
npm test
```

## Schema Design

* Foods
   - id, name, calories, has many meals
* Meals
   - id, name, has many foods
