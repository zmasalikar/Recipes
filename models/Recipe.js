const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
    validate: {
      validator: arr => Array.isArray(arr) && arr.length > 0,
      message: 'Provide at least one ingredient'
    }
  },
  instructions: { type: String, required: [true, 'Instructions are required'] },
  prepTime: { type: Number, min: [0, 'prepTime cannot be negative'], default: 0 },
  cookTime: { type: Number, min: [0, 'cookTime cannot be negative'], default: 0 },
  servings: { type: Number, min: [1, 'Servings must be >= 1'], default: 1 },
  cuisine: { type: String },
  author: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
