document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const resetButton = document.getElementById('reset');
    const remainingAttemptsDisplay = document.getElementById('remaining');
    const completedLinesDisplay = document.getElementById('completed-lines');
    const historyList = document.getElementById('history');
    const totalClicksDisplay = document.getElementById('total-games');
    const gridSize = 5;
    const cells = [];
    let remainingAttempts = 8;
    let activeCells = 0;
    let gameHistory = [];
    let totalClicks = 0;

    // Create the bingo grid with numbers
    let number = 1;
    for (let i = 0; i < gridSize; i++) {
        cells[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.textContent = number++;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
            cells[i][j] = cell;
        }
    }

    // Handle cell click event
    function handleCellClick(e) {
        if (remainingAttempts <= 0) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (!e.target.classList.contains('active')) {
            e.target.classList.add('active');
            activeCells++;
            remainingAttempts--;
            totalClicks++; 

            // Randomly activate another cell
            while (true) {
                const randRow = Math.floor(Math.random() * gridSize);
                const randCol = Math.floor(Math.random() * gridSize);
                const randomCell = cells[randRow][randCol];
                if (!randomCell.classList.contains('active')) {
                    randomCell.classList.add('active');
                    activeCells++;
                    break;
                }
            }

            // Update remaining attempts and total clicks display
            remainingAttemptsDisplay.textContent = remainingAttempts;
            totalClicksDisplay.textContent = totalClicks;

            if (remainingAttempts === 0) {
                const completedLines = checkBingo();
                completedLinesDisplay.textContent = completedLines;
                gameHistory.push(completedLines);
                updateHistory();
                resetButton.disabled = false; // Enable reset button when attempts are 0
            }
        }
    }

    // Check for bingo lines
    function checkBingo() {
        let lines = 0;

        // Check rows
        for (let i = 0; i < gridSize; i++) {
            if (cells[i].every(cell => cell.classList.contains('active'))) {
                lines++;
            }
        }

        // Check columns
        for (let j = 0; j < gridSize; j++) {
            if (cells.every(row => row[j].classList.contains('active'))) {
                lines++;
            }
        }

        // Check diagonals
        if (cells.every((row, i) => row[i].classList.contains('active'))) {
            lines++;
        }

        if (cells.every((row, i) => row[gridSize - 1 - i].classList.contains('active'))) {
            lines++;
        }

        return lines;
    }

    // Update the history display
    function updateHistory() {
        historyList.innerHTML = '';
        gameHistory.forEach((lines, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `第 ${index + 1} 輪: ${lines} 條線`;
            historyList.appendChild(listItem);
        });
    }

    // Reset the game
    resetButton.addEventListener('click', () => {
        if (remainingAttempts > 0) return; // Prevent reset if attempts are not 0

        remainingAttempts = 8;
        activeCells = 0;
        remainingAttemptsDisplay.textContent = remainingAttempts;
        completedLinesDisplay.textContent = 0;
        cells.flat().forEach(cell => cell.classList.remove('active'));
        totalClicksDisplay.textContent = totalClicks; // Optionally keep total clicks
        resetButton.disabled = true; // Disable reset button after reset
    });

    // Initialize reset button state
    resetButton.disabled = true;
});
