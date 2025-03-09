let time = 0;
let isRunning = false;
let intervalId = null;
let laps = [];

// DOM Elements
const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsContainer = document.getElementById('lapsContainer');
const lapsList = document.getElementById('lapsList');
const themeToggle = document.getElementById('themeToggle');

// Theme handling
let isDark = false;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    updateThemeIcon();
});

function updateThemeIcon() {
    themeToggle.innerHTML = isDark 
        ? '<svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// Stopwatch functions
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(time);
}

function startStop() {
    isRunning = !isRunning;
    
    if (isRunning) {
        intervalId = setInterval(() => {
            time += 10;
            updateDisplay();
        }, 10);
        
        startStopBtn.classList.add('stop');
        startStopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        lapBtn.disabled = false;
    } else {
        clearInterval(intervalId);
        startStopBtn.classList.remove('stop');
        startStopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(intervalId);
    time = 0;
    isRunning = false;
    laps = [];
    updateDisplay();
    startStopBtn.classList.remove('stop');
    startStopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    lapBtn.disabled = true;
    lapsContainer.classList.add('hidden');
    lapsList.innerHTML = '';
}

function addLap() {
    laps.push(time);
    lapsContainer.classList.remove('hidden');
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span>Lap ${laps.length}</span>
        <span>${formatTime(time)}</span>
    `;
    
    lapsList.insertBefore(lapItem, lapsList.firstChild);
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', addLap);
resetBtn.addEventListener('click', reset);

// Initialize display
updateDisplay();
updateThemeIcon();