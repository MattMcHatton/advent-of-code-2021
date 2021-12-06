const fs = require('fs');
const drawFile = './testDraw.txt';
const boardsFile = './testBoards.txt';

function day4() {

    try {
        // read contents of the file
        const draws = fs.readFileSync(drawFile, 'UTF-8');
        const boards = fs.readFileSync(boardsFile, 'UTF-8');
        let newArr = ''
    
        // split the contents by new line
        const boardsArr = boards.split(/\r?\n\n''/);
        boardsArr.forEach(line => {
            newArr = newArr + line.replace(/\n/g, " ")
        })
        let evenNewerArr = newArr.split(' ')
        const drawArr = draws.split(',').map(Number);
    
        console.log(evenNewerArr)
        console.log(drawArr)

        return true
    
    } catch (err) {
        console.error(err);
    }
}

console.log(day4());