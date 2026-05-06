const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (category, name) => {
    const ingredients = fileService.readData(dataFilePath);
    let result = ingredients;
    
    if (category) {
        result = result.filter(ing => 
            ing.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    if (name) {
        result = result.filter(ing => 
            ing.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    return result;
};

const findOne = (id) => {
    const ingredients = fileService.readData(dataFilePath);
    return ingredients.find(ing => ing.id === id);
};

const create = (ingredientData) => {
    const ingredients = fileService.readData(dataFilePath);
    
    const newId = ingredients.length > 0 
        ? Math.max(...ingredients.map(i => i.id)) + 1 
        : 1;
        
    const newIngredient = { id: newId, ...ingredientData };
    ingredients.push(newIngredient);
    fileService.writeData(dataFilePath, ingredients);
    
    return newIngredient;
};

const update = (id, ingredientData) => {
    const ingredients = fileService.readData(dataFilePath);
    const index = ingredients.findIndex(i => i.id === id);
    
    if (index === -1) return null;
    
    ingredients[index] = { ...ingredients[index], ...ingredientData };
    fileService.writeData(dataFilePath, ingredients);
    
    return ingredients[index];
};

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