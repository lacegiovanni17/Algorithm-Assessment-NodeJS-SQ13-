// Tuesday 17 Jan 2023 Week 6 Algorithm Assessment. 
// Task
// Write a function that receives two strings and returns the number of characters we would need to rotate the first string forward to match the second.
// For instance, take the strings "fatigue" and "tiguefa". In this case, the first string can be rotated 5 characters forward to produce the second string, so 5 would be returned. Here are the steps:
// no rotations: "fatigue"
// 1st rotation: "efatigu" 
// 2nd rotation: "uefatig"
// 3rd rotation: "guefati"
// 4th rotation: "iguefat"
// 5th rotation: "tiguefa"
// If the second string isn't a valid rotation of the first string, the method should return -1.
// Specification
// shiftedDiff(first, second)
// computes the number of rotations to make string first equal to string second, if possible
// Parameters
// first: String - string to be rotated
// second: String - target string to be matched by rotating first
// Return Value
// Number - Number of rotations needed to turn string first into second, -1 if invalid
// Examples:
// "coffee", "eecoff" => 2
// "eecoff", "coffee" => 4
// "moose", "Moose" => -1
// "isn't", "'tisn" => 2
// "Esham", "Esham" => 0
// "dog", "god" => -1 

// Solution: 
/**
 * Returns the number of rotations it takes to
 * make two strings equal, or -1 if impossible.
 *
 * @param {string} first - The string to rotate.
 * @param {string} second - The target string to compare rotations against.
 * @returns {number} The number of rotations necessary to make first equal second, or -1 if impossible.
*/
const shiftedDiff = (first, second) => {
    let numberOfTimes = first.length;
    let numberOfRotations = 0;
    let template = first;
    while(numberOfTimes > 0){
      //do something
      let stringArray = template.split("");
      let lastChar = stringArray[stringArray.length - 1];
      if(template === second){
        return numberOfRotations;
      }else{
        //change characters and update first
        let char = stringArray.pop();
        stringArray.unshift(char);
        template = stringArray.join("");
        numberOfRotations++;
      }   
      numberOfTimes--;
    }
    return -1;
};

Solution 2

const shiftedDiff = (first, second) => {
  let copySecond = [...second];
  for (let index = 0; index < copySecond.length; index++) {
    if (first === copySecond.join("")) {
      return index;
    }
    copySecond.push(copySecond.shift());
  }
  return -1;
};

Solution 3

const shiftedDiff2 = (first, second) => {
  if (first.length === second.length) {
    return (second + second).indexOf(first);
  } else {
    return -1;
  }
};

Solution 4

const shiftedDiff3 = (first, second) => {
  return first.length === second.length ? (second + second).indexOf(first) : -1;
};

