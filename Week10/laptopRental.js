//Monday algorithm assessment
// Solve this in Javascript:
// You're given a list of time intervals during which
//students at a school need a laptop.These time intervals are
//represented by pairs of integers[start, end], where 0 <= start < end.
//However, start and end don't represent real times; therefore, they may be greater than 24.

// No two students can use a laptop at the same time,
//but immediately after a student is done using a laptop,
//another student can use that same laptop.For example,
//if one student rents a laptop during the time interval[0, 2],
//another student can rent the same laptop during any time interval starting with 2.

// Write a function that returns the minimum number of laptops
//that the school needs to rent such that all students
//will always have access to a laptop when they need one.

// laptopRentals(times)
// Parameters
// times: Array<Array<Number>> - A 2D array containing the
//times the student would require a laptop.

// Return Value
// Number - Minimum number of laptops the school needs to rent.

// Examples
// times	                                          Return Value
// [[0,2],[1,4],[4,6],[0,4],[7,8],[9,11],[3,10]]  will_return 	3
// [[0,4],[2,3],[2,3],[2,3]]	                  will_return   4
// [[1,5],[5,6],[6,7],[7,9]]	                    will_return 1

// Solution 1:
const laptopRentals = (times) => {
    let count = 0;
    let newArr = [];
    for (let i = 0; i < times.length; i++) {
        newArr.push(times[i][0]);
        newArr.push(times[i][1]);
    }
    newArr.sort((a, b) => a - b);
    for (let i = 0; i < newArr.length; i++) {
        if (newArr[i] === newArr[i + 1]) {
            count++;
        }
    }
    return count;
};

// Solution 2:
function laptopRentals(times) {
  let start = [];
  let end = [];
  for (let i = 0; i < times.length; i++) {
    start.push(times[i][0]);
    end.push(times[i][1]);
  }
  start.sort((a, b) => a - b);
  end.sort((a, b) => a - b);

  let i = 0;
  let j = 0;
  let laptops = 0;
  let maxLaptops = 0;

  while (i < times.length && j < times.length) {
    if (start[i] < end[j]) {
      laptops++;
      i++;
      maxLaptops = Math.max(maxLaptops, laptops);
    } else {
      laptops--;
      j++;
    }
  }

  return maxLaptops;
}
