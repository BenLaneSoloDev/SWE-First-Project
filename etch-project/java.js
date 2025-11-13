// Function for generating a grid of size x * y
const generateGrid = function(parent, rows, columns) {
    
    const totalWidth = (window.innerWidth / 10) * 9;
    const percentPerSquare = ((totalWidth/columns) / window.innerWidth) * 100; // screen space width takes up

    // Setup element to be added to the screen
    const gridSquare = document.createElement("div");
    gridSquare.style.backgroundColor = "rgba(255, 255, 255, 1)";
    gridSquare.style.aspectRatio = "1/1";

    console.log(totalWidth);
    console.log(window.innerWidth);
    console.log(totalWidth/columns);
    console.log(percentPerSquare);

    // Divide total width of square into the 3 layers (using only 90 % space so full grid shows)
    gridSquare.style.width = ((percentPerSquare / 10) * 9).toString() + "%";
    gridSquare.style.margin = ((percentPerSquare / 10) * 1).toString() + "%";

    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const nodeCache = gridSquare.cloneNode(true);
            parent.appendChild(nodeCache);
            //console.log(count++);
        }
    } 
    
    parent.style.width = (percentPerSquare * columns).toString() + "%";
}

// Function for removing all children from an element
const clearGrid = function(parent) {
    
    // clear grid of children
    while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
    }
}

// Main Program
const gridRef = document.querySelector(".grid");
const rowButtonRef = document.querySelector("#row-input");
const colButtonRef = document.querySelector("#col-input");
const startButtonRef = document.querySelector("#start-button");

startButtonRef.addEventListener("click", () => {

    // if we have been given a valid row and colunmn, create a valid grid.
    if (rowButtonRef.checkValidity() && colButtonRef.checkValidity()) {
        gridRef.style.borderWidth = "3px";
        clearGrid(gridRef);
        generateGrid(gridRef, parseInt(rowButtonRef.value), parseInt(colButtonRef.value));
    }
    // We make the button red to show it was not a valid move
    else {
        alert("Invalid Input");
    }

    

})

