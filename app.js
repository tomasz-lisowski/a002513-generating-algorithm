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
		compute(Number(polynomialDegree));
	}
});

// create all arrays
var integerSet = [];
var masterArray = [];

var aArray = [];
var bArray = [];
var cArray = [];
var dArray = [];
var eArray = [];
var fArray = [];
var gArray = [];
var hArray = [];


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

// find the answer
const compute = function (polynomialDegree) {
	// create one sort of root combination (Ur)
	masterArray.push([polynomialDegree, 0, 0, 0]);
	// create one sort of root combination (Rr, Ui)
	for (let i = 0; i < polynomialDegree; i = i + 2) {
		if (polynomialDegree % 2 === 0) {
			masterArray.push([0, polynomialDegree, 0, 0]);
			masterArray.push([0, 0, polynomialDegree, 0]);
		}
	}
	// create one sort of root combination (Ri)
	for (let i = 0; i < polynomialDegree; i = i + 4) {
		if (polynomialDegree % 4 === 0) {
			masterArray.push([0, 0, 0, polynomialDegree]);
		}
	}
	// try if there can either be a repeated real root or two imaginary roots
	for (let i = 2; i < polynomialDegree; i = i + 2) {
		// check if first element will not equal 0 if i is subtracted from it
		if (masterArray[0][0] - i > 0) {
			// if first element will not have to equal zero
			// when i is pushed at either 2nd (Rr) or 3rd (Ui) position
			// this is possible because for both Rr and Ui
			// requirements that i must be multiple of 2 is met
			aArray.push([masterArray[0][0] - i, i, 0, 0]);
			bArray.push([masterArray[0][0] - i, 0, i, 0]);
		}
	}
	// try if there can be a multiplicity of imaginary roots
	for (let i = 4; i < polynomialDegree; i = i + 4) {
		// check if first element will not equal 0 if i is subtracted from it
		if (masterArray[0][0] - i > 0) {
			cArray.push([masterArray[0][0] - i, 0, 0, i])
		}
	}
	// make sure to run loop for every element in array A
	for (let i = 0; i < aArray.length; i++) {
		// try if a 3rd element can fit while not letting 1st or 2nd to equal 0
		for (let j = 2; j < polynomialDegree; j = j + 2) {
			// check if first element will not equal 0 if i is subtracted from it
			if (aArray[i][0] - j > 0) {
				dArray.push([aArray[i][0] - j, aArray[i][1], j, 0])
			}
			// check if second element will not equal 0 if i is subtracted from it
			if (aArray[i][1] - j > 0) {
				eArray.push([aArray[i][0], aArray[i][1] - j, j, 0])
			}
		}
	}
	// make sure to run loop for every element in array D
	for (let i = 0; i < dArray.length; i++) {
		for (let j = 4; j < polynomialDegree; j = j + 4) {
			// check if first element will not equal 0 if i is subtracted from it
			if (dArray[i][0] - j > 0) {
				fArray.push([dArray[i][0] - j, dArray[i][1], dArray[i][2], j])
			}
			// check if second element will not equal 0 if i is subtracted from it
			if (dArray[i][1] - j > 0) {
				gArray.push([dArray[i][0], dArray[i][1] - j, dArray[i][2], j])
			}
			// check if third element will not equal 0 if i is subtracted from it
			if (dArray[i][2] - j > 0) {
				hArray.push([dArray[i][0], dArray[i][1], dArray[i][2] - j, j])
			}
		}
	}

	// TODO: generate Rr, Ui and Ri for situations where one root combination has value other than 0
	// i.e [0,0,0,1] [0.4.0.0]
	// Ur is already getting generated and pushed to masterArray

	// combine arrays to master array (answer)
	masterArray.push(...aArray);
	masterArray.push(...bArray);
	masterArray.push(...cArray);
	masterArray.push(...dArray);
	masterArray.push(...fArray);
	masterArray.push(...gArray);
	masterArray.push(...hArray);


	// print out the answer
	console.log(masterArray);
	console.log(masterArray.length);
	console.log("═══════════════════════════");

	// clear arrays after computation
	integerSet = [];
	masterArray = [];

	aArray = [];
	bArray = [];
	cArray = [];
	dArray = [];
	eArray = [];
	fArray = [];
	gArray = [];
	hArray = [];
};

// NOTE:
//	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Ur_x : x unique real roots
// Rr_x : x repeated real roots
// Ui_x : x unique imaginary roots
// Ur_x : x repeated imaginary roots
