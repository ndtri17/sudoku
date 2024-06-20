//board setup
let visibilitie_board = document.querySelector('.play-game');
let visibilitie_setup = document.querySelector('.setup-game');
let visibilitie_reset_btn = document.querySelector('#reset_btn');
let visibilitie_start_btn = document.querySelector('#start_btn');
let timer = document.querySelector('.play-game span');
let cells = document.querySelectorAll('.cell');

//game setup
let intervalId;
let board = Array(81).fill('');

function showBoard() { 
    visibilitie_board.style = 'display: flex';
    visibilitie_setup.style = 'display: none';
    visibilitie_reset_btn.style = 'display: flex';
    visibilitie_start_btn.style = 'display: none';
    let selectedLevel = document.querySelector('input[name="level"]:checked').value;
    let selectedTime = document.querySelector('input[name="time"]:checked').value;
    timerStart(selectedTime);
    setupBoard()
}

function resetGame() { 
    visibilitie_board.style = 'display: none';
    visibilitie_setup.style = 'display: flex';
    visibilitie_reset_btn.style = 'display: none';
    visibilitie_start_btn.style = 'display: flex';
    clearInterval(intervalId);
}

function timerStart(value) {
    // Split the input value (e.g., '5:30') into minutes and seconds
    let [minutes, seconds] = value.split(':').map(Number);
    // Convert the time to total seconds
    let totalSecond = minutes * 60 + seconds;
    // Set the initial timer display
    timer.textContent = value;
    // Start the timer with setInterval
    intervalId = setInterval(() => {
        // Decrease the total seconds by 1
        totalSecond--
        // Check if the timer has reached zero
            // If so, clear the interval to stop the timer
            if (totalSecond == 0) { 
                clearInterval(intervalId);
                // Optionally, add logic to handle when the timer reaches zero
            }
            else {
                // Calculate minutes and remaining seconds
                let minutes = Math.floor(totalSecond / 60);
                let remainingSeconds = totalSecond % 60;
                // Update the timer display with the new time
                timer.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
    }, 1000); // Interval of 1000 milliseconds (1 second)
}


function setupBoard() {     
    for (let i = 0; i < board.length; i++) { 
        let randomNb;
        
        do { 
            randomNb = Math.floor(Math.random() * 9) + 1;
        } while ((checkDuplicateRow(i) || checkDuplicateCol(i) || checkDuplicateBox(i)));
        
        
        board[i] = randomNb;
        cells[i].textContent = randomNb;
    }
}
