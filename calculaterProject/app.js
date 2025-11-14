const add = function(num1, num2) {
    return num1 + num2;
}

const subtract = function(num1, num2) {
    return num1 - num2;
}

const divide = function(num1, num2) {
    return num1 / num2;
}

const multiply = function(num1, num2) {
    return num1 * num2;
}

let initialNumber;
let action;
let followingNumber;


const calculateButton = document.querySelector(".equals");
calculateButton.addEventListener("click", () => {
    action(initialNumber, followingNumber);
})

// if any other button is pressed that isnt equals, check following if
if (initialNumber == null || followingNumber == null) {
    action(initialNumber, followingNumber)
}

