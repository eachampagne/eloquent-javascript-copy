// /////////////////////////////////////////////////////////////////////////////
// flatten /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

/*
 * I: a nested array
 * O: a one-dimensional array containing all the elements of the input array
 * C: N/A
 * E: N/A
 */
function flatten(array) {
	//initialize empty array
	let flat = [];

	//loop over each element in the array
	for (let i = 0; i < array.length; i++) {
		//if a given element is a subarray, flatten it and concatenate it with the existing flattened array
		if (Array.isArray(array[i])) {
			flat = flat.concat(flatten(array[i]));
		} else {
			//otherwise add each element to the flattened array
			flat.push(array[i]);
		}
	}

	//return the flattened array
	return flat;
}

// /////////////////////////////////////////////////////////////////////////////
// loop ////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

/*
 * I: an initial value, a test function, an update function, and a body function
 * O: none, but may have side effects depending on the functions passed
 * C: N/A
 * E: N/A
 */
function loop(value, testFunc, updateFunc, bodyFunc) {
	//use a while loop to loop as long as the test function passes
	while (testFunc(value)) {
		//run the body function (the primary behavior of the loop function)
		bodyFunc(value);
		//update the value using the update function
		value = updateFunc(value);
	}
}

// /////////////////////////////////////////////////////////////////////////////
// every ///////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

/*
 * I: an array and a test function
 * O: true if every element in the array passes the test function, false otherwise
 * C: N/A
 * E: N/A
 */
function every(array, test) {
	//a one-line solution using some is possible:
	//return !array.some((elem) => !test(elem));
	
	//loop over every element in the array
	for (let i = 0; i < array.length; i++) {
		//if any element fails, return false immediately
		if (!test(array[i])) {
			return false;
		}
	}
	//return true only if every element passes
	return true;
}

// /////////////////////////////////////////////////////////////////////////////
// dominantDirection ///////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

/*
 * I: a unicode string
 * O: "ltr", "rtl", or "ttb" depending on the most prevalent writing direction of the characters in the input string. "none" if no scripts are identified in the input string at all.
 * C: N/A
 * E: N/A
 */
function dominantDirection(string) {
	//countBy returns an array of objects of form [{name: dir, count: #}, ...]
	//the filter just removes the {name: none, count: #} element, if it exists, which would count the number of characters not identified with a script
	//this part is based closely upon the example in the textbook for counting the number of characters of each script type
	//but the countBy callback function is rewritten to bin by direction, rather than script name
	let directionCounts = countBy(string, char => {
		let script = characterScript(char.codePointAt(0));
		return script ? script.direction : "none";
	}).filter((elem) => elem.name !== "none");

	//use reduce to figure out which direction is most common, then pull out the name property (which in this case, refers to the direction. countBy just calls its bins "name")
	let maxDir = directionCounts.reduce(
		(accum, current) => current.count > accum.count ? current : accum,
		{name: "none", count: 0}
	).name;

	return maxDir;
}

// /////////////////////////////////////////////////////////////////////////////
//  //////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  module.exports = {
    flatten,
    loop,
    every,
    dominantDirection,
  };
};
