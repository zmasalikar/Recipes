const Recipe = require('../models/Recipe');
const catchAsync = require('../middlewares/catchAsync');
const isValidObjectId = require('../utils/validateObjectId');

// Create
exports.createRecipe = catchAsync(async (req, res, next) => {
  const recipe = await Recipe.create(req.body);
  res.status(201).json({
    status: 'success',
    data: recipe
  });
});

// Get all
exports.getAllRecipes = catchAsync(async (req, res, next) => {
  // optional: add filters, pagination later
  const recipes = await Recipe.find();
  res.status(200).json({
    status: 'success',
    results: recipes.length,
    data: recipes
  });
});

// Get by ID
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

// Update
exports.updateRecipe = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid recipe id' });
  }
  const updated = await Recipe.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updated) {
    return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
  }
  res.status(200).json({ status: 'success', data: updated });
});

// Delete
exports.deleteRecipe = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid recipe id' });
  }
  const deleted = await Recipe.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ status: 'fail', message: 'Recipe not found' });
  }
  res.status(204).send(); // no content
});
