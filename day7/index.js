const fs = require('fs');
const file = './input.txt';

function day7() {

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const crabs = data.split(',').map(Number);

        //sort crabs by highest num first
        crabs.sort((a, b)=> b-a);

        let best = 9999999999
        let currCrab = 0

        //since we've sorted the array, the numbers should decrease until we get to a minimum and then begin increasing again
        //once we start increasing, break the loop
        for(let x=0; x<crabs[0]; x++){
            let dist = 0
            currCrab = x;
            for(let y=0; y<crabs.length; y++){
                dist += (sumSteps(Math.abs(currCrab - crabs[y])))
                //dist += Math.abs(currCrab - crabs[y])
            }
            if(dist <= best){
                best = dist
            } else {
                break
            }
        }

        return best
    
    } catch (err) {
        console.error(err);
    }
}

function sumSteps(num){
    return (num*(num + 1))/2
}

console.log(day7());