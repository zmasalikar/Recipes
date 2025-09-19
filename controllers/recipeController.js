const Recipe = require('../models/Recipe');
const catchAsync = require('../middlewares/catchAsync');
const { isValidObjectId } = require('mongoose');

// CREATE
exports.createRecipe = catchAsync(async (req, res, next) => {
  const { title, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({
      status: 'fail',
      message: 'title, ingredients, and instructions are required',
    });
  }

  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    status: 'success',
    data: recipe,
  });
});

// READ ALL
exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const recipes = await Recipe.find();
  res.status(200).json({ status: 'success', results: recipes.length, data: recipes });
});

// READ ONE
exports.getRecipeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid recipe id' });
  }

  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
  }

  res.status(200).json({ status: 'success', data: recipe });
});

// UPDATE
exports.updateRecipe = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid recipe id' });
  }

  const updated = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
  }

  res.status(200).json({ status: 'success', data: updated });
});

// DELETE
exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid recipe id' });
  }

  const deleted = await Recipe.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
  }

  res.status(204).json({ status: 'success', data: null });
});