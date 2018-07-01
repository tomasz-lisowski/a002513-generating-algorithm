// 1, 1, 3, 4, 9, 12, 23, 31, 54, 73
// first ask for the degree to be computed
console.log("═══════════════════════════");
var stdin = process.openStdin();
console.log("Input degree of polynomial: ");
stdin.addListener("data", function(d) {
	polynomialDegree = d.toString().trim();
	compute(polynomialDegree);
});

var combinationsArray = [];
var imaginaryArray = [];
var realArray = [];

// check if sum of real and imaginary roots is not bigger than polynomial degree
const checkRootSum = function (elementR, elementI) {
	if ((elementR + elementI) <= polynomialDegree) {
		return true;
	}
};

// is the degree odd or even?
const checkDegreeParity = function () {
	if (polynomialDegree % 2 !== 0) {
		return 'odd';
	}
	else {
		return 'even';
	}
};

// compute for odd degrees
const computeForOdd = function (elementR, elementI) {
	// there will always be 1 real root
	// if there are no real roots its invalid (must intersect through x at y=0)
	if (elementR !== 0) {
		combinationsArray.push([elementR, elementI]);
	}
};

//compute for even degrees
const computeForEven = function (elementR, elementI) {
	combinationsArray.push([elementR, elementI]);
};

// create collection of integers to be used in current computation (appropraite for current degree)
const createIntegerSet = function () {
	for (let i = 0; i <= polynomialDegree; i++){
		// add every integer not bigger than polynomial degree to real set
		realArray.push(i);
		// add multiples of '2' not bigger than polynomial degree to imaginary set
		if (i % 2 === 0) {
			imaginaryArray.push(i);
		}
	}
}

// find the answer
const compute = function (polynomialDegree) {
	createIntegerSet();
	// relate each element of the real set to imaginary set
	realArray.forEach(function(elementR) {

		imaginaryArray.forEach(function(elementI) {
			// make sure that no element contains no roots i.e. elements like [0, 0]
			if (!(elementR === 0 && elementI === 0)) {
				// sum of roots cant be bigger than polynomial degree
				if (checkRootSum(elementR, elementI) === true) {
					// run for odd degree
					if (checkDegreeParity() === 'odd') {
						computeForOdd(elementR, elementI);
					}
					// run for even degree
					else {
						computeForEven(elementR, elementI);
					}
				}
			}
		});
	});
	// print out the answer
	console.log(combinationsArray);
	console.log("\n" + combinationsArray.length);
	console.log("═══════════════════════════");
	// clear arrays after computation
	combinationsArray = [];
	imaginaryArray = [];
	realArray = [];
};
