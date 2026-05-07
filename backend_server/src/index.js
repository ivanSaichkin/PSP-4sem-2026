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

// Middleware для парсинга JSON
app.use(express.json());

// Статическая раздача изображений (если нужно)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключение маршрутов
app.use('/api/ingredients', ingredientsRouter);

// Корневой маршрут
app.get('/', (req, res) => {
    res.json({
        name: 'Cosmetics Components API',
        version: '1.0.0',
        description: 'API для управления компонентами косметического производства',
        endpoints: {
            'GET /api/ingredients': 'Получить все ингредиенты',
            'GET /api/ingredients?category=Увлажнители': 'Фильтрация по категории',
            'GET /api/ingredients?title=Гиалуроновая': 'Поиск по названию',
            'GET /api/ingredients/:id': 'Получить ингредиент по ID',
            'POST /api/ingredients': 'Создать новый ингредиент',
            'PATCH /api/ingredients/:id': 'Обновить ингредиент',
            'DELETE /api/ingredients/:id': 'Удалить ингредиент'
        },
        example_data: {
            id: 1,
            src: "images/ingredient1.jpg",
            title: "Гиалуроновая кислота",
            text: "Мощный увлажнитель...",
            benefits: ["Увлажнение", "Anti-age", "Безопасно"],
            category: "Увлажнители"
        }
    });
});

// Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Маршрут не найден' 
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err);
    res.status(500).json({ 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════════════════╗
    ║        🧪 Cosmetics Components API запущен!               ║
    ╠════════════════════════════════════════════════════════════╣
    ║  Локальный адрес: http://localhost:${PORT}                  ║
    ║                                                           ║
    ║  📋 Формат данных:                                         ║
    ║  {                                                        ║
    ║    "id": 1,                                               ║
    ║    "src": "images/ingredient1.jpg",                       ║
    ║    "title": "Гиалуроновая кислота",                       ║
    ║    "text": "Мощный увлажнитель...",                       ║
    ║    "benefits": ["Увлажнение", "Anti-age"],                ║
    ║    "category": "Увлажнители"                              ║
    ║  }                                                        ║
    ╚════════════════════════════════════════════════════════════╝
    `);
});