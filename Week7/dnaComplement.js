// Monday 1:00pm Algorithm Assessment&Exam
// Background
// Deoxyribonucleic acid (DNA) is a chemical found in the nucleus of cells and carries the "instructions" for the development and functioning of living organisms.

// If you want to know more http://en.wikipedia.org/wiki/DNA

// DNA is created by two strands of nucleotides that are bonded together in complementary pairs. For each base on one side, there is an opposite base on the other side. There are 4 symbols used to represent the bases, A, T, C, and G.

// Symbols A and T are complements of each other, as are C and G.

// Task
// You have function with one side of the DNA, you need to get the other complementary side. The DNA strand may be empty if there is no DNA at all. In this case, you can simple return the empty string.

// Specification
// dnaComplement(dna)
// Parameters
// dna: String - DNA strand

// Return Value
// String - A new string generated by returning the complement of the input strand.

// Constraints
// It will always be a string, but it might be empty.

// It will never be null/nil or undefined.

// Examples
// dna	Return Value
// "A"	"T"
// "T"	"A"
// "C"	"G"
// "G"	"C"
// "ATTGC"	"TAACG"
// ""	""

// solution1
const dnaComplement = (dna) => {
  let newString = "";
  for (let i = 0; i < dna.length; i++) {
    let char = dna[i];
    if (char === "A") {
      newString += "T";
    } else if (char === "T") {
      newString += "A";
    } else if (char === "C") {
      newString += "G";
    } else if (char === "G") {
      newString += "C";
    }
  }
  return newString;
};

console.log(dnaComplement(""));

// Solution 2
function dnaComplement(dna) {
  return dna
    .split("")
    .map((nucleotide) => {
      switch (nucleotide) {
        case "A":
          return "T";
          break;
        case "T":
          return "A";
          break;
        case "C":
          return "G";
          break;
        case "G":
          return "C";
          break;
        default:
          return "";
      }
    })
    .join("");
}

// Solution3
function dnaComplement(dna) {
  const complement = { A: "T", T: "A", C: "G", G: "C" };
  return dna
    .split("")
    .map((nucleotide) => complement[nucleotide])
    .join("");
}
