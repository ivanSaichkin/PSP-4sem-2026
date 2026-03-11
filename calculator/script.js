window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция

      // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function printToEnd(value) {
        outputElement.innerHTML = value.length > 16 ? value.slice(value.length - 16) : value;
    }

    function printFromBegin(value) {
        outputElement.innerHTML = value.slice(0, 16)
    }

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            if (a.includes('%')) return
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                if (a == '' && digit == '.') {
                    a = '0';
                }
                a += digit;
                printToEnd(a);
            }
            
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if (b.includes('%')) return
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                if (b == '' && digit == '.') {
                    b = '0'
                }
                b += digit;
                printToEnd(b);        
            }
        }
    }

      digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }
    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            if (a === '' || a === '0') return;
            a = !a.includes('-') ? '-' + a : a.replace('-', '')
            printFromBegin(a)
        } else {
            if (b === '' || b === '0') return;
            b = !b.includes('-') ? '-' + b : b.replace('-', '')
            printFromBegin(b)
        }
    }

    document.getElementById("btn_op_percent").onclick = function() { 
        if (!selectedOperation) {
            if (a === '' || a === '0') return;
            if (!a.includes('%')) {
                a += '%'
            }
            printToEnd(a)
        } else {
            if (b === '' || b === '0') return;
            if (!b.includes('%')) {
                b += '%'
            }
            printToEnd(b)
        }
    }

     document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

      // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return
        
        if (a.includes('%')) {
            a = a.replace('%', '') * 0.01
        }
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperation) { 
            case 'x':
                if (b.includes('%')) {
                    b = b.replace('%', '') * 0.01
                }

                console.log('a: ' + a + '\n' + 'b: ' + b)

                expressionResult = (+a) * (+b)
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                if (b.includes('%')) {
                    b = b.replace('%', '') * a * 0.01
                }

                console.log('a: ' + a + '\n' + 'b: ' + b)

                expressionResult = (+a) + (+b)
                break;
            case '-':
                if (b.includes('%')) {
                    b = b.replace('%', '') * a * 0.01
                }
                console.log('a: ' + a + '\n' + 'b: ' + b)

                expressionResult = (+a) - (+b)
                break;
            case '/':
                if (b.includes('%')) {
                    b = b.replace('%', '') * 0.01
                }
                console.log('a: ' + a + '\n' + 'b: ' + b)
                
                expressionResult = (+a) / (+b)
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        // Показываем результат на экране
        outputElement.innerHTML = a
    }
};