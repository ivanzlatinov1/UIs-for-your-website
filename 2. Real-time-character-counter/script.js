const textArea = document.getElementById("textarea");
const totalCounter = document.getElementById("total-counter");
const remainingCounter = document.getElementById("remaining-counter");

textArea.addEventListener("keyup", () => {
    updateCounter();
})

function updateCounter(){
    totalCounter.textContent = textArea.value.length;
    remainingCounter.textContent = textArea.getAttribute("maxLength") - textArea.value.length;
}

const button = document.querySelector(".btn");

button.addEventListener("mouseover", (event) => {
    const x = event.pageX - button.offsetLeft;
    const y = event.pageY - button.offsetTop;

    button.style.setProperty("--xPos", x + "px");
    button.style.setProperty("--yPos", y + "px");
});

function reset() {
    totalCounter.textContent = 0;
    remainingCounter.textContent = 0;
    textArea.value = '';
}