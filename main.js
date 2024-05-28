const calculator = document.querySelector("#calculator");
const previousText = document.querySelector('#display>p');
const displayText = document.querySelector("#display>h3");
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const clearButton = document.querySelector("#clear-button");
const equalButton = document.querySelector("#equal");

let operationFlag = false;

for (const button of Array.from(numberButtons)){
    button.addEventListener("click", () => {
        if (operationFlag === true) {
            operationFlag = false;
            displayText.textContent = '';
        }
        if (displayText.textContent === '' && button.textContent === '.'){
            displayText.textContent += '0.'
        }else if (displayText.textContent.includes('.') && button.textContent === '.') {
        } else {
            displayText.textContent += button.textContent;
        }
    })
}

for (const button of Array.from(operatorButtons)){
    button.addEventListener('click', () => {
        if (displayText.textContent !== '' && previousText.textContent !== ''){
            executeOperation(displayText.textContent, previousText.textContent);
        }else if (displayText.textContent !== '') {
            previousText.textContent += `${displayText.textContent} ${button.textContent}`;
            displayText.textContent = '';
        } else if (displayText.textContent === '' && previousText.textContent !== '') {
            previousText.textContent = previousText.textContent.slice(0,-1)+button.textContent;
        }

    })
}

clearButton.addEventListener('click', () => {
    if (displayText.textContent === ''){
        previousText.textContent = '';
    } else {
        displayText.textContent = '';
    }
})

equalButton.addEventListener('click', () => {
    if (displayText.textContent !== '' && previousText.textContent !== ''){
        executeOperation(displayText.textContent, previousText.textContent)
    }
})

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
        return add(firstNumber, secondNumber);
    } else if (operand === '-'){
        return subtract(secondNumber, firstNumber);
    } else if (operand === '*'){
        return multiply(firstNumber, secondNumber);
    } else if (operand === '/') {
        if (firstNumber === 0) {
            return `We can't divide by 0`;
        }
        return divide(secondNumber, firstNumber);
    }
}

function adaptiveParse(numberString){
    if (numberString.includes('.')){
        return parseFloat(numberString);
    } else {
        return parseInt(numberString);
    }
}

function executeOperation(displayString, previousString){
    operationFlag = true;
    displayText.textContent = operate(adaptiveParse(displayString), adaptiveParse(previousString.split(" ")[0]), previousString.split(" ")[1]).toString();
    previousText.textContent = '';
}

//Keyboard support
document.addEventListener('keypress', (event) =>{
console.log(event.key);
        if (!isNaN(parseInt(event.key))){
        if (operationFlag === true) {
            operationFlag = false;
            displayText.textContent = '';
        }
        displayText.textContent += event.key;
        } else if (event.key === '+' ||event.key === '-' ||event.key === '*' ||event.key === '/'){
            if (displayText.textContent !== '' && previousText.textContent !== ''){
                executeOperation(displayText.textContent, previousText.textContent);
            }else if (displayText.textContent !== '') {
                previousText.textContent += `${displayText.textContent} ${event.key}`;
                displayText.textContent = '';
            } else if (displayText.textContent === '' && previousText.textContent !== '') {
                previousText.textContent = previousText.textContent.slice(0,-1)+event.key;
            }
        } else if (event.key === '=' || event.key === 'Enter') {
            if (displayText.textContent !== '' && previousText.textContent !== ''){
                executeOperation(displayText.textContent, previousText.textContent)
            }
        } else if (event.key === '.') {
            if (!displayText.textContent.includes('.')){
                displayText.textContent += '.';
            }
        }
    }
)
