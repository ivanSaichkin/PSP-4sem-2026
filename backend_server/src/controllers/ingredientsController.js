const ingredientsService = require('../services/ingredientsService');

const getAllIngredients = (req, res) => {
    const { category, name } = req.query;
    const ingredients = ingredientsService.findAll(category, name);
    res.json({
        success: true,
        count: ingredients.length,
        data: ingredients
    });
};

const getIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    const ingredient = ingredientsService.findOne(id);
    
    if (!ingredient) {
        return res.status(404).json({ 
            success: false, 
            error: 'Ингредиент не найден' 
        });
    }
    
    res.json({
        success: true,
        data: ingredient
    });
};

const createIngredient = (req, res) => {
    const { name, category, description, benefits, concentration, skinTypes, precautions } = req.body;
    
    if (!name || !category || !description) {
        return res.status(400).json({ 
            success: false, 
            error: 'Обязательные поля: name, category, description' 
        });
    }
    
    const newIngredient = ingredientsService.create({ 
        name, 
        category, 
        description, 
        benefits: benefits || '',
        concentration: concentration || 'Не указано',
        skinTypes: skinTypes || [],
        precautions: precautions || 'Не указаны'
    });
    
    res.status(201).json({
        success: true,
        message: 'Ингредиент успешно создан',
        data: newIngredient
    });
};

const updateIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedIngredient = ingredientsService.update(id, req.body);
    
    if (!updatedIngredient) {
        return res.status(404).json({ 
            success: false, 
            error: 'Ингредиент не найден' 
        });
    }
    
    res.json({
        success: true,
        message: 'Ингредиент успешно обновлен',
        data: updatedIngredient
    });
};

const deleteIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    const success = ingredientsService.remove(id);
    
    if (!success) {
        return res.status(404).json({ 
            success: false, 
            error: 'Ингредиент не найден' 
        });
    }
    
    res.status(204).send();
};

module.exports = {
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
};