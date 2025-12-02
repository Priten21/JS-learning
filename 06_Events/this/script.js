btn = document.querySelector("button");
h1 = document.querySelector("h1");
h3 = document.querySelector("h3");
p = document.querySelector("p");

btn.addEventListener("click", changeColor);
h1.addEventListener("click", changeColor);
h3.addEventListener("click", changeColor);
p.addEventListener("click", changeColor);

function changeColor() {
    console.log(this);
    console.log(this.innerText);
    this.style.backgroundColor = "cyan"
}