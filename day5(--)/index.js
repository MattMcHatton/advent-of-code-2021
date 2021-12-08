const fs = require('fs');
const file = './test.txt';

function day5() {

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        let arr = []

        lines.forEach(line => {
            let values = line.split(' -> ')
            arr.push(values)
        })

        return arr
    
    } catch (err) {
        console.error(err);
    }
}

console.log(day5())