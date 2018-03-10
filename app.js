// first ask for the degree to be computed
console.log("/-----------------")
var stdin = process.openStdin();
console.log("Input degree of polynomial: ")
stdin.addListener("data", function(d) {
  let polynomialDegree = d.toString().trim();
  console.log("============");
  find(polynomialDegree);
});

// find the number of permutations
const find = function (polynomialDegree) {
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
      combinationsArray.push([elementR,elementI]);
    });
  });
  combinationsArray.shift()
  console.log(combinationsArray);
  console.log("============");
  console.log(combinationsArray.length);
  console.log("\-----------------")
};
