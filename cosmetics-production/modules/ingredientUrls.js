// modules/ingredientUrls.js
export class IngredientUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getIngredients() {
        return `${this.baseUrl}/api/ingredients`;
    }

    getIngredientById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }

    createIngredient() {
        return `${this.baseUrl}/api/ingredients`;
    }

    deleteIngredientById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }

    updateIngredientById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }
}

export const ingredientUrls = new IngredientUrls();