////////////////////////////////////////////////////////////////////////////////
// min /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: two numbers
 * O: the lower of the two numbers
 * C: N/A
 * E: N/A
 */
function min(num1, num2) {
	// uses the ternary operator to determine the return value based on which is smaller
	// I <3 the ternary operator
	// technically if the two numbers are equal it returns num2
	return num1 < num2 ? num1 : num2;
}

////////////////////////////////////////////////////////////////////////////////
// isEven //////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a number (should be an integer)
 * O: true if the number is even, false if odd
 * C: must be recursive - can't use % operator
 * E: will recurse forever (or until a crash) for decimal inputs
 */
function isEven(num) {
	//base cases- 0 is even (true), 1 is odd (false)
	if (num === 0) return true;
	if (num === 1) return false;

	//otherwise use recursion. Check isEven(num - 2) for positive numbers
	//and isEven(num + 2) for negative numbers
	//use the ternary operator to determine whether to add or subtract
	return isEven(num + (num > 1 ? -2 : 2));
}

////////////////////////////////////////////////////////////////////////////////
// countChars //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a string and a character
 * O: the number of times the character occurs in the string (case sensitive)
 * C: N/A
 * E: N/A
 */
function countChars(string, char) {
	//initialize count to 0
	let count = 0;
	
	//loop over every character in the string
	for (let i = 0; i < string.length; i++) {
		//check if the character is the character we're counting
		if (string[i] === char) {
			//if so, increment the count variable
			count++;
		}
	}
	//return the count variable
	return count;
}

////////////////////////////////////////////////////////////////////////////////
// countBs /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a string
 * O: the number of capital B's in the input string
 * C: N/A
 * E: N/A
 */

function countBs(string) {
	//in the book, you write this string first, and it would be similar in structure to the countChars function, except there would be no char parameter and the if statement checks each character in the string against a literal "B"
	//but in the homework, since I've already written the countChars function, I might as well use it and just pass it "B" as the character to check for
	return countChars(string, "B");
}

////////////////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
	(typeof process.versions.node !== 'undefined')) {
	module.exports = {
		min,
		isEven,
		countBs,
		countChars,
	};
};
