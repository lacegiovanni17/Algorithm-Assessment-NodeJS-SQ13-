// Task
// You are given an array of up to four non-negative integers,
//each less than 256.

// Your task is to pack these integers into one number M so that
//the first element of the array occupies the first(or least
//significant) 8 bits of M; the second element occupies next
//8 bits, and so on.

// Return the obtained integer M as unsigned integer.

// Note
// As indicated the first 8 bits are the least significant
//bits of M, meaning the right - most bits of the integer.
// For further clarification see the following example.

// Specification
// arrayPacking(array)
// Parameters

// array: Array<Number> - up to four unsigned integers

// Return Value

// Number - an unsigned integer

// Constraints

// array.length == 3

// 0 ≤ array[i] < 256

// Example
// For [24, 85, 0] the output should be 21784

// [24,       85,       0       ] - The initial array
// [00011000, 01010101, 00000000] - Translate each number to Binary
//    000000000101010100011000    - Compact to a single number
//             21784              - Translate to Decimal

//Solution


const arrayPacking = (integers) => {
  function pad(numString) {
    console.log(numString.length);
    if (numString.length < 8) {
      let arr = numString.split("");
      let length = 8 - arr.length;
      for (let i = 0; i < length; i++) {
        arr.unshift(0);
      }
      return arr.map((e) => +e);
    }
  }
  let toBinary = integers.map((num) => {
    let binary = num.toString(2);
    if (binary.length < 8) {
      return pad(binary);
    }
  });
  let result = Number("0b" + toBinary.reverse().join(",").split(",").join(""));
  return result;
};
console.log(arrayPacking([24, 85, 0]));
