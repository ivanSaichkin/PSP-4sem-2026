const ingredientsService = require('../services/ingredientsService');

// Получение всех ингредиентов
const getAllIngredients = (req, res) => {
    const { category, title } = req.query;
    const ingredients = ingredientsService.findAll(category, title);
    res.json({
        success: true,
        count: ingredients.length,
        data: ingredients
    });
};

// Получение ингредиента по ID
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

// Создание нового ингредиента
const createIngredient = (req, res) => {
    const { src, title, text, benefits, category } = req.body;
    
    // Валидация обязательных полей
    if (!title || !text || !category) {
        return res.status(400).json({ 
            success: false, 
            error: 'Обязательные поля: title, text, category' 
        });
    }
    
    // Проверка что benefits - массив
    let benefitsArray = benefits;
    if (benefits && !Array.isArray(benefits)) {
        benefitsArray = [benefits];
    }
    
    const newIngredient = ingredientsService.create({ 
        src: src || 'images/default.jpg',
        title, 
        text,
        benefits: benefitsArray || [],
        category
    });
    
    res.status(201).json({
        success: true,
        message: 'Ингредиент успешно создан',
        data: newIngredient
    });
};

// Обновление ингредиента
const updateIngredient = (req, res) => {
    const id = parseInt(req.params.id);
    
    // Если benefits приходит не массивом, преобразуем
    if (req.body.benefits && !Array.isArray(req.body.benefits)) {
        req.body.benefits = [req.body.benefits];
    }
    
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

// Удаление ингредиента
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