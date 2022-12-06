//Task
//Consider an array where each element in the array contains a positive integer digit. Taken as a whole, such an array represents a positive integer number. The rightmost position of the array represents the least siginificant digit of the number.
//An example digit array is [4, 2] which represents the integer 42.
//In this challenge, you will write a function to increment the number in the digit array by 1. For example, upArray([4, 2]) will return the array [4, 3].
//Here is the complete specification for upArray:
//upArray(arr)
//increases the digit array value by one
//Parameters
//arr: Array<Number> - an array of integers to be increased.
//Return Value
//Array<Number> - an array with the new value.
//Constraints
//Parameter array will not be empty
//Array will only contain non-negative single digit integers
//Array will not contain leading zeroes unless its length is exactly 1
//Examples
//arr           Return Value
//[5,7,4]       [5,7,5]
//[4,3,9]       [4,4,0]
//[9]           [1,0]

function upArray(arr) {
  if (arr.length === 0) return null;
  if (arr.some((x) => x < 0 || x > 9)) return null;
  if (arr.length === 1 && arr[0] === 0) return [1];
  let carry = 1;

  let reversedArr = arr.reverse();

  let output = reversedArr
    .map((x) => {
      if (carry === 0) return x;
      x += carry;
      if (x > 9) {
        x = 0;
        carry = 1;
      } else {
        carry = 0;
      }
      return x;
    })
    .reverse();

  if (carry === 1) output.unshift(1);
  return output;
}

console.log(upArray([4, 2]));
