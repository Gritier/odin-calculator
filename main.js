const calculator = document.querySelector("#calculator");
const previousText = document.querySelector('#display>p');
const displayText = document.querySelector("#display>h3");
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");

for (const button of Array.from(numberButtons)){
    button.addEventListener("click", () => {
        displayText.textContent += button.textContent;
    })
}

for (const button of Array.from(operatorButtons)){
    button.addEventListener('click', () => {
        if (displayText.textContent !== '') {
            previousText.textContent += ` ${displayText.textContent} ${button.textContent}`;
            displayText.textContent = '';
        } else if (displayText.textContent === '' && previousText.textContent !== '') {
            previousText.textContent = previousText.textContent.slice(0,-1)+button.textContent;
        }

    })
}

function add(firstNumber, secondNumber){
    return firstNumber+secondNumber;
}

function subtract(minuend, subtrahend){
    return minuend-subtrahend;
}

function multiply(firstFactor, secondFactor){
    return firstFactor*secondFactor;
}

function divide(dividend, divisor){
    return dividend/divisor;
}

function operate(firstNumber, secondNumber, operand){
    if (operand === '+'){
        display.textContent = toString(add(firstNumber, secondNumber));
    } else if (operand === '-'){
        display.textContent = toString(subtract(firstNumber, secondNumber));
    } else if (operand === '*'){
        display.textContent = toString(multiply(firstNumber, secondNumber));
    } else if (operand === '/') {
        display.textContent = toString(divide(firstNumber, secondNumber));
    }
}
