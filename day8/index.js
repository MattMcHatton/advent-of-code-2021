const fs = require('fs');
const { maxHeaderSize } = require('http');
const file = './input.txt';

//0 -> 6 segments
//1 -> 2 segments UNIQUE
//2 -> 5 segments
//3 -> 6 segments
//4 -> 4 segments UNIQUE
//5 -> 5 segments
//6 -> 6 segments
//7 -> 3 segments UNIQUE
//8 -> 7 segments UNIQUE
//9 -> 6 segments

function day8_part1() {
    var signalArr = [];
    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        lines.forEach(x=>{
            [signal, output] = x.split('|')
            signalArr.push([signal, output])
        })

        let count = 0;
        signalArr.forEach(signal => {
            count += signalToNum(signal[1])
        })

        return count
    
    } catch (err) {
        console.error(err);
    }
}

function signalToNum(signal){
    let arr = signal.split(' ').filter(output => output.trim() != '')
    
    let uniqueSignals = arr.filter(x => x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7 )


    return uniqueSignals.length
}

//console.log(day8_part1());

//**********************************************************************************************************/
//**********************************************************************************************************/

function day8_part2() {
    var signalArr = [];
    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'UTF-8');
    
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        lines.forEach(x=>{
            [signal, output] = x.split('|')
            signalArr.push([signal, output])
            // signalArr = x.split('|')
            //console.log(signalArr)
        })

        let count = 0;
        let map;
        let answer;

        signalArr.forEach(signal => {
            map = mapSignal(signal[0])
            answer = decode(signal[1], map)
            count += Number(answer)
        })

        return count
    
    } catch (err) {
        console.error(err);
    }
}

function mapSignal(signal){
    let arr = signal.split(' ').filter(output => output.trim() != '')
    let map = {}
    
    let unique = [];
    let len5 = [];
    let len6 =[];

    arr.forEach(x=>{
        if(x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7){
            unique.push(x)
        } else if (x.length == 5) {
            len5.push(x)
        } else {
            len6.push(x)
        }
    })

/*  
    0: [1,1,1,1,1,1,0],
    1: [0,1,1,0,0,0,0],
    2: [1,1,0,1,1,0,1],
    3: [1,1,1,1,0,0,1],
    4: [0,1,1,0,0,1,1],
    5: [1,0,1,1,0,1,1],
    6: [1,0,1,1,1,1,1],
    7: [1,1,1,0,0,0,0],
    8: [1,1,1,1,1,1,1],
    9: [1,1,1,1,0,1,1]
 */

    //length 2 = 1
    //length 3 = 7
    //length 4 = 4
    //length 5 = 2, 3, or 5
    //length 6 = 0, 6, or 9
    //length 7 = 8
    
    //all unique first
    unique.forEach(x=>{
        if(x.length == 2){
            map[1] = sortString(x);
        } else if(x.length == 3){
            map[7] = sortString(x);
        } else if(x.length == 4){
            map[4] = sortString(x);
        } else if(x.length == 7){
            map[8] = sortString(x)
        }
    })

    //all of length 6
    len6.forEach(x=>{
        
        //either 0, 6, or 9
        let diff = compareString(x, map[8])
        //included in 4 but not 1 or 7 is 0
        //included in all is 6
        //included in none is 9

        if(map[4].includes(diff) && !map[1].includes(diff) && !map[7].includes(diff)){
            map[0] = sortString(x)
        } else if (map[4].includes(diff) && map[1].includes(diff) && map[7].includes(diff)){
            map[6] = sortString(x)
        } else {
            map[9] = sortString(x)
        }
    })

    //all of length 5
    len5.forEach(x => {
        
        //will give a char thats in 2 but not 3 or 5
        let diff_2 = compareString(map[9], map[8])
        //will give a char thats not in 5 but in 2 and 3
        let diff_5 = compareString(map[6], map[8])

        if(x.includes(diff_2)){
            map[2] = sortString(x)
        } else if (!x.includes(diff_5)){
            map[5] = sortString(x)
        } else {
            map[3] = sortString(x)
        }
    })

    return map

}

function decode(input, map){

    let num = ''
    let arr = input.split(' ').filter(output => output.trim() != '')

    arr.forEach(x => {
        num += String(getKeyByValue(map, sortString(x)))
    })

    return num

}

//due to the way the object is coded, need to find key based on value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function compareString(s1, s2) {
    let diff = ''
    let longestString = ''
    let compString = ''

    if(s1.length > s2.length) {
        longestString = s1
        compString = s2
    } else {
        longestString = s2
        compString = s1
    }

    for(let i = 0; i < longestString.length; i++){
        if(!compString.includes(longestString[i])){
            diff+=longestString[i];
        }
    }

    return diff
}

//can sort to compare because only no duplicate chars in strings
function sortString(string){
/*     let arr = string.split('');
    let sorted = arr.sort();
    let sortedString = sorted.join(''); */

    return [...string].sort().join('')
}

console.log(day8_part2());