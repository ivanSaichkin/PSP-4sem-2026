const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

// Получение всех ингредиентов с возможностью фильтрации по категории и названию
const findAll = (category, title) => {
    const ingredients = fileService.readData(dataFilePath);
    let result = ingredients;
    
    if (category) {
        result = result.filter(ing => 
            ing.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    if (title) {
        result = result.filter(ing => 
            ing.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    
    return result;
};

// Поиск ингредиента по ID
const findOne = (id) => {
    const ingredients = fileService.readData(dataFilePath);
    return ingredients.find(ing => ing.id === id);
};

// Создание нового ингредиента
const create = (ingredientData) => {
    const ingredients = fileService.readData(dataFilePath);
    
    const newId = ingredients.length > 0 
        ? Math.max(...ingredients.map(i => i.id)) + 1 
        : 1;
        
    const newIngredient = { 
        id: newId, 
        src: ingredientData.src || 'images/default.jpg',
        title: ingredientData.title,
        text: ingredientData.text,
        benefits: ingredientData.benefits || [],
        category: ingredientData.category
    };
    
    ingredients.push(newIngredient);
    fileService.writeData(dataFilePath, ingredients);
    
    return newIngredient;
};

// Обновление ингредиента
const update = (id, ingredientData) => {
    const ingredients = fileService.readData(dataFilePath);
    const index = ingredients.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    // Обновляем только переданные поля
    ingredients[index] = { ...ingredients[index], ...ingredientData };
    fileService.writeData(dataFilePath, ingredients);
    
    return ingredients[index];
};

// Удаление ингредиента
const remove = (id) => {
    const ingredients = fileService.readData(dataFilePath);
    const filteredIngredients = ingredients.filter(i => i.id !== id);
    
    if (filteredIngredients.length === ingredients.length) {
        return false;
    }
    
    fileService.writeData(dataFilePath, filteredIngredients);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };