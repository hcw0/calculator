//Calculator only evaluates one pair of numbers at once => variables for the number pair
let firstNumber, secondNumber;
firstNumber = secondNumber = null; 
let operator = "";

let allowedNumber = true;
let dotAllowed = true;

let display_previous = document.querySelector(".previous-operations");
let display_current = document.querySelector(".current-operations");

//Function to decide which operation to call
let operate = (operator, x, y) => {
    switch(operator){
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "x":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        case "^":
            return exponent(x, y);
    }

}

//Operations functions
let add = (x, y) => x + y;
let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x , y) => {
    if (y !== 0){
        return x / y;
    } else{
        clearFunction();
        alert("Division by 0 is not allowed");
        return;
    }
}
let exponent = (base, exponent) => Math.pow(base, exponent);

let numbers = document.querySelectorAll(".numbers");
numbers.forEach(number => {
    if(number.textContent == "0"){
        number.addEventListener("click", () => { 
            if(display_current.textContent != "0" && allowedNumber){ //if the user keeps pressing 0 as the first input, it shouldn't add to the display
                display_current.textContent += `${number.innerHTML}`;
            }
        })
    } else{
        number.addEventListener("click", () => {
            if(allowedNumber){
                if(display_current.textContent == "0"){ //if display only has 0, removes it from the display and adds the number being inputted
                    display_current.textContent = `${number.innerHTML}`;
                } else{
                    display_current.textContent += `${number.innerHTML}`;
                }
            }
        });
    }
});

let operations = document.querySelectorAll(".operations");
operations.forEach(operation => {
    operation.addEventListener("click", () =>{
        let inputNumber = parseFloat(display_current.textContent);
        if(firstNumber == null){
            firstNumber = inputNumber;
        } else if(secondNumber == null){
            secondNumber = inputNumber;
        }

        if(firstNumber != null && secondNumber != null){
            firstNumber = completeOperation(firstNumber, secondNumber);
            operator = operation.textContent;
            if(operator == "xy"){
                operator = "^";
            }
            display_previous.textContent += " " + operator;
            secondNumber = null;
            allowedNumber = true;
        } else{
            operator = operation.textContent;
            if(operator == "xy"){
                operator = "^";
            }
            display_previous.textContent += display_current.textContent + " " + operator;
            display_current.textContent = "0"; 
            allowedNumber = true;
        }
        dotAllowed = true;
    });
});

let dot = document.querySelector(".dot");
dot.addEventListener("click", () =>{
    if(dotAllowed){
        display_current.textContent += ".";
        dotAllowed = false;
    }
});

let equals = document.querySelector(".equals");

let completeOperation = (x, y) => {
    let result = operate(operator, x, y);
    display_previous.textContent = result;
    display_current.textContent = "0";
    secondNumber = 0;
    return result;
}

equals.addEventListener("click", () => {
    if(firstNumber != null){
        let inputNumber = parseFloat(display_current.textContent);
        if(inputNumber == 0 && operator == "/"){
            operate("/", firstNumber, inputNumber);
        } else {
            firstNumber = completeOperation(firstNumber, inputNumber);
            allowedNumber = false;
            operator = "+";
            dotAllowed = true;
        }

    }
});

let clearFunction = () => {
    firstNumber = secondNumber = null; 
    operator = "";
    allowedNumber = true;
    display_previous.textContent = "";
    display_current.textContent = "0";
    dotAllowed = true;
}

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearFunction);

let del = document.querySelector("#delete");
del.addEventListener("click", () =>{
    let currentNumber = display_current.textContent;
    dotAllowed = true;
    if(currentNumber != 0){
        if(currentNumber.length > 1){
            display_current.textContent = currentNumber.substring(0, currentNumber.length -1);
        } else {
            display_current.textContent = "0";
        }
    }
});