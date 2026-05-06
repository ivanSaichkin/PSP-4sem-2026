const readline = require('readline');
const task1 = require('./task1');
const task2 = require('./task2');


function createRL() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function showMainMenu() {
    console.log('\n' + '='.repeat(50));
    console.log('        РЕШЕНИЕ ЗАДАЧ 2.10 и 3.3');
    console.log('='.repeat(50));
    console.log('1. Задание 2.10 - Подсчет слов-префиксов');
    console.log('2. Задание 3.3 - Выравнивание массива');
    console.log('3. Запустить все тесты');
    console.log('4. Выход');
    console.log('='.repeat(50));
}


function runInteractive(choice) {
    const rl = createRL();
    
    switch(choice) {
        case '1':
            rl.close();
            task1.interactiveTask1();
            break;
        case '2':
            rl.close();
            task2.interactiveTask2();
            break;
        default:
            rl.close();
            console.log('\nНеверный выбор!');
            setTimeout(() => start(), 1000);
    }
}

function runAllTests() {
    console.log('\n' + '='.repeat(50));
    console.log('ЗАПУСК ВСЕХ ТЕСТОВ');
    console.log('='.repeat(50));
    
    task1.testTask1();
    console.log('\n' + '-'.repeat(50));
    task2.testTask2();
    
    console.log('\n' + '='.repeat(50));
    console.log('ТЕСТИРОВАНИЕ ЗАВЕРШЕНО');
    console.log('='.repeat(50));
    
    const rl = createRL();
    rl.question('\nНажмите Enter для возврата в меню...', () => {
        rl.close();
        start();
    });
}

function start() {
    const rl = createRL();
    
    showMainMenu();
    rl.question('Выберите опцию (1-4): ', (choice) => {
        switch(choice) {
            case '1':
                rl.close();
                task1.interactiveTask1();
                break;
            case '2':
                rl.close();
                task2.interactiveTask2();
                break;
            case '3':
                rl.close();
                runAllTests();
                break;
            case '4':
                console.log('\nДо свидания!');
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('\nНеверный выбор! Пожалуйста, выберите 1-4.');
                rl.close();
                setTimeout(() => start(), 1000);
        }
    });
}

// Обработка закрытия программы
process.on('SIGINT', () => {
    console.log('\n\nПрограмма завершена.');
    process.exit(0);
});

// Запуск программы
console.log('\nДобро пожаловать!');
start();