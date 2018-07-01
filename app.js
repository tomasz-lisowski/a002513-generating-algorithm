// 1, 1, 3, 4, 9, 12, 23, 31, 54, 73
// first ask for the degree to be computed

var polynomialDegree = 0;

console.log("\n" + "Input degree of polynomial: ");
console.log("═══════════════════════════");
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
	polynomialDegree = d.toString().trim();
	compute(polynomialDegree);
});

// create all arrays
var integerSet = [];
var masterSet = [];

var UrArray = [];
var RrArray = [];

var UiArray = [];
var RiArray = [];

var UrRrArray = [];
var UiRiArray = [];

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
		return;
	}
};

// create collection of integers to be used in current computation (appropraite for current degree)
const createIntegerSet = function () {
	for (let i = 0; i <= polynomialDegree; i++){
		// add every integer not bigger than polynomial degree to real set
		integerSet.push(i);
	}
}

// run loops for all integers in integer sequence
// these loops create arrays axlusive to only one type of root combination
// (no higher numerals will be used in the following computation)
const initiateArrays = function (parity) {
	if (parity === 'odd' || parity === 'even') {
		// initiate real arrays
		integerSet.forEach(function(Ur) {
			if (Ur !== 0 ) {
				UrArray.push([Ur, 0, 0, 0]);
			}
		});
		integerSet.forEach(function(Rr) {
			if (Rr !== 0 && Rr % 2 === 0 ) {
				RrArray.push([0, Rr, 0, 0]);
			}
		});
		// initiate imaginary arrays
		integerSet.forEach(function(Ui) {
			if (Ui !== 0 && Ui % 2 === 0) {
				UrArray.push([0, 0, Ui, 0]);
			}
		});
		integerSet.forEach(function(Ri) {
			if (Ri !== 0 && Ri % 4 === 0) {
				RrArray.push([0, 0, 0, Ri]);
			}
		});
	}
};

// find the answer
const compute = function (polynomialDegree) {
	createIntegerSet();
	initiateArrays(checkDegreeParity(polynomialDegree));

	// for every element in Ur check if a repeated root could appear
	for (let i = 0; i < UrArray.length; i++) {
		for (let j = 2; j <= polynomialDegree; j = j + 2) {
			if ((UrArray[i][0] + j) === polynomialDegree) {
				masterSet.push([UrArray[i][0], j, 0, 0]);
			}
		}
	}

	// for every element in Ui check if a repeated root could appear
	for (let i = 0; i < UiArray.length; i++) {
		for (let j = 2; j <= polynomialDegree; j = j + 2) {
			if ((UiArray[i][2] + j) === polynomialDegree) {
				masterSet.push(0, 0, [UiArray[i][2], j]);
			}
		}
	}

	// combine arrays to master array (answer)
	masterSet.push(...UrRrArray);
	masterSet.push(...UiRiArray);

	masterSet.push(...UiArray);
	masterSet.push(...RiArray);

	masterSet.push(...UrArray);
	masterSet.push(...RrArray);

	// print out the answer
	console.log(masterSet);
	console.log(masterSet.length);
	console.log("═══════════════════════════");

	// clear arrays after computation
	integerSet = [];
	masterSet = [];

	UrArray = [];
	RrArray = [];

	UiArray = [];
	RiArray = [];

	UrRrArray = [];
	UiRiArray = [];
};

// NOTE:
//	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Ur_x : x unique real roots
// Rr_x : x repeated real roots
// Ui_x : x unique imaginary roots
// Ur_x : x repeated imaginary roots
