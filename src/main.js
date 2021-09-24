const buttonContainer = document.querySelector('.buttons');
const prevElement = document.querySelector('.prev');
const currentElement = document.querySelector('.current');
let currentNumber = '', prevNumber = '', sign = '';

buttonContainer.addEventListener('click', e => {
    const type = e.target.dataset.type
    const text = e.target.textContent
    if (text.length<= 1) {
        if (type == 'equal') {
            calculate()
        } else if (type == 'operate') {
            operate(text)
        } else if (type == 'delete') {
            deleteFn()
        } else if (type == 'clear') {
            clear()
        } else {
            pushNumber(text)
        }
        updateScreen()
    }
})

function pushNumber(num) {
    currentNumber = currentNumber + num
}
function clear() {
    currentNumber = '';
    prevNumber = '';
    sign = '';
}
function deleteFn() {
    if (!currentNumber.toString().length) { return }
    currentNumber = currentNumber.toString().slice(0, -1);
}
function operate(text) {
    if (currentNumber == '') {
        return
    }
    sign = text
    prevNumber = currentNumber
    currentNumber = ''
}
function calculate() {
    let result = 0;
    const prev = Number(prevNumber);
    const current = Number(currentNumber);
    switch (sign) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
    }
    var reg = /.*\..*/;
    if (reg.test(result)) {
        currentNumber = result.toFixed(2);
    } else {
        currentNumber = result;
    }
    sign = '';
    prevNumber = '';
}
function updateScreen() {

    currentElement.textContent = currentNumber
    if (sign) {
        prevElement.textContent = `${prevNumber} ${sign}`
    } else {
        prevElement.textContent = ''
    }
}
