const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

router.get('/', ingredientsController.getAllIngredients);      // GET /api/ingredients
router.get('/:id', ingredientsController.getIngredientById);  // GET /api/ingredients/:id
router.post('/', ingredientsController.createIngredient);     // POST /api/ingredients
router.patch('/:id', ingredientsController.updateIngredient); // PATCH /api/ingredients/:id
router.delete('/:id', ingredientsController.deleteIngredient);// DELETE /api/ingredients/:id

module.exports = router;