// first ask for the degree to be computed
var stdin = process.openStdin();
console.log("Input degree of polynomial: ")
stdin.addListener("data", function(d) {
    var degree = d.toString().trim();
});

// find the number of permutations
let find = function () {
  for (i = 0; i <=degree; i++){
    console.log(i + degree)
  }
}
