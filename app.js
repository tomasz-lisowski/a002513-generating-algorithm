// first ask for the degree to be computed
console.log("═══════════════════════════")
var stdin = process.openStdin();
console.log("Input degree of polynomial: ")
stdin.addListener("data", function(d) {
    let polynomialDegree = d.toString().trim();
    compute(polynomialDegree);
});

// find the number of permutations
const compute = function (polynomialDegree) {
    var combinationsArray = [];
    var imaginaryArray = [];
    var realArray = [];
    // create imaginary and real root sets
    for(var i = 0;i <= polynomialDegree;i++){
        // start imagiary set with '0'
        if(i === 0){
            imaginaryArray.push(i);
        }
        // add multiples of '2' to imaginary set
        else if (i % 2 === 0) {
            imaginaryArray.push(i);
        }
        // add every integer >= to polynomial degree to real set
        realArray.push(i);
    }
    // crete combinatoric set relating each real with every imaginary number
    realArray.forEach(function(elementR) {
        imaginaryArray.forEach(function(elementI) {
            // run this if even degree
            if (polynomialDegree % 2 === 0 && elementR + elementI <= polynomialDegree) {
                if ((elementR + elementI + 2) % 2 === 0 ) {
                    combinationsArray.push([elementR,elementI]);
                }
            }
            // run this if odd degree
            else if (polynomialDegree % 1 === 0 && elementR + elementI <= polynomialDegree) {
                combinationsArray.push([elementR,elementI]);
            }
        });
    });
    combinationsArray.shift()
    console.log(combinationsArray);
    console.log("\n" + combinationsArray.length);
    console.log("═══════════════════════════")
};
