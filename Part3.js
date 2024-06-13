let startTime;
let updatedTime;
let difference;
let tInterval;
let savedDifference = 0;
let running = false;
let lapNumber = 0;

const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedDifference;
        tInterval = setInterval(getShowTime, 10); // start the timer
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = 'red';
        running = true;
    } else {
        clearInterval(tInterval);
        savedDifference = difference;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'green';
        running = false;
    }
}





function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hoursSpan.textContent = (hours < 10) ? "0" + hours : hours;
    minutesSpan.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsSpan.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsSpan.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    const hourDeg = ((hours % 12) * 30) + (0.5 * minutes); // Calculate hour hand rotation
    const minuteDeg = (minutes * 6) + (0.1 * seconds); // Calculate minute hand rotation
    const secondDeg = (seconds * 6) + (0.006 * milliseconds); // Calculate second hand rotation

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

function lap() {
    lapNumber++;
    const lapTime = `${hoursSpan.textContent}:${minutesSpan.textContent}:${secondsSpan.textContent}:${millisecondsSpan.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapNumber}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

function reset() {
    clearInterval(tInterval);
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = 'green';
    running = false;
    lapNumber = 0;
    savedDifference = 0;

    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    millisecondsSpan.textContent = '00';

    lapsList.innerHTML = '';

    hourHand.style.transform = 'rotate(0deg)'; // Reset hour hand to 12 o'clock position
    minuteHand.style.transform = 'rotate(0deg)';
    secondHand.style.transform = 'rotate(0deg)';
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);
