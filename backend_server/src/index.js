const express = require('express');
const path = require('path');
const ingredientsRouter = require('./routes/ingredients');
const ingredientsService = require('./services/ingredientsService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/ingredients.json');

// Инициализируем сервис с путем к файлу данных
ingredientsService.init(DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 3. Подключение маршрутов с префиксом /api
app.use('/api/ingredients', ingredientsRouter);

// 4. Корневой маршрут
app.get('/', (req, res) => {
    res.json({
        name: 'Cosmetics Components API',
        version: '1.0.0',
        endpoints: {
            'GET /api/ingredients': 'Получить все ингредиенты',
            'GET /api/ingredients/:id': 'Получить ингредиент по ID',
            'POST /api/ingredients': 'Создать новый ингредиент',
            'PATCH /api/ingredients/:id': 'Обновить ингредиент',
            'DELETE /api/ingredients/:id': 'Удалить ингредиент'
        }
    });
});

// 5. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Маршрут не найден' 
    });
});

// 6. Error handler middleware
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).json({ 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
    });
});

// 7. Запуск сервера
app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════════╗
    ║     🧪 Cosmetics Components API запущен!        ║
    ╠══════════════════════════════════════════════════╣
    ║  Локальный адрес: http://localhost:${PORT}        ║
    ║  API endpoints:                                  ║
    ║  • GET    /api/ingredients                       ║
    ║  • GET    /api/ingredients/:id                   ║
    ║  • POST   /api/ingredients                       ║
    ║  • PATCH  /api/ingredients/:id                   ║
    ║  • DELETE /api/ingredients/:id                   ║
    ╚══════════════════════════════════════════════════╝
    `);
});