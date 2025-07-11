
////////////////////////////////////////////////////////////////////////////////
// triangles ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
Directions: Create a function called `triangles` that takes in a parameter of a
number. This number determines the "size" of the triangle you need to log. 
HINT: each "level" of the triangle needs to be logged individually.

example: triangles(3);
LOGS =>

#
##
###

example: triangles(5);
LOGS =>

#
##
###
####
#####

*/

function triangles(size) {
	//string to hold the number of #'s
	let line = "";
	//loop the number of times specified by the input
	for (let i = 0; i < size; i++) {
		//lengthen the line to be printed
		line += "#";
		//print the line
		console.log(line);
	}	
}


////////////////////////////////////////////////////////////////////////////////
// fizzBuzz ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
Directions: Create a function called fizzBuzz that takes in two parameters - 
`start`, `end`. `start` and `end` both represent numbers. This function should
access each number from `start` to `end` and log different statements depending
on the number:

	- if the number is divisible by 3, log "fizz"
	- if the number is divisible by 5, log "buzz"
	- if the number is divisible by both 3 & 5, log "fizzbuzz"
	- if the number is not divisible by 3 or 5, log the number
*/

function fizzBuzz(start, end) {
	//loop from start to end (assuming start < end)
	for (let i = start; i <= end; i++) {
		//initialize empty string to be printed if the number is divisible by either 3 or 5
		let string = "";
		//add fizz to string if divisible by three
		if (i % 3 === 0) {
			string += "fizz";
		}
		//add buzz to string if divisible by five
		if (i % 5 === 0) {
			string += "buzz";
		}
		//because these are independent ifs rather than else-ifs, string will be "fizzbuzz" if the number is divisible by both 3 and five
		//log the string if it is nonempty, the number if it is
		console.log(string ? string : i);
	}	
}

////////////////////////////////////////////////////////////////////////////////
// drawChessboard //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
Directions: Create a function called drawChessboard that takes in a parameter of
`x` that represents the "size" of the chessboard you are going to log. The chessboard
will be a collection of spaces and #'s creating the appearance of a chessboard.

Note: in order to do this correctly, you need to ultimately create a string containing
linebreak characters (\n). For example, if you invoke drawChessboard(3) it should log a
string that looks like this " # \n# #\n # \n# #"

example: drawChessboard(4);
LOGS =>

 # #
# #
 # #
# #

exampmle drawChessboard(3);
LOGS =>

 # 
# #
 #

*/

function drawChessboard(x) {
	//initialize empty string to build the chessboard on
	let chessboard = "";

	//loop x times to create each row
	for (let i = 0; i < x; i++) {
		//loop x times to create square within each row
		for (let j = 0; j < x; j++) {
			//decide which character to append
			//an even sum of row and column indices gets a space, an odd gets a #
			//this means that moving along any straight line alternates black and white squares
			chessboard += (i + j) % 2 === 0 ? " " : "#";
		}
		//add a new line after every row
		//it's kind of weird that you need the trailing newline to pass the tests
		chessboard += "\n";
	}

	//log the assembled board
	console.log(chessboard);
}

////////////////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
	(typeof process.versions.node !== 'undefined')) {
	module.exports = {
		triangles,
		fizzBuzz,
		drawChessboard,
	};
}
