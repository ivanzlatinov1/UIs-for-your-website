const bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", (event) => {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const spanEl = document.createElement("span");
    spanEl.style.left = xPos + "px";
    spanEl.style.top = yPos + "px";
    const size = Math.random() * 100;
    spanEl.style.width = size + "px";
    spanEl.style.height = size + "px";
    bodyEl.appendChild(spanEl);
    setTimeout(() => {
        spanEl.remove();
    }, 3000);
});

const inputEl = document.querySelector(".input");

inputEl.checked = JSON.parse(localStorage.getItem("mode"));
updateColor();

function updateColor() {
    if(inputEl.checked == true)
    {
        bodyEl.style.backgroundColor = "white";
    }
    else
    {
        bodyEl.style.backgroundColor = "black";
    }
}

inputEl.addEventListener("input", () => {
    updateColor();
    updateLocalStorage();
})

function updateLocalStorage() {
    localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}