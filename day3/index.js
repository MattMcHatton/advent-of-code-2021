const fs = require('fs');
const file = './test.txt';

function day3() {

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
    
        // transpose array and move through to find most common number
        let gamma = ''
        let epsilon = ''

        for(let x=0; x < lines[0].length; x++){

            let count0 = 0
            let count1 = 0

            for(let y=0; y < lines.length ; y++){
                if(lines[y][x]=='0'){
                    count0 += 1
                } else {
                    count1 += 1
                }
            }

            if(count0 > count1){
                gamma += '0'
                epsilon += '1'
            } else {
                epsilon += '0'
                gamma += '1'
            }
        }

        

        return (parseInt(gamma,2) * parseInt(epsilon,2))
    
    } catch (err) {
        console.error(err);
    }
}

function reduceArray(input) {
    for(let x=0; x < array[0].length; x++){

        let count0 = 0
        let count1 = 0

        for(let y=0; y < array.length ; y++){
            if(lines[y][x]=='0'){
                count0 += 1
            } else {
                count1 += 1
            }
        }

        if(count0 > count1){
            gamma += '0'
            epsilon += '1'
        } else {
            epsilon += '0'
            gamma += '1'
        }
    }

    return reducedArray

}

console.log(day3())