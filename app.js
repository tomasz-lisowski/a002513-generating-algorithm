var stdin = process.openStdin();

console.log("Input degree of polynomial: ")
stdin.addListener("data", function(d) {
    console.log(d.toString().trim());
});
