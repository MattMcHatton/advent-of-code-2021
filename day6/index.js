const { countReset } = require('console');
const fs = require('fs');
const file = './input.txt';

function day6() {

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by comma and map to Number
        const arr = data.split(',').map(Number);

        //each index holds the count of the numbers 0-8
        let counts = [0,0,0,0,0,0,0,0,0]
        let previousCounts = []

        //initial array setup
        arr.forEach(x => {
            counts[x] += 1
        })

        let i = 0
        let days = 256

        while(i < days){
            console.log("Day ", i)
            //clone the array
            previousCounts = counts.slice()

            for(let x = 0; x < previousCounts.length; x++){

                if(x == 6) {
                    counts[6] = previousCounts[0] + previousCounts[7]
                } else if (x == 8) {
                    counts[8] = previousCounts[0]
                } else {
                    counts[x] = previousCounts[x+1]
                }
                
            }

            i++

        }

        //reduce to get sum of array
        const getSum = (num, sum) => num + sum

        return counts.reduce(getSum);

    } catch (err) {
        console.error(err);
    }
}

console.log(day6())