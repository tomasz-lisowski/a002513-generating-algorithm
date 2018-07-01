// 1, 1, 3, 4, 9, 12, 23, 31, 54, 73
// first ask for the degree to be computed
console.log("\n" + "Input degree of polynomial: ");
console.log("═══════════════════════════");
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
	polynomialDegree = d.toString().trim();
	compute(polynomialDegree);
});

var integerSet = [];

var uniqueRealArray = [];
var repeatedRealArray = [];

var masterSet = [];

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
//(no higher numerals will be used in the following computation)
const initiateRealArrays = function (parity) {
	if (parity === 'odd') {
		integerSet.forEach(function(Ur) {
			if (Ur !== 0) {
				uniqueRealArray.push([Ur, 0, 0, 0]);
			}
		});
		integerSet.forEach(function(Rr) {
			if (Rr !== 0 && Rr % 2 === 0) {
				repeatedRealArray.push([0, Rr, 0, 0]);
			}
		});
	}
	else if (parity === 'even') {
		integerSet.forEach(function(Ur) {
			if (Ur !== 0) {
				uniqueRealArray.push([Ur, 0, 0, 0]);
			}
		});
		integerSet.forEach(function(Rr) {
			if (Rr !== 0 && Rr % 2 === 0) {
				repeatedRealArray.push([0, Rr, 0, 0]);
			}
		});
	}
};

// find the answer
const compute = function (polynomialDegree) {
	createIntegerSet();
	initiateRealArrays(checkDegreeParity(polynomialDegree));

	// for every element in Ur check if a repeated root could appear
	for (var i = 0; i < uniqueRealArray.length; i++) {
		for (var j = 2; j <= polynomialDegree; j = j + 2) {
			if ((uniqueRealArray[i][0] + j) <= polynomialDegree) {
				masterSet.push([uniqueRealArray[i][0], j, 0, 0]);
			}
		}
	}

	// formulate the answer
	masterSet.push(...uniqueRealArray);
	masterSet.push(...repeatedRealArray);
	// print out the answer
	console.log(masterSet);
	console.log(masterSet.length);
	console.log("═══════════════════════════");
	// clear arrays after computation
	integerSet = [];
	uniqueRealArray = [];
	repeatedRealArray = [];
	masterSet = [];
};

// NOTE: 
//	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Ur_x : x unique real roots
// Rr_x : x repeated real roots
// Ui_x : x unique imaginary roots
// Ur_x : x repeated imaginary roots
