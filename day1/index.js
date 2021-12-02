const fs = require('fs');
const file = './input.txt';

function day1() {
    var arr = [];
    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
    
        // create array of values from file
        lines.forEach((line) => {
            arr.push(Number(line));
        });
    
        // move through array and find values that increase from previous (part 1)
        //console.log(arr);
        //starting at index 1 and comparing backwards
        var increase = 0
/*      for(let i = 1; i < arr.length; i++){
            if(arr[i]>arr[i-1]){
                increase++
            }
        } */

        // move through array and find windows that increase from previous (part 2)
        for(let i = 0; i < arr.length; i++){
            if(arr[i+3]){
                if(arr[i+1]+arr[i+2]+arr[i+3] > arr[i]+arr[i+1]+arr[i+2]){
                    increase++
                }
            }
        }


        return increase
    
    } catch (err) {
        console.error(err);
    }
}

console.log(day1());