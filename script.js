//Calculator only evaluates one pair of numbers at once => variables for the number pair
let firstNumber, secondNumber = undefined; 
let operator = "";

let allowedNumber = true;

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
    }

}

//Operations functions
let add = (x, y) => x + y;

let subtract = (x, y) => x - y;
let multiply = (x, y) => x * y;
let divide = (x , y) => {
    if (y !== 0){
        return x / y;
    }
}


let numbers = document.querySelectorAll(".numbers");
numbers.forEach(number => {
    if(number.textContent == "0"){
        number.addEventListener("click", () => { 
            if(display_current.textContent != "0" && allowedNumber){ //if the user keeps pressing 0 as the first input, it shouldn't add to the display
                display_current.textContent += `${number.innerHTML}`;
                if(firstIsInputted){
                    secondIsInputted = true;
                }
            }
        })
    } else{
        number.addEventListener("click", () => {
            if(allowedNumber){
                if(display_current.textContent == "0"){ //if display only has 0, removes it from the display and adds the number being inputted
                    display_current.textContent = `${number.innerHTML}`;
                    if(firstIsInputted){
                        secondIsInputted = true;
                    }
                } else{
                    display_current.textContent += `${number.innerHTML}`;
                    if(firstIsInputted){
                        secondIsInputted = true;
                    }
                }
            }
        });
    }
});

let operations = document.querySelectorAll(".operations");
operations.forEach(operation => {
    operation.addEventListener("click", () =>{
        let number = parseInt(display_current.textContent, 10);
        inputNumber = parseInt(display_current.textContent, 10);
        if(typeof firstNumber === "undefined"){
            firstNumber = inputNumber;
        } else if(typeof secondNumber === "undefined"){
            secondNumber = inputNumber;
        }

        if(typeof firstNumber !== "undefined" && typeof secondNumber !== "undefined"){
            firstNumber = completeOperation(firstNumber, secondNumber);
            operator = operation.innerHTML;
            display_previous.textContent += " " + operator;
            secondNumber = undefined;
            allowedNumber = true;
        } else{
            operator = operation.innerHTML;
            display_previous.textContent += display_current.textContent + " " + operator;
            display_current.textContent = "0"; 
            allowedNumber = true;
        }

    });
});

let equals = document.querySelector(".equals");

let completeOperation = (x, y) => {
    
    let result = operate(operator, x, y);
    display_previous.textContent = result;
    display_current.textContent = "0";

    firstIsInputted = false;
    secondIsInputted = false;
    return result;

}

equals.addEventListener("click", () => {
    let inputNumber = parseInt(display_current.textContent, 10);
    firstNumber = completeOperation(firstNumber, inputNumber);
    secondNumber = undefined;
    allowedNumber = false;
});

document.querySelector(".flex-container").addEventListener("click", ()=> {
    console.log("kds");
})

// //Calculator only evaluates one pair of numbers at once => variables for the number pair
// let displayNumber, inputNumber = 0;
// let firstNumber, secondNumber = 0; 
// let operator = "";
// let inputExists = false;
// let firstTime = true;

// let display_previous = document.querySelector(".previous-operations");
// let display_current = document.querySelector(".current-operations");

// //Function to decide which operation to call
// let operate = (operator, x, y) => {
//     switch(operator){
//         case "+":
//             return add(x, y);
//         case "-":
//             return subtract(x, y);
//         case "x":
//             return multiply(x, y);
//         case "/":
//             return divide(x, y);
//     }

// }

// //Operations functions
// let add = (x, y) => x + y;

// let subtract = (x, y) => x - y;
// let multiply = (x, y) => x * y;
// let divide = (x , y) => {
//     if (y !== 0){
//         return x / y;
//     }
// }


// let numbers = document.querySelectorAll(".numbers");
// numbers.forEach(number => {
//     if(number.textContent == "0"){
//         number.addEventListener("click", () => { 
//             if(display_current.textContent != "0"){ //if the user keeps pressing 0 as the first input, it shouldn't add to the display
//                 display_current.textContent += `${number.innerHTML}`;
//             }
//         })
//     } else{
//         number.addEventListener("click", () => {
//             if(display_current.textContent == "0"){ //if display only has 0, removes it from the display and adds the number being inputted
//                 display_current.textContent = `${number.innerHTML}`;
//             } else{
//                 display_current.textContent += `${number.innerHTML}`;
//             }
            
//         });
//     }
// });

// let operations = document.querySelectorAll(".operations");
// operations.forEach(operation => {
//     operation.addEventListener("click", () =>{
//         let number = parseInt(display_current.textContent, 10);


//         if(number != 0){
//             inputNumber = parseInt(display_current.textContent, 10);
//             inputExists = true;
//             operator = operation.innerHTML;
//             display_previous.textContent += display_current.textContent + " " + operator;
//             display_current.textContent = "0"; 
//             if()
//         }
//     })
// });

// let equals = document.querySelector(".equals");

// let completeOperation = () => {
//     if(inputExists){
//         if(typeof displayNumber === 'undefined'){
//             displayNumber = 0;
//         }
//         let result = operate(operator, displayNumber, inputNumber);
//         display_previous.textContent = result;
//         display_current.textContent = "0";
//         inputExists = false;
//     }
// }

// equals.addEventListener("click", completeOperation);

