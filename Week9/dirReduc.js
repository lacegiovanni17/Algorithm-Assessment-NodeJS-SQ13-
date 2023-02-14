//Tuesday solution to week9
// write a solution in javascript:
// Background
// We are given directions to go from one point to another.
//The directions are "NORTH", "SOUTH", "WEST", "EAST".
//Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too.
//Going one direction and coming back the opposite direction is a wasted effort,
//so let's concise these directions to go the shortest route.

// For example, given the following directions:

// plan = ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]
// You can immediately see that going "NORTH" and then "SOUTH" is not
//reasonable, better stay to the same place!
// So the task is to reduce a simplified version of the plan.
//A better plan in this case is simply:

// plan = ["WEST"]
// Other examples:
// In ["NORTH", "SOUTH", "EAST", "WEST"], the direction "NORTH" + "SOUTH"
//is going north and coming back right away.What a waste of time!
//Better to do nothing.The path becomes["EAST", "WEST"], now "EAST" and "WEST"
//annihilate each other, therefore, the final result is[](nil in Clojure).
// In ["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"], "NORTH" and "SOUTH"
//are not directly opposite but they become directly opposite after
//the reduction of "EAST" and "WEST" so the whole path is reducible to["WEST", "WEST"].

// Task
// You have to write a function dirReduc which will take an array of strings
//and returns an array of strings with the needless directions removed(W < -> E or S < -> N
// side by side).

// The Haskell version takes a list of directions with data
//Direction = North | East | West | South.The Clojure version returns
//nil when the path is reduced to nothing.

// Specification
// dirReduc(directions)
// Parameters
// directions: Array<String> - An array with each index containing 1 of
//the 4 cardinal directions, all in uppercase

// Return Value
// Array<String> - The optimized set of instructions

// Examples
// directions	                                                                  Return Value
// ["NORTH","SOUTH","SOUTH","EAST","WEST","NORTH","WEST"]	    will return =          ["WEST"]
// ["NORTH","SOUTH","SOUTH","EAST","WEST","NORTH"]	                   will return =      []
// ["NORTH","WEST","SOUTH","EAST"]	                      will return =   ["NORTH","WEST","SOUTH","EAST"]
// Note
// Not all paths can be made simpler.

// The path ["NORTH", "WEST", "SOUTH", "EAST"] is not reducible.
//"NORTH" and "WEST", "WEST" and "SOUTH", "SOUTH" and "EAST" are not
//directly opposite of each other and can't become such. Hence the
//result path is itself: ["NORTH", "WEST", "SOUTH", "EAST"].

//solution1
const dirReduc = (directions) => {
    let newArr = [];
    for (let i = 0; i < directions.length; i++) {
        if (directions[i] === "NORTH" && directions[i + 1] === "SOUTH") {
            i++;
        } else if (directions[i] === "SOUTH" && directions[i + 1] === "NORTH") {
            i++;
        } else if (directions[i] === "EAST" && directions[i + 1] === "WEST") {
            i++;
        } else if (directions[i] === "WEST" && directions[i + 1] === "EAST") {
            i++;
        } else {
            newArr.push(directions[i]);
        }
    }
    return newArr;
};

//solution2
/**
 * Removes redundancies from an array of direction strings
 * with values ("NORTH", "SOUTH", "EAST", "WEST").
 *
 * @param {string[]} directions - The array of direction strings.
 * @returns {string[]} The reduced array of direction strings.
*/
function dirReduc(directions) {
  const opposite = {
    NORTH: "SOUTH",
    SOUTH: "NORTH",
    WEST: "EAST",
    EAST: "WEST"
  };
  let result = [];
  for (let i = 0; i < directions.length; i++) {
    if (result.length > 0 && result[result.length - 1] === opposite[directions[i]]) {
      result.pop();
    } else {
      result.push(directions[i]);
    }
  }
  return result;
}

