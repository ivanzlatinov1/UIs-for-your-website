const draggable = document.getElementById('square');
const congrate = document.getElementById('congrate');
const container = document.getElementById('container');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart');

const initializeObstacles = () => {
    for (let i = 1; i <= 6; i++) {
        const obstacle = document.createElement('div');
        obstacle.classList.add(`obstacles`);
        obstacle.classList.add(`obstacle${i}`);
        obstacle.id = `obst${i}`
        container.insertBefore(obstacle, congrate);
    }

}

initializeObstacles();
const obstacles = document.getElementsByClassName('obstacles');

let isDragging = false;
let offsetX, offsetY;

const originalPosition = {
    left: draggable.offsetLeft,
    top: draggable.offsetTop,
};

draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    draggable.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const containerRect = container.getBoundingClientRect();
        const squareRect = draggable.getBoundingClientRect();

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + squareRect.width > containerRect.width) {
            newX = containerRect.width - squareRect.width;
        }
        if (newY + squareRect.height > containerRect.height) {
            newY = containerRect.height - squareRect.height;
        }

        draggable.style.left = `${newX}px`;
        draggable.style.top = `${newY}px`;

        const obstacles = document.getElementsByClassName('obstacles');

        for (let obstacle of obstacles) {
            const obstacleRect = obstacle.getBoundingClientRect();

            if (squareRect.left < obstacleRect.right &&
                squareRect.right > obstacleRect.left &&
                squareRect.top < obstacleRect.bottom &&
                squareRect.bottom > obstacleRect.top) {

                draggable.style.left = `${originalPosition.left}px`;
                draggable.style.top = `${originalPosition.top}px`;
                isDragging = false;
                return;
            }
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';

    if (draggable.offsetLeft + 10 >= congrate.offsetLeft && draggable.offsetTop + 10 >= congrate.offsetTop) {
        result.classList.add('show');
        restartBtn.addEventListener('click', () => {
            result.classList.remove('show');

            result.addEventListener('transitionend', () => {
                if (!result.classList.contains('show')) {
                    result.style.display = 'none';
                }
            }, { once: true });

            draggable.style.left = `${originalPosition.left}px`;
            draggable.style.top = `${originalPosition.top}px`;
        });
    }
});

