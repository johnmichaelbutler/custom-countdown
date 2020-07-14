const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = 'Countdown';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

// Define our time periods in milliseconds
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(now);

    // Populate Countdown
    countdownElementTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownElement.hidden = false;
  }, second);
}

// Take values from Forn Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  // Check for valid date
  if(countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Reset All Values
function reset() {
  // Hide Countdowns, show Input
    inputContainer.hidden = false;
    countdownElement.hidden = true;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);