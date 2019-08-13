'use strict'

import { checkParity, XOR } from './utility.js'

function processInput () {
  // make input an integer and a constant
  console.log(process.argv.slice(2)[0])
  const polynomialDegree = Number(process.argv.slice(2)[0].toString().trim())
  // check if input is equal to zero (by definition =1)
  if (polynomialDegree === 0) {
    console.log(1)
  }
  else {
    compute(polynomialDegree)
  }
}

// main function
function compute (degree) {
  const parity = checkParity(degree)
  let arrangementArray = createSmallestCombinationArray(degree)
  // arrangementArray = filterArray(arrangementArray, degree);
  arrangementArray = iterateAndPartition(arrangementArray, 1, 2, 'real');
  // arrangementArray = iterateAndPartition(arrangementArray, 3, 6, 'imaginary');
  arrangementArray = iterateAndPartition(arrangementArray, 3, 4, 'imaginary');

  const computationJSONResult = {
    n: degree,
    combinations: {
      no: arrangementArray.length,
      list: arrangementArray
    }
  }

  // print the solution
  console.log(arrangementArray);
  console.log(arrangementArray.length)
}

/*
generate the smallest array that contains all correct root arrangements
and no groups of roots (this will come after integer partitions)

it works by following for loops until the sum of elements
(e.g. (i + j + k) => [i, j, k, 0]) is equal the polynomial degree in which
case it saves the arrangement in any other case it continues
*/
function createSmallestCombinationArray (degree) {
  console.log('Generating Combinations...')
  let output = []
  for (let i = 0; i <= degree; i++) {
    if (i < degree) {
      for (let j = 0; j <= degree; j++) {
        if (i + j < degree){
          for (let k = 0; k <= degree; k++) {
            // the exemplar sum of elements (i + j + k < degree) as described
            if (i + j + k < degree){
              for (let m = 0; m <= degree; m++) {
                if (i + j + k + m < degree){
                  continue
                } else if (i + j + k + m === degree) {
                  if (checkRootArrangement([i, j, k, m], degree, 3)) {
                    output.push([i, j, k, m])
                  }
                }
              }
            } else if (i + j + k === degree) {
              if (checkRootArrangement([i, j, k, 0], degree, 2)) {
                output.push([i, j, k, 0])
              }
            }
          }
        } else if (i + j === degree) {
          if (checkRootArrangement([i, j, 0, 0], degree, 1)) {
            output.push([i, j, 0, 0])
          }
        }
      }
    } else if (i === degree) {
      if (checkRootArrangement([i, 0, 0, 0], degree, 0)) {
        output.push([i, 0, 0, 0])
      }
    }
  }
  return output
}

/*
given a root arrangement, it will check it using appropriate conditions
that keep it true to FTA and CCRT
*/
function checkRootArrangement (arrangement, degree, position) {
  /*
  sum of real roots needs to align with the parity of the degree so this
  function checks if this is true
  */
  function checkArrangementSumParity (arrangement, degree) {
    if (checkParity(degree) === 'even') {
      if (checkParity(arrangement[0] + arrangement[1]) !== 'even') {
        return false
      }
      return true
    } else if (checkParity(degree) === 'odd') {
      if (checkParity(arrangement[0] + arrangement[1]) !== 'odd') {
        return false
      }
      return true
    }
  }
  /*
  building blocks of the arrangementCheckerConditions
  */
  const conditions = {
    rr: (arrangement) => {
      /*
      there must be atleast 2 repeated roots
      otherwise they are not repeated
      */
      !(XOR((arrangement[1] >= 2), (arrangement[1] === 0)))
    },
    ui: (arrangement) => {
      /*
      make sure there are atleast 2 Ui
      because they appear in conjugate pairs
      (there could also be none)
      */
      !(XOR(XOR((arrangement[2] === 0), (arrangement[2] === 2)), arrangement[2] >= 4))
    },
    ri: (arrangement) => {
      /*
      and in case of imaginary it will be 4
      because of conjugate pairing
      */
      !(XOR((arrangement[3] >= 4), (arrangement[3] === 0)))
    }
  }
  /*
  condition definition for arrangement checker functions
  */
  // const arrangementCheckerConditions2 = {
    upToPos0: (arrangement, degree) => {
      return true
    },
    upToPos1: (arrangement, degree) => {
      if (conditions.rr(arrangement)) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    },
    upToPos2: (arrangement, degree) => {
      if (conditions.rr(arrangement) || conditions.ui(arrangement)) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    },
    upToPos3: (arrangement, degree) => {
      if (conditions.rr(arrangement) || conditions.ui(arrangement) || conditions.ri(arrangement)) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    }
  }
  const arrangementCheckerConditions = {
    upToPos0: (arrangement, degree) => {
      return true
    },
    upToPos1: (arrangement, degree) => {
      if (
        !(XOR((arrangement[1] >= 2), (arrangement[1] === 0)))
      ) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    },
    upToPos2: (arrangement, degree) => {
      if (
        !(XOR((arrangement[1] >= 2), (arrangement[1] === 0))) ||
        !(XOR(XOR((arrangement[2] === 0), (arrangement[2] === 2)), arrangement[2] >= 4))

      ) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    },
    upToPos3: (arrangement, degree) => {
      if (
        !(XOR(XOR((arrangement[2] === 0), (arrangement[2] === 2)), arrangement[2] >= 4)) ||
        !(XOR((arrangement[1] >= 2), (arrangement[1] === 0))) ||
        !(XOR((arrangement[3] >= 4), (arrangement[3] === 0)))
      ) {
        return false
      } else {
        return checkArrangementSumParity(arrangement, degree)
      }
    }
  }

  switch (position) {
    /*
    depending on the number of generated elements,
    we choose the right set of conditions
    */
    case 0:
    return arrangementCheckerConditions.upToPos0(arrangement, degree)
    break;
    case 1:
    return arrangementCheckerConditions.upToPos1(arrangement, degree)
    break;
    case 2:
    return arrangementCheckerConditions.upToPos2(arrangement, degree)
    break;
    case 3:
    return arrangementCheckerConditions.upToPos3(arrangement, degree)
    break;
    default: false
  }
}

function * partition (n) {
  // check if the number to be partitioned is a positive integer
  if (n <= 0) {
    throw new Error('n must be a positive integer')
  }
  /*
  return number itself [ number ]
  basically a sum of one integer
  */
  // yield [ n ];

  // working array
  const array = new Array(n)
  // set first element to be equal n
  array[0] = n
  // fill the empty items in array with 1's
  for (let i = 1; i < n; i++) array[i] = 1

  /*
  define variables at the start
  length is the amount of elements in current partition
  when returning result (-1)
  */
  let length = 0; let indexPointer = 0; let remainder; let difference
  /*
  check if first element did not reach 1 otherwise it reached [ 1, 1, 1.... ]
  which is the last partition
  */
  while (array[0] !== 1) {
    /*
    check if at indexPointer index there is a 2 this would mean
    more integers are needed for current partition
    so length will increase by one
    */
    if (array[indexPointer] == 2) {
      length += 1
      array[indexPointer] = 1
      indexPointer -= 1
    }
    // otherwise
    else {
      remainder = array[indexPointer] - 1
      array[indexPointer] = remainder

      difference = length - indexPointer + 1
      /*
      a number with smaller index must have larger value
      this while loop will make sure that happens
      */
      while (difference >= remainder) {
        indexPointer += 1
        array[indexPointer] = remainder
        difference -= remainder
      }
      length = indexPointer + (difference !== 0 ? 1 : 0)
      if (difference > 1) {
        indexPointer += 1
        array[indexPointer] = difference
      }
    }
    // add one to length to allign it with indexes
    yield array.slice(0, length + 1)
  }
  return array
}

/*
a function that iterates over an array and manages situations
where a number at desired index can be partitioned
and returns all those extra elements
making sure partitions with groups
smaller than minValueInPartition are not counted
*/
function iterateAndPartition (array, index, minValueInPartition, realOrImaginary) {
  console.log('Iterating and Partitioning... ' + realOrImaginary)
  const partitionedArray = new Array()
  /*
  iterate over every element in array to check if at index
  the number can be partitioned
  */
  for (let i = 0; i < array.length; i++) {
    const partitions = []
    /*
    when the number is larger than or equal 4
    it can be partitioned without the use of 1's (groups of size 1)
    which would be incorrect as it would represent a unique root
    */
    if (array[i][index] >= (minValueInPartition * 2)) {
      // get all partitions for the number at index
      for (const output of partition(array[i][index])) {
        if (realOrImaginary === 'real') {
          // this makes sure output does not contain unique roots
          if (output[output.length - 1] >= minValueInPartition) {
            partitions.push(output)
          }
        } else if (realOrImaginary === 'imaginary') {
          /*
          this makes sure output does not contain unique roots
          and works with the type of root provided
          */
          if (
            (output[output.length - 1] >= minValueInPartition) &&
            (output[output.length - 1] % 2 === 0)
          ) {
            partitions.push(output)
          }
        }
      }
      /*
      for every partitioned element from array
      copy that element and exchange the element at chosen index
      with a partition at index j (than repeat for all partitions)
      */
      for (let j = 0; j < partitions.length; j++) {
        partitionedArray.push(array[i])
        partitionedArray[0][index] = partitions[j]
      }
    }
  }
  return array.concat(partitionedArray)
}

// is the degree odd or even?
function checkParity (number) {
  if (isNaN(number) === false) {
    // check if remainder after dividing input by 2 is not 0
    if (number % 2 !== 0) {
      return 'odd'
    }
    // check if remainder after dividing input by 2 is 0
    else if (number % 2 === 0) {
      return 'even'
    }
  }
  // it's not a number
  else {
    throw new Error('Parameter is not a number!')
  }
};

function XOR (a, b) {
  return (a || b) && !(a && b)
}

// RUN
processInput()
