const express = require('express');
const morgan = require('morgan');
const path = require('path');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// view engine for simple index page
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(express.json()); // parse JSON bodies

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Recipes API', base: '/api/v1/recipes' });
});

app.use('/api/v1/recipes', recipeRoutes);

// 404 for routes not found
app.all('*', (req, res) => {
  res.status(404).json({ status: 'fail', message: `Can't find ${req.originalUrl}` });
});

// global error handler
app.use(errorHandler);

module.exports = app;
