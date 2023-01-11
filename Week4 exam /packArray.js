// Tuesday Algorithm Task
// Given an array of 2k integers (for some integer k,
//which will be between 0 and 5 inclusive), perform the
//following operations until the array contains only one element:

// On the 1st, 3rd, 5th, etc. iterations (1-based) replace
//each pair of consecutive elements with their sum;
// On the 2nd, 4th, 6th, etc. iterations replace each pair
//of consecutive elements with their product.
// After the algorithm has finished, there will be a
//single element left in the array.Return that element.

// Specification
// packArray(arr)
// Parameters
// arr: Array<Number> - An array of integers to be packed

// Return Value
// Number - The final product

// Constraints
// arr.length == 2k

// 0 ≤ k ≤ 5

// -9 ≤ arr[i] ≤ 99

// Example
// For arr = [1, 2, 3, 4, 5, 6, 7, 8], the output should be 186.

// We have [1, 2, 3, 4, 5, 6, 7, 8] -> [3, 7, 11, 15]
//-> [21, 165] -> [186], so the answer is 186.

// Here is a solution using a while loop in JavaScript:

// Copy code
// function packArray(arr) {
//   let k = 0;
//   while (arr.length > 1) {
//     let newArr = [];
//     for (let i = 0; i < arr.length; i += 2) {
//       if (k % 2 == 0) {
//         newArr.push(arr[i] + arr[i + 1]);
//       } else {
//         newArr.push(arr[i] * arr[i + 1]);
//       }
//     }
//     arr = newArr;
//     k++;
//   }
//   return arr[0];
// }
// This function first initializes a variable k to 0. Then it
//enters a while loop that will continue until the length of arr is 1.
//Inside the loop, it creates a new array called newArr
//and initializes it to an empty array.It then iterates
//through arr in pairs of two elements, adding their sum or
//product to newArr, depending on the value of k.After the
//loop is finished, it assigns newArr to arr and increments k.
//Finally, it returns the first element of arr, which is
//the only element left in the array.

// Here is an example of how you can use this function:

// Copy code
// console.log(packArray([1, 2, 3, 4, 5, 6, 7, 8])); // outputs 186

// Solution

/**
 * Iteratively performs a packing operation. Until one element is left,
 * replace each pair of consecutive elements with their sum, then
 * replace each pair of consecutive elements with their product.
 *
 * @param {number[]} integers - The array to pack.
 * @returns {number} The lone element.
 */

Solution 1
const packArray = (integers) => {
  let k = 0;
  while (integers.length > 1) {
    let newArr = [];
    for (let i = 0; i < integers.length; i += 2) {
      if (k % 2 == 0) {
        newArr.push(integers[i] + integers[i + 1]);
      } else {
        newArr.push(integers[i] * integers[i + 1]);
      }
    }
    integers = newArr;
    k++;
  }
  return integers[0];
};

Solution 2
const packArrays = (integers) => {
  if (integers.length == 1) {
    let n = integers[0];
    return n;
  } else {
    const newarr = [];
    const newarr2 = [];
    let ans = 0;
    for (let i = 0; i < integers.length; i += 2) {
      newarr.push(integers[i] + integers[i + 1]);
    }
    for (let i = 0; i < newarr.length; i += 2) {
      newarr2.push(newarr[i] * newarr[i + 1]);
    }
    for (let i = 0; i < newarr2.length; i++) {
      ans = ans + newarr2[i];
    }
    return ans;
  }
  return 0;
};

Solution 3

const packArray = arr => {
  let curr = arr
  for (let i = 0; curr.length > 1; ++i) {
    const next = []
    for (let j = 0; j < curr.length; j += 2) {
      if (i & 1) {
        next.push(curr[j] * curr[j + 1])
      } else {
        next.push(curr[j] + curr[j + 1])
      }
    }
    curr = next
  }
  return curr[0]
}