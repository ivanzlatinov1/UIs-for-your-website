class Stopwatch {

    constructor(display, startStopButton, resetButton, lapsContainer, progressCircle, counter) {
        this.stopwatch = null;
        this.isRunning = false;
        this.startTime = null;
        this.elapsedTime = 0;
        this.laps = [];
        this.display = display;
        this.startStopButton = startStopButton;
        this.resetButton = resetButton;
        this.lapsContainer = lapsContainer;
        this.progressCircle = progressCircle;
        this.counter = counter;

        this.startStopButton.addEventListener('click', () => {
            this.startStop();
        });

        this.resetButton.addEventListener('click', () => {
            this.resetOrLap();
        });

        this.updateDisplay();
    }

    startStop() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now();
            this.stopwatch = setInterval(() => this.updateDisplay(), 10);
            this.startStopButton.textContent = 'Stop';
            this.startStopButton.classList.add('stop');
            this.resetButton.textContent = 'Lap';
        }
        else {
            this.isRunning = false;
            this.elapsedTime += Date.now() - this.startTime;
            this.startStopButton.textContent = 'Start';
            this.startStopButton.classList.remove('stop');
            this.resetButton.textContent = 'Reset';
        }
    }

    resetOrLap() {
        if (this.isRunning) {
            const lapTime = Date.now() - this.startTime + this.elapsedTime;
            this.laps.unshift(lapTime);
            this.updateLapsDisplay();
        }
        else {
            clearInterval(this.stopwatch);
            this.isRunning = false;
            this.elapsedTime = 0;
            this.laps = [];
            this.updateDisplay();
            this.updateLapsDisplay();
            this.startStopButton.textContent = 'Start';
            this.startStopButton.classList.remove('stop');
            this.resetButton.textContent = 'Reset';
        }
    }

    updateDisplay() {
        const currentTime = this.isRunning ? Date.now() - this.startTime + this.elapsedTime : this.elapsedTime;
        this.display.textContent = this.formatTime(currentTime);
        this.counter.textContent = this.formatTime(currentTime);
        this.updateProgressCirlce(currentTime);
    }

    updateLapsDisplay() {
        this.lapsContainer.innerHTML = '';
        
        const lapsToDisplay = this.laps.slice(0, 7);
        
        lapsToDisplay.forEach((lap, index) => {
            const lapEl = document.createElement('div');
            lapEl.classList.add('lap');
            lapEl.innerHTML = `
                <span>Lap ${this.laps.length - index}</span>
                <span>${this.formatTime(lap)}</span>
            `;
            this.lapsContainer.appendChild(lapEl);
        });
    }

    formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }

    updateProgressCirlce(time) {
        const seconds = time / 1000;
        const totalDuration = 60;
        const circumference = 2 * Math.PI * 90;
        const progress = seconds % totalDuration;
        const offset = circumference - (progress / totalDuration) * circumference;

        const foregroundCircle = document.querySelector('.progress-circle-foreground');
        foregroundCircle.style.strokeDashoffset = offset;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById("display");
    const startStopButton = document.getElementById("start");
    const resetButton = document.getElementById("reset");
    const lapsContainer = document.getElementById("laps");
    const progressCircle = document.getElementById("progress-circle");
    const counter = document.getElementById("counter");

    new Stopwatch(display, startStopButton, resetButton, lapsContainer, progressCircle, counter);
});