const add = function(num1, num2) {
    console.log(num1 + num2);
    return num1 + num2;
}

const subtract = function(num1, num2) {
    console.log(num1 - num2);
    return num1 - num2;
}

const divide = function(num1, num2) {
    console.log(num1 / num2);
    return num1 / num2;
}

const multiply = function(num1, num2) {
    console.log(num1 * num2);
    return num1 * num2;
}

// function that determines the action to be performed
const operate = function(action, num1, num2) {
    let result;
    switch(action) {
        case add:
            result = add(num1, num2);
            break;
        case subtract:
            result = subtract(num1, num2);
            break;
        case divide:
            result = divide(num1, num2);
            break;
        case multiply:
            result = multiply(num1, num2);
            break;
    }

    clearCalculator();
    justCalculated = true;

    if (result === Infinity) {
        updateDisplay("Error: Invalid Operation")
        initialNumber = "";
    }
    else {
        updateDisplay(result, true);
        initialNumber = (result).toString();
    }
}

// Updates the visual display of the console
const updateDisplay = function(output, calculation = false) {
    
    let displayText = output;

    if (parseFloat(output) && calculation) {
        let number = parseFloat(output);
        displayText = (Math.round(number*100)/100).toString();
    }
    
    calculatorDisplay.textContent = displayText;
}

// Clears the calculator
const clearCalculator = function() {
    initialNumber = "";
    followingNumber = "";
    activeOperator = null;
    if (activeButton != null) { activeButton.style.backgroundColor = "rgb(209, 209, 209)"; }
    activeButton = null;
    updateDisplay("");
}

// Selects the operator being used in the calculator
const selectOperator = function(button, operation) {
    
    if (initialNumber.length > 0) {
        // turns off currently selected button (and calculates first half if there is a following number)
        if (activeButton != null) { 
            activeButton.style.backgroundColor = "rgb(209, 209, 209)"; 
            if (followingNumber.length > 0) {
                operate(activeOperator, parseFloat(initialNumber), parseFloat(followingNumber));
            }
        }

        // selects new button
        activeButton = button;
        activeButton.style.backgroundColor = "rgb(204, 152, 152)";
        activeOperator = operation;
    }
    else {
        updateDisplay("Error: Need a Number");
    }
        
}


// Holds information for the operator in use
let activeButton; // physical representation
let activeOperator; // function to be ran

// Numbers used on either side of the operation
let initialNumber = "";
let followingNumber = "";

// Variable used to edit display
const calculatorDisplay = document.querySelector(".output");
let justCalculated = false;

// Setup button functionality
const calculateButton = document.querySelector("#equals");
calculateButton.addEventListener("click", () => {
    if (followingNumber.length > 0) {
        operate(activeOperator, parseFloat(initialNumber), parseFloat(followingNumber));
    }
    else {
        clearCalculator();
        updateDisplay("Error: Invalid Operation");
    }
});

const backButton = document.querySelector("#back");
backButton.addEventListener("click", () => {
    // removes recently entered character of a number
    if (activeOperator == null) {
        if (!justCalculated) {
            initialNumber = initialNumber.slice(0, length-1);
            updateDisplay(initialNumber);
        }        
    }
    else {
        followingNumber = followingNumber.slice(0, length-1);
        updateDisplay(followingNumber);    
    }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    clearCalculator();
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
    //Adds decimal point to the current number (if possible)
    if (activeOperator == null) {
        if (!initialNumber.includes(".") && !justCalculated)
        {
            initialNumber = initialNumber += ".";
            updateDisplay(initialNumber);
        }            
    }
    else {
        if (!followingNumber.includes("."))
        {
            followingNumber = followingNumber += ".";
            updateDisplay(followingNumber);
        }            
    }
});

const addButton = document.querySelector("#add");
addButton.addEventListener("click", () => {
    selectOperator(addButton, add);
});

const subtractButton = document.querySelector("#subtract");
subtractButton.addEventListener("click", () => {
    selectOperator(subtractButton, subtract);
});

const divideButton = document.querySelector("#divide");
divideButton.addEventListener("click", () => {
    selectOperator(divideButton, divide);
});

const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", () => {   
    selectOperator(multiplyButton, multiply);
});

// Establishes all numerical buttons so it doesnt not clog up the html file
const buttonSection = document.querySelector(".input");
let buttonPrefab = document.createElement("button");
for (let i = 0; i < 10; i++) {
    
    const newButton = buttonPrefab.cloneNode(true);
    newButton.classList.add("button"); // gives styling
    newButton.textContent = (i).toString();

    newButton.addEventListener("click", () => {
        //Adds this number to left or right value, depending on if operator is chosen
        if (activeOperator == null) {
            if (justCalculated) {
                initialNumber = "";
                justCalculated = false;
            }
            initialNumber = initialNumber += (i).toString();
            updateDisplay(initialNumber);
        }
        else {
            followingNumber = followingNumber += (i).toString();
            updateDisplay(followingNumber);    
        }
    });  

    buttonSection.appendChild(newButton);
}

// Handle Keyboard Inputs In the Document
document.addEventListener("keydown", function(event) {
    
    let validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "*", "+", "-", "/", "=", "Enter", "Backspace", "Delete"];
    
    if (validKeys.includes(event.key)) {

        if (parseFloat(event.key)) {
            // add to display (as its a number)
            if (activeOperator == null) {
                if (justCalculated) {
                    initialNumber = "";
                    justCalculated = false;
                }
                initialNumber = initialNumber += (parseFloat(event.key)).toString();
                updateDisplay(initialNumber);
            }
            else {
                followingNumber = followingNumber += (parseFloat(event.key)).toString();
                updateDisplay(followingNumber);    
            }
        }
        else if (event.key == ".") {
            //Adds decimal point to the current number (if possible)
            if (activeOperator == null) {
                if (!initialNumber.includes(".") && initialNumber.length > 0)
                {
                    initialNumber = initialNumber += ".";
                    updateDisplay(initialNumber);
                }            
            }
            else {
                if (!followingNumber.includes(".") && followingNumber.length > 0)
                {
                    followingNumber = followingNumber += ".";
                    updateDisplay(followingNumber);
                }            
            }
        }
        else {
            // activate function
            switch (event.key) {
                // ADD Function
                case "+":
                    console.log(event.key);
                    selectOperator(addButton, add);
                    break;
                // SUBTRACT Function
                case "-":
                    console.log(event.key);
                    selectOperator(subtractButton, subtract);
                    break;
                // DIVIDE Function
                case "/":
                    console.log(event.key);
                    selectOperator(divideButton, divide);
                    break;
                // MULTIPLY Function
                case "*":
                    console.log(event.key);
                    selectOperator(multiplyButton, multiply);
                    break;
                // EQUALS Function
                case "=":
                case "Enter":
                    console.log(event.key);
                    if (followingNumber.length > 0) {
                        operate(activeOperator, parseFloat(initialNumber), parseFloat(followingNumber));
                    }
                    else {
                        clearCalculator();
                        updateDisplay("Error: Invalid Operation");
                    }
                    break;
                // BACK Function
                case "Backspace":

                    break;
                // CLEAR Function
                case "Delete":
                    
                    break;                
            }
        }

        

    }
});





