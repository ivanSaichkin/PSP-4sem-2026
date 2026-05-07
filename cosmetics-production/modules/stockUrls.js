class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/api/ingredients`;
    }

    getStockById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/api/ingredients`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/api/ingredients/${id}`;
    }
}

export const stockUrls = new StockUrls();