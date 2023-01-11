// Tuesday 13 Dec Algorithm Assessment

// Task
// You've been tasked with writing an autocorrect service for
//messages sent by your legal team.The messages which are sent
//to other lawyers need to be updated so that each message sent
//references the lawyer's client for clarity. To do this you
//need to replace all instances of "you" and its misspellings with "your client".

// Complete the function so that it takes a string and replaces
// all instances of "you", "youuu", or "u"(not case sensitive)
//with "your client"(always lower case).

// Return the resulting string.

// The Catch
// Here's the slightly tricky part: These are informal messages,
//so there are different forms of "you" and "u".

// For the purposes of this task, here's what you need to support:

// "youuuuu" with any number of "u" characters tacked onto the end
// "u" at the beginning, middle, or end of a string, but NOT part of a word
// "you" but NOT as part of another word like "young" or "Bayou"
// Specification
// autocorrect(input)
// Parameters
// input: String - the text to be autocorrected

// Return Value
// String - The autocorrected text

// Examples
// input	Return Value
// "We have sent the deliverables to you."	"We have sent the
//deliverables to your client."
// "Our team is excited to finish this with you."
//"Our team is excited to finish this with your client."

Solution 1
// /**
//  * Replaces all instances of "you" and its misspellings with "your client".
//  *
//  * @param {string} text - The string to correct.
//  * @returns {string} The corrected string.
// */
const correction = (text) => {
  let copyText = text;
  let splittedText = copyText.split(" ");
  splittedText;
  for (let i = 0; i < splittedText.length; i++) {
    let word = splittedText[i];
    if (
      word.toLowerCase().replace(/u/g, "") === "yo" ||
      word.toLowerCase().replace(/u/g, "") === "yo."
    ) {
      newWord = word.replace(word, "your client");
      splittedText[i] = newWord;
      copyText = splittedText.join(" ");
    }
    if (word.toLowerCase() === "u" || word.toLowerCase() === "u.") {
      newWord = word.replace(word, "your client");
      splittedText[i] = newWord;
      copyText = splittedText.join(" ");
    }
  }
  console.log(text[text.length - 1]);
  if (text[text.length - 1] === "." && copyText[copyText.length - 1] !== ".")
    return copyText + ".";
  return copyText;
};
console.log(correction("I called to talk to u."));

Solution 2

const autocorrect = input => input.replace(/\b(u|you+)\b/gi, "your client");