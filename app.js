/*
	1, 1, 3, 4, 9, 12, 23, 31, 54, 73
	0  1  2  3  4  5   6   7   8   9

    NOTE:
	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
	‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
	Ur_x : x unique real roots
	Rr_x : x repeated real roots (multiple Rr groups inside array)
	Ui_x : x unique imaginary roots
	Ur_x : x repeated imaginary roots
*/

var fs = require('fs');

const { PerformanceObserver, performance } = require('perf_hooks');
const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

/*
    first ask for the degree to be computed
    print out what is asked from the user
*/
console.log("\n" + "Input degree of polynomial: ");
console.log("═══════════════════════════");
// allow input
var stdin = process.openStdin();
// listen for input
stdin.addListener("data", function(input) {
	// make data type an integer and a constant
	const polynomialDegree = Number(input.toString().trim());
	// check if input is equal to zero
	if (polynomialDegree === 0) {
		console.log(1);
		console.log("═══════════════════════════");
	}
	// otherwise just compute
	else {
		compute(polynomialDegree);
	}
});

// find the answer
function compute (degree) {
	// start time for computation
	performance.mark('A');

	// keep parity as a local constant
	let parity = checkParity(degree);
	let combinationArray = createCombinationArray(degree);
    combinationArray = filterArray(combinationArray, degree);
	// print out the answer
	//console.log(combinationArray);
	console.log(combinationArray.length);
	// end time for computation
	performance.mark('B');
	// instruct what to measure
	performance.measure('A to B', 'A', 'B');
	console.log("═══════════════════════════");
};

// create all possible combinations for a given polynomial degree
function createCombinationArray (degree) {
	let array = [];
	let integers = [];
	// generate integers used to create combinatorics set
	for (let i = 0; i <= degree; i++) {
		integers.push(i);
	}

	// create the combinatorics set
	for (let i = 0; i < integers.length; i++) {
		// push Ur
		array.push([integers[i], 0, 0, 0]);
		for (let j = 0; j < integers.length; j++) {
			if (j !== 0) {
				// push Rr
				array.push([integers[i], integers[j], 0, 0]);
			}
			for (let k = 0; k < integers.length; k++) {
				if (k !== 0) {
					// push Ui
					array.push([integers[i], integers[j], integers[k], 0]);
				}
				for (let m = 0; m < integers.length; m++) {
					if (m !== 0) {
						// push Ur
						array.push([integers[i], integers[j], integers[k], integers[m]]);
					}
				}
			}
		}
	}

	// write all combinations to a file
	var file = fs.createWriteStream('array.txt');
	file.on('error', function(err) { /* error handling */ });
	array.forEach(function(numberSet) {
	file.write('[' + numberSet.join(', ') + '],' + '\n');
	});
	file.write(array.length)
	file.end();

	return array;
};

// is the degree odd or even?
function checkParity (number) {
	if (isNaN(number) === false) {
		// check if remainder after dividing input by 2 is not 0
		if (number % 2 !== 0) {
			return 'odd';
		}
		// check if remainder after dividing input by 2 is 0
		else if (number % 2 === 0) {
			return 'even';
		}
	}
	// it's not a number
	else {
		throw new Error('Parameter is not a number!');
	}
};

/*
    function to take a combination array and get rid of impossible scenarios
	which do not follow rules of polynomial root combinations
*/
function filterArray (array, degree) {
	/*
        count down from highest number down to 0
        to ignore any indexing problems from splicing
    */
	for (let i = array.length - 1; i > -1; i--) {
		if (
			/*
                check if all elements added together
                are not equal the polynomial degree
            */
			(array[i][0] + array[i][1] + array[i][2] + array[i][3] !== degree)
			/*
                check if all elements are zeros
                (which would suggest no roots which is invalid)
            */
		) {
			array.splice(i, 1);
		}
	}
	// set different filters for different polynomial degree parity
	for (let i = array.length - 1; i > -1; i--) {
		if (checkParity(degree) === 'even') {
			// check if there are not even number of real roots
			if (checkParity(array[i][0] + array[i][1]) !== 'even') {
				// otherwise delete that element
				array.splice(i, 1);
			}
		}
		else if (checkParity(degree) === 'odd') {
			// check if there are not odd number of real roots
			if (checkParity(array[i][0] + array[i][1]) !== 'odd') {
				// otherwise delete that element
				array.splice(i, 1);
			}
		}
	}
	return array;
function XOR(a, b) {
    return ( a || b ) && !( a && b );
}

function* partition(n) {
    "use strict";

	// check if the number to be partitioned is a positive integer
    if (n <= 0) {
		throw new Error('n must be a positive integer');
	}
	/*
        return number itself [ number ]
        basically a sum of one integer
    */
    yield [ n ];

	// working array
    let array = new Array(n);
	// set first element to be equal n
    array[ 0 ] = n;
	// fill the empty items in array with 1's
    for (let i = 1; i < n; i++) array[ i ] = 1;

	/*
        define variables at the start
        length is the amount of elements in current partition
        when returning result (-1)
    */
    let length = 0, indexPointer = 0, remainder, difference;
	/*
        check if first element did not reach 1 otherwise it reached [ 1, 1, 1.... ]
        which is the last partition
    */
    while (array[ 0 ] != 1) {
		/*
            check if at indexPointer index there is a 2 this would mean
            more integers are needed for current partition
            so length will increase by one
        */
        if (array[ indexPointer ] == 2) {
            length += 1;
            array[ indexPointer ] = 1;
            indexPointer -= 1;
        }
        // otherwise
		else {
            remainder = array[ indexPointer ] - 1;
            array[ indexPointer ] = remainder;

            difference = length- indexPointer + 1;
            /*
                a number with smaller index must have larger value
                this while loop will make sure that happens
            */
            while (difference >= remainder) {
                indexPointer += 1;
                array[ indexPointer ] = remainder;
                difference -= remainder;
            }
            length = indexPointer + (difference !== 0 ? 1 : 0);
            if (difference > 1) {
                indexPointer += 1;
                array[ indexPointer ] = difference;
            }
        }
		// add one to length to allign it with indexes
        yield array.slice(0, length + 1);
    }
	return array;
/*
a function that iterates over an array and manages situations
where a number at desired index can be partitioned
and returns all those extra elements
*/
function iterateAndPartition (array, index) {
    console.log('Iterating and Partitioning...');
    // create array where the generated partitions will be stored
    let partitions = new Array();
    /*
    iterate over every element in array to check if at index
    the number can be partitioned
    */
    let containsOne;
    for (let i; i < array.length; i++) {
        if (array[i][index] > 4) {
            for (let output of partition(array[i][index])) {
                containsOne = false;
                for (let j; j < output.length; j++) {
                    if (output[j] === 1) {
                        containsOne = true;
                        break;
                    }
                }
                if (containsOne === true) {
                    partitions.push(output);
                }
            }
            for (let i; i < partitions.length; i++) {

            }
        }
    }
    return partitions;
}
