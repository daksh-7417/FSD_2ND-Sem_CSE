let newheading = document.getElementById("heading");
newheading.textContent="DOM Manipulation in Javascript";
newheading.style.color="blue";
newheading.style.fontSize="30px";

let paragraphs = document.getElementsByClassName("paragraph");
paragraphs[0].innerHTML="<strong>This paragraph has been updated using Javascript.</strong>";
paragraphs[0].style.color="green";
paragraphs[0].style.fontSize="20px";

let newDiv = document.createElement("div");
newDiv.textContent="This is a new div element created using javascript.";
newDiv.style.color = "red";
newDiv.style.fontSize = "18px";
newDiv.style.textAlign="center";
document.body.appendChild(newDiv);
