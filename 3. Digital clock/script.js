function clock() {
    const clock = document.getElementById("clock");
    const dayObj = document.getElementById("day");

    function updateTime() {
        const date = new Date();
        let hours = date.getHours();
        let meridiem = (hours >= 12) ? "PM" : "AM";
        hours = hours % 12 || 12;
        hours = hours.toString().padStart(2, 0);
        const minutes = date.getMinutes().toString().padStart(2, 0);
        const seconds = date.getSeconds().toString().padStart(2, 0);
        clock.textContent = `${hours}:${minutes}:${seconds} ${meridiem}`;
    }


    function updateDay() {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, 0);
        const month = (date.getMonth() + 1).toString().padStart(2, 0);
        const year = date.getFullYear().toString().padStart(2, 0);
        dayObj.textContent = `${day}/${month}/${year}`;
    }

    return {updateTime, updateDay};
}

const clockObj = clock();
clockObj.updateTime();
clockObj.updateDay();

setInterval(clockObj.updateTime, 1000);
setInterval(clockObj.updateDay, 1000);