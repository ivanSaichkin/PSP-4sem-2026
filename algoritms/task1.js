/**
 * Подсчитывает количество слов из массива, которые являются префиксами строки
 * @param {string[]} words - массив слов
 * @param {string} str - целевая строка
 * @returns {number} количество слов-префиксов
 */
function countPrefixWords(words, str) {
    if (!Array.isArray(words) || typeof str !== 'string') {
        return 0;
    }
    
    let count = 0;
    for (let word of words) {
        if (typeof word === 'string' && str.startsWith(word)) {
            count++;
        }
    }
    return count;
}

/**
 * Интерактивный режим для задания 2.10
 */
function interactiveTask1() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log('\n=== Задание 2.10 - Подсчет слов-префиксов ===');
    console.log('Пример: words = ["a", "b", "c", "ab", "bc", "abc"], s = "abc" -> 3\n');
    
    rl.question('Введите массив слов через пробел: ', (wordsInput) => {
        const words = wordsInput.trim().split(/\s+/);
        
        rl.question('Введите строку str: ', (str) => {
            const result = countPrefixWords(words, str);
            
            console.log(`\nРезультат: ${result}`);
            console.log(`Объяснение: из ${words.length} слов ${result} являются префиксами строки "${str}"`);
            
            rl.close();
        });
    });
}

/**
 * Тестовый режим для задания 2.10
 */
function testTask1() {
    console.log('\n=== Тестирование Задания 2.10 ===\n');
    
    const tests = [
        { words: ["a", "b", "c", "ab", "bc", "abc"], str: "abc", expected: 3 },
        { words: ["a", "ab", "abc"], str: "abcd", expected: 3 },
        { words: ["x", "y", "z"], str: "abc", expected: 0 },
        { words: ["", "a", "ab"], str: "a", expected: 2 },
        { words: ["hello", "he", "hel", "hell"], str: "hello", expected: 4 }
    ];
    
    tests.forEach((test, index) => {
        const result = countPrefixWords(test.words, test.str);
        const status = result === test.expected ? '✓' : '✗';
        console.log(`${status} Тест ${index + 1}: ${result} (ожидалось: ${test.expected})`);
        console.log(`   words: [${test.words.join(', ')}], str: "${test.str}"`);
    });
}

module.exports = { countPrefixWords, interactiveTask1, testTask1 };