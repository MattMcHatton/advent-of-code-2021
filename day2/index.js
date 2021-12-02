const fs = require('fs');
const file = './input.txt';

function day2() {
    var arr = [];
    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
    
        var position = [0, 0, 0]
        // move through resulting array
        lines.forEach((line) => {
            var [dir, dist] = line.split(' ');

            if(dir == "forward"){
                position[0] += Number(dist)
                position[1] += (Number(dist))*position[2]
            } else if (dir == 'up'){
                position[2] -= Number(dist)
            } else if (dir == 'down'){
                position[2] += Number(dist)
            }

        });

        return position[0]*position[1]
    
    } catch (err) {
        console.error(err);
    }
}

console.log(day2());