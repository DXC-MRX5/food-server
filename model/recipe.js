const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    poster: String,
    name: String,
    source: String,
    ingredients: [String],
    generalName : String,
    category : String,
    nutritions : {}
});

const RecipeModel = mongoose.model('recipes', recipeSchema);

module.exports = {
    RecipeModel
}