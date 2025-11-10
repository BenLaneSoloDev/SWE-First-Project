const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

// Creating the paragraph
const para = document.createElement("p");
para.textContent = "Hey I'm Red!";
para.style.color = "red";

// Creating the Header
const header1 = document.createElement("h3");
header1.textContent = "I'm a Blue h3!";
header1.style.color = "blue";

// Creating 2nd Div
const div2 = document.createElement("div");
div2.style.borderColor = "black";
div2.style.borderWidth = "5px";
div2.style.borderStyle = "solid";
div2.style.backgroundColor = "pink";

// Creating Div 2 elements
const divH1 = document.createElement("h1");
divH1.textContent = "I'm in a div";

const divP = document.createElement("P");
divP.textContent = "ME TOO!";

div2.appendChild(divH1);
div2.appendChild(divP);

container.appendChild(content);
container.appendChild(para);
container.appendChild(header1);
container.appendChild(div2);