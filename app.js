// 1, 1, 3, 4, 9, 12, 23, 31, 54, 73
// first ask for the degree to be computed

var polynomialDegree = 0;

console.log("\n" + "Input degree of polynomial: ");
console.log("═══════════════════════════");
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
	polynomialDegree = d.toString().trim();
	if (polynomialDegree === 0) {
		return 1;
	}
	else {
		polynomialDegree = Number(polynomialDegree);
		compute();
	}
});

// create all arrays
var masterArray = [];


// is the degree odd or even?
const checkDegreeParity = function () {
	if (isNaN(polynomialDegree) === false) {
		if (polynomialDegree % 2 !== 0) {
			return 'odd';
		}
		else if (polynomialDegree % 2 === 0) {
			return 'even';
		}
	}
	else {
		throw "Parameter is not a number!";
	}
};

// create all possible combinations for a given polynomial degree
const createMasterArray = function () {
	let output = [];
	let integers = [];
	// generate integers to use to create combinatorics set
	for (let i = 0; i <= polynomialDegree; i++) {
		integers.push(i);
	}
	// create the combinatorics set
	for (let i = 0; i <= integers.length - 1; i++) {
		if (i <= polynomialDegree) {
			// push Ur
			output.push([i, 0, 0, 0]);
			for (let j = 1; j <= integers.length - 1; j++) {
				if (!(i === 0 && j === 0)) {
					if (j <= polynomialDegree) {
						// push Rr
						output.push([i, j, 0, 0]);
					}
					for (let k = 1; k <= integers.length - 1; k++) {
						if (!(i === 0 && j === 0 && k === 0)) {
							if (k <= polynomialDegree) {
								// push Ui
								output.push([i, j, k, 0]);
							}
							for (let m = 1; m <= integers.length - 1; m++) {
								if (!(i === 0 && j === 0 && k === 0 && m === 0)) {
									if (m <= polynomialDegree) {
										// push Ur
										output.push([i, j, k, m]);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	console.log(output);
	console.log(output.length);

	var fs = require('fs');

	var file = fs.createWriteStream('array.txt');
	file.on('error', function(err) { /* error handling */ });
	output.forEach(function(v) {
		file.write('[' + v.join(', ') + '],' + '\n');
	});
	file.write(output.length)
	file.end();
};

// find the answer
const compute = function () {
	// keep parity as a local constant
	var parity = checkDegreeParity(polynomialDegree);
	createMasterArray(polynomialDegree);

	// print out the answer
	console.log(masterArray);
	console.log(masterArray.length);
	console.log("═══════════════════════════");

	// clear arrays after computation
	masterArray = [];
};

// NOTE:
//	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Ur_x : x unique real roots
// Rr_x : x repeated real roots
// Ui_x : x unique imaginary roots
// Ur_x : x repeated imaginary roots
