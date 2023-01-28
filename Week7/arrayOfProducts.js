// Tuesday Algorithm Assessment Question
// Array Of Products
// Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output array is equal to the product of every other number in the input array.

// In other words, the value at output[i] is equal to the product of every number in the input array other than input[i].

// Sample Input
// [5, 1, 4, 2]
// Sample Output
// [8, 40, 10, 20]

// // 8 is equal to 1 x 4 x 2
// // 40 is equal to 5 x 4 x 2
// // 10 is equal to 5 x 1 x 2
// // 20 is equal to 5 x 1 x 4

// // Solution 1
function arrayOfProducts(arr) {
  let result = [];
  let product = 1;
  for (let i = 0; i < arr.length; i++) {
    result[i] = product;
    product *= arr[i];
  }
  product = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    result[i] *= product;
    product *= arr[i];
  }
  return result;
}

// // Solution 2
function arrayOfProducts(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let product = 1;
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        product *= arr[j];
      }
    }
    result.push(product);
  }
  return result;
}