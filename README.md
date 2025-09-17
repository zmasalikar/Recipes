# Recipes API

CRUD Recipes API built with Node.js, Express, Mongoose (MongoDB). Follows MVC pattern.

## Features
- Create, Read, Update, Delete recipes
- Mongoose validation
- Centralized error handling
- Postman collection with examples

## Stack
- Node.js, Express.js
- MongoDB + Mongoose
- Postman for API documentation

## Run locally
1. `git clone <repo>`
2. `npm install`
3. Create `.env`:
   - `MONGO_URI=<your_mongo_uri>`
   - `PORT=5000`
4. `npm run dev`

API base: `http://localhost:5000/api/v1/recipes`

## Endpoints
- `POST /api/v1/recipes` — create
- `GET /api/v1/recipes` — list all
- `GET /api/v1/recipes/:id` — get single
- `PATCH /api/v1/recipes/:id` — update
- `DELETE /api/v1/recipes/:id` — delete

## Documentation
- Postman collection is included: export or create one in Postman.

## Deploy
- Deployed on Render /any other hosting.
- Add `MONGO_URI` to environment variables.

## License
Open-source.
