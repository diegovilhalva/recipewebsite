const express = require("express")

const router = express.Router()

const recipeController = require("../controllers/recipeController")

router.get("/",recipeController.homepage)
router.get("/recipe/:id",recipeController.exploreRecipe)
router.get("/categories",recipeController.exploreCategories)
router.get("/categories/:id",recipeController.exploreCategoriesById)
router.post("/search",recipeController.searchRecipe)
router.get("/explore-latest",recipeController.exploreLatest)
router.get("/random-recipe",recipeController.showRandom)
router.get("/submit-recipe",recipeController.submitRecipe)
router.post("/submit",recipeController.saveRecipe)
module.exports = router