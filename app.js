var stdin = process.openStdin();

stdin.addListener("data", function(d) {
  console.log("Input degree of polynomial: ")
  console.log("you entered: [" +
  d.toString().trim() + "]");
});
