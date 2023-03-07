// write the answer in JS
// Task
// Given the following class:

// class TreeNode {
//   constructor(val, left=null, right=null) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
//   }
// }
// complete the function

// const binaryTreeCompare = (a, b) => {};
// which compares the two trees defined by TreeNodes a and b and returns true if they are equal in structure and in value and false otherwise.

// For example:

//solution 1
const binaryTreeCompare = (a, b) => {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return (
    a.val === b.val &&
    binaryTreeCompare(a.left, b.left) &&
    binaryTreeCompare(a.right, b.right)
  );
};

//solution 2
const binaryTreeCompare = (a, b) => {
  if (!a && !b) {
    // both trees are empty
    return true;
  }
  if (!a || !b) {
    // one tree is empty, the other is not
    return false;
  }
  if (a.val !== b.val) {
    // values of current nodes are different
    return false;
  }
  // recursively compare left and right subtrees
  return (
    binaryTreeCompare(a.left, b.left) && binaryTreeCompare(a.right, b.right)
  );
};
