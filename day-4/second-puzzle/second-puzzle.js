const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const makeBoards = (input) => {
    let boards = [];
    let currentBoard = [];

    for (let i = 0; i < input.length; i++) {
        var currentLine = input[i];
        if (currentLine) {
            var values = currentLine.split(' ').filter(value => value);
            var line = values.map(value => ({ value: parseInt(value), marked: false }));
            currentBoard.push(line);
        } else {
            boards.push(currentBoard);
            currentBoard = [];
        }
    }

    boards.push(currentBoard);
    currentBoard = [];

    return boards;
};

const findWinningBoard = (boards, numbersToMark) => {
    let numbers = numbersToMark.split(',').map(value => parseInt(value));
    let winningBoard;
    let winningNumber = 0;

    for (let i = 0; i < numbers.length; i++) {
        var currentNumber = numbers[i];
        markBoards(boards, currentNumber);
        var result = checkWinners(boards);
        if (result.winningBoards.length > 0) {
            winningNumber = currentNumber;

            for (let j = 0; j < result.winningBoardIndexes.length; j++) {
                boards.splice(result.winningBoardIndexes[j], 1);
            }

            if (boards.length === 0) {
                winningBoard = result.winningBoards[result.winningBoards.length - 1];
                break;
            }
        }
    }

    return { winningBoard, winningNumber };
};

const markBoards = (boards, number) => {
    for (let i = 0; i < boards.length; i++) {
        var currentBoard = boards[i];
        for (let j = 0; j < currentBoard.length; j++) {
            var currentLine = currentBoard[j];
            var numberInLine = currentLine.find(element => element.value === number);
            if (numberInLine) {
                numberInLine.marked = true;
            }
        }
    }
};

const checkWinners = (boards) => {
    var winningBoards = [];
    var winningBoardIndexes = [];

    for (let i = 0; i < boards.length; i++) {
        var currentBoard = boards[i];
        var allElementsAreMarked = false;

        for (let j = 0; j < currentBoard.length; j++) {
            var currentLine = currentBoard[j];

            //Procurando na linha
            allElementsAreMarked = currentLine.every(element => element.marked);
            if (allElementsAreMarked) {
                winningBoards.push(currentBoard);
                winningBoardIndexes.push(i);
                break;
            }

            //Procurando na coluna
            var columnElements = [];
            for (let k = 0; k < currentBoard.length; k++) {
                var line = currentBoard[k];
                columnElements.push(line[j]);
            }

            allElementsAreMarked = columnElements.every(element => element.marked);
            if (allElementsAreMarked) {
                winningBoards.push(currentBoard);
                winningBoardIndexes.push(i);
                break;
            }
        }
    }

    return { winningBoards, winningBoardIndexes };
};

const getWinningBoardScore = (board, winningNumber) => {
    let unmarkedNumbersSum = 0;

    for (let i = 0; i < board.length; i++) {
        var currentLine = board[i];
        var unmarkedElements = currentLine.filter(element => !element.marked);
        if (unmarkedElements.length > 0) {
            unmarkedNumbersSum += unmarkedElements.map(element => element.value).reduce((prevValue, curValue) => prevValue + curValue);
        }
    }

    return unmarkedNumbersSum * winningNumber;
};

const numbersToMark = input[0];
const boards = makeBoards(input.slice(2));
const { winningBoard, winningNumber } = findWinningBoard(boards, numbersToMark);
const score = getWinningBoardScore(winningBoard, winningNumber);
console.log(score);