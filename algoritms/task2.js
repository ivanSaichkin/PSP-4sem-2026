/**
 * Выравнивает многомерный массив в одномерный
 * @param {Array} arr - многомерный массив
 * @returns {Array} выравненный массив
 */
function flatten(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    
    let result = [];
    for (let element of arr) {
        if (Array.isArray(element)) {
            result.push(...flatten(element));
        } else {
            result.push(element);
        }
    }
    return result;
}

/**
 * Альтернативная реализация с использованием reduce
 */
function flattenReduce(arr) {
    return arr.reduce((result, element) => {
        return result.concat(Array.isArray(element) ? flattenReduce(element) : element);
    }, []);
}

/**
 * Интерактивный режим для задания 3.3
 */
function interactiveTask2() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log('\n=== Задание 3.3 - Выравнивание массива ===');
    console.log('Пример: [1, 2, 3, [4, 5, 6, [10, 20, 30]]] -> [1, 2, 3, 4, 5, 6, 10, 20, 30]\n');
    
    rl.question('Введите массив в формате JSON: ', (input) => {
        try {
            const arr = JSON.parse(input);
            if (!Array.isArray(arr)) {
                throw new Error('Входные данные должны быть массивом');
            }
            
            const result = flatten(arr);
            console.log('\nРезультат:');
            console.log(`Вход:  ${JSON.stringify(arr)}`);
            console.log(`Выход: ${JSON.stringify(result)}`);
        } catch (error) {
            console.log(`\nОшибка: ${error.message}`);
            console.log('Пожалуйста, введите корректный JSON массив.');
            console.log('Пример: [1, [2, 3], [4, [5, 6]]]');
        } finally {
            rl.close();
        }
    });
}

/**
 * Тестовый режим для задания 3.3
 */
function testTask2() {
    console.log('\n=== Тестирование Задания 3.3 ===\n');
    
    const tests = [
        { input: [1, 2, 3, [4, 5, 6, [10, 20, 30]]], expected: [1, 2, 3, 4, 5, 6, 10, 20, 30] },
        { input: [1, [2, [3, [4, [5]]]]], expected: [1, 2, 3, 4, 5] },
        { input: [[1, 2], [3, 4], [5, 6]], expected: [1, 2, 3, 4, 5, 6] },
        { input: [], expected: [] },
        { input: [1, [2, 3], [4, [5, [6, 7]]], 8], expected: [1, 2, 3, 4, 5, 6, 7, 8] },
        { input: [[[[1]]]], expected: [1] }
    ];
    
    tests.forEach((test, index) => {
        const result = flatten(test.input);
        const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
        const status = isEqual ? '✓' : '✗';
        console.log(`${status} Тест ${index + 1}:`);
        console.log(`   Вход:  ${JSON.stringify(test.input)}`);
        console.log(`   Выход: ${JSON.stringify(result)}`);
        if (!isEqual) {
            console.log(`   Ожидалось: ${JSON.stringify(test.expected)}`);
        }
        console.log('');
    });
}

module.exports = { flatten, flattenReduce, interactiveTask2, testTask2 };