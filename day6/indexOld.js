const fs = require('fs');
const file = './test.txt';

function day6() {

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by comma and map to Number
        const arr = data.split(',').map(Number);

        let i = 0
        let days = 256
        let fishArrs = [{
                start: i, 
                array: arr
            }]

        while(i < days){
            //console.log('Day ', i)
            //console.log(arr)
            console.log(i)
            console.log(fishArrs[0].array.length)
            console.log(fishArrs.length)

/*             const memory = process.memoryUsage();
            console.log((memory.heapUsed / 1024 / 1024 / 1024).toFixed(4), 'GB'); */
            fishArrs.forEach(obj=>{
                for(let x = obj.start; x < obj.array.length; x++){
                    obj.array[x] = obj.array[x] - 1
                    if(obj.array[x] < 0) {
                        obj.array[x] = 6
                        //had to put 9 because loop would decrease when added
                        obj.array.push(9)
                    }
                }

                //if the array is greater than 10000000, then split into 2 arrays for processing
                if(obj.array.length > 100000){
                    fishArrs.push({
                        start: i,
                        array: arr.splice(0,100000)
                    })
                }

            })


            i++
        }

        return arr.length

    } catch (err) {
        console.error(err);
    }
}

console.log(day6())