// //Tuesday Algorithm Assessment questions
// Task
// Modify the order of a linked list in the following
//pattern, adding the current node to the
//result list after every step:

// Start at the head
// Take two steps forward
// Take one step back
// Take three steps forward
// Go to step 3 unless outside end of list
// Add unvisited element at end of list to result, if any
// Example 1
// input:  0->1->2->3->4->5->6->7->8->NULL
// output: 0->2->1->4->3->6->5->8->7->NULL
// Example 2
// input:  0->1->2->3->4->5->6->7->NULL
// output: 0->2->1->4->3->6->5->7->NULL
// Notes
// Your algorithm should be in place i.e
//return /modify the original linked list.

// The linked list can be null.

// The parameter list can be as long as 107 elements.
//Solution 1
function staggerLinkedList(head) {
    if (!head) {
        return head;
    }
    let result = head;
    let current = head;
    let next = head.next;
    let prev = null;
    let count = 0;
    while (current) {
        if (count % 2 === 0) {
            if (next) {
                current.next = next.next;
                next.next = current;
                if (prev) {
                    prev.next = next;
                }
                prev = current;
                current = current.next;
                if (current) {
                    next = current.next;
                }
            } else {
                current = current.next;
            }
        } else {
            current = current.next;
        }
        count++;
    }
    return result;
}

module.exports = staggerLinkedList;