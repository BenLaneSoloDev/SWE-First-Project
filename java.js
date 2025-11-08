const add7 = function (num) {
    return num + 7;
}

const multiply = function (num1, num2) {
    return num1 * num2;
}

const capitalise = function (text) {
    return text.at(0).toUpperCase() + text.slice(1).toLowerCase();
}

const lastLetter = function (text) {
    return text.at(text.length - 1);
}

console.log(lastLetter("Yupadd"));