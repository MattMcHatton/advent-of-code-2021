const fs = require('fs');

const drawFile = './testDraw.txt';
const boardsFile = './testBoards.txt';

/* const drawFile = './inputDraw.txt';
const boardsFile = './inputBoards.txt';
 */

function day4() {

    try {
        // read contents of the file
        const draws = fs.readFileSync(drawFile, 'UTF-8');
        const boards = fs.readFileSync(boardsFile, 'UTF-8');
    
        // clean and store boards and drawings
        const boardsArr = cleanArray(boards,5,5);
        const drawArr = draws.split(',').map(Number);

        let bingo = false;

        let i = 0;

        let winningBoard;

        while (!bingo) {
            num = drawArr[i];

            console.log(num)

            boardsArr.forEach(board => {
                updateBoard(board, num)
                console.log(board)
                if (i > 5) {
                    console.log(checkBingo(board))
                    if(checkBingo(board)){
                        winningBoard = board
                        bingo = true
                    }
                }
            })
            i++
        }

        return sumBoard(winningBoard) * num
    
    } catch (err) {
        console.error(err);
    }
}

//takes in array, cleans it up and put into X rows by Y columns
function cleanArray(arr, x, y) {
    //clean and pull all numbers from boards
    let strArr = ''
    let newArr = arr.split(/\r?\n\n''/)

    newArr.forEach(line => {
        strArr = strArr + line.replace(/\n/g, " ")
    })

    let finalArr = strArr.split(' ')

    finalArr = finalArr.filter((x)=>{
        return x != ''
    })

    finalArr = finalArr.map(Number)
    let boardCount = finalArr.length / (x * y)
    let boards = Array(boardCount).fill([])

    let count = 0
    for(let i = 0; i<boardCount; i++){
        boards[i] = Array(x).fill([])
        for(let j = 0; j<x; j++){
            boards[i][j] = Array(y).fill([])
            for(let k = 0; k<y; k++){
                boards[i][j][k] = finalArr[count++]
            }
        }
    }

    return boards
}

//Update information on board
function updateBoard(board, num){

    for(let x=0; x<board.length; x++){
        for(let y=0; y<board[0].length; y++){
            if(board[x][y] == num){
                board[x][y] = 'XX'
            }
        }
    }

    return board
}

//Check for bingos
function checkBingo(board){
    
    //check rows for a bingo
    for(let x=0; x<board.length; x++){
        if(board[x].every(elem => elem == 'XX')){
            return true
        }
    }

    //check columns for a bingo
    for(let x=0; x<board.length; x++){
        let column = board.map(col => col[x])
        if(column.every(elem => elem == 'XX')){
            return true
        }
    }

    return false
}

function sumBoard(board) {
    let sum = 0;
    for(let x=0; x<board.length; x++){
        for(let y=0; y<board[0].length; y++){
            if(!isNaN(board[x][y])){
                sum += board[x][y]
            }
        }
    }

    return sum
}

console.log(day4());