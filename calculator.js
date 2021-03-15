function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b==0) {
        return "haha";
    }
    return a/b;
}

function operate(op, a,b) {
    switch(op) {
        case "add":
            return add(a,b);
            break;
        case "subtract":
            return subtract(a,b);
            break;
        case "multiply":
            return multiply(a,b);
            break;
        case "divide":
            return divide(a,b);
            break;
        default:
    }
}

function displayDigit(e) {
    let clickTarget = e.target;
    if (clickTarget.id != 'clear') {
        let display = document.querySelector('#display');
        let digit = clickTarget.dataset.digit;
        if (opJustPicked) {
            //clear display, op just picked
            display.textContent = digit;
            opJustPicked = false;
            decimalEnabled = true;
        } else {
            if (clickTarget.dataset.digit == '.') {
                if (decimalEnabled) {
                    display.textContent += digit;
                    decimalEnabled = false;
                } 
            } else {
                display.textContent += digit;
            }
            
        }
    } else {
        //clear display
        let display = document.querySelector('#display');
        display.textContent = '';
    }
}

function countDecimals(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}

function opOnDigit(e) {
    let clickTarget = e.target;
    let display = document.querySelector('#display').textContent;
    if (display != '') {
        switch (clickTarget.dataset.op) {
            case 'backspace':
                document.querySelector('#display').textContent = display.substr(0, display.length-1);
                lastOp = '';
                lastNumber = '';
                break;
            default:
                display = new Number(display);
                if (lastNumber != '' && lastOp != '') {
                    let answer = operate(lastOp, lastNumber, display);
                    if (typeof(answer) == 'number') {
                        if (countDecimals(answer) > 5) {
                            answer = answer.toFixed(5);
                        }
                        lastNumber = answer;
                    }
                    //show answer in display
                    document.querySelector('#display').textContent = answer;
                    
                } else {
                    lastNumber = display;
                    //no last number, nothing to do yet
                }
                lastOp = clickTarget.dataset.op;
                if (lastOp == 'equals') {
                    lastOp = '';
                    lastNumber = '';
                }
        }
        opJustPicked = true;
    }
}

function clearDisplay() {
    let display = document.querySelector('#display');
    display.textContent = '';
    lastOp = '';
    lastNumber = '';
}

function calcKeyPress(e) {
    let keyCode = e.keyCode;
    
    if (keyCode == EQUALS_KEYCODE) {
        if (e.shiftKey) {
            //Plus sign
            keyCode = 1000;
        } else {
            keyCode = EQUALS_KEYCODE;
        }
    }
    if (keyCode == EIGHT_KEYCODE) {
        if (e.shiftKey) {
            //Asterisk
            keyCode = 1001;
        } else {
            keyCode = EIGHT_KEYCODE;
        }
    }
    if (keyCode == CHARC_KEYCODE) {
        keyCode = 1002;
    }
    if (keyCode == CHARD_KEYCODE) {
        keyCode = 191;
    }
    const button = document.querySelector(`button[data-keycode="${keyCode}"]`);
    if (button != null) {
        button.click();
    }
}

const EQUALS_KEYCODE = 61;
const EIGHT_KEYCODE = 56;
const CHARC_KEYCODE = 67;
const CHARD_KEYCODE = 68;
let lastOp = '';
let lastNumber = '';
let opJustPicked = false;
let decimalEnabled = true;
const digits = document.querySelectorAll('.digit');
const ops = document.querySelectorAll('.op');
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearDisplay);
digits.forEach(digit => digit.addEventListener('click', displayDigit));
ops.forEach(op => op.addEventListener('click', opOnDigit));
digits.forEach(digit => digit.addEventListener('keyup', calcKeyPress));
ops.forEach(op => op.addEventListener('keyup', calcKeyPress));

window.onload = function() {
    let calc = document.querySelector('#clear');
    calc.focus();
}
