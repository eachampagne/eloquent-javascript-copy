////////////////////////////////////////////////////////////////////////////////
// range ///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: start, end, and step (numbers)
 * O: an array of numbers from start to end separated by the step size, or an empty array if start and end are equal
 * C: must return empty array if start and end are equal
 * E: step could be 0 or go in the wrong direction and loop forever
 */
function range(start, end, step=start<end?1:-1) {
	if (start === end) return []; //personally I think it should return [start] if they're the same but the tests say otherwise

	if (step === 0) return []; //a step of 0 would never finish

	if ((end - start) > 0 !== step > 0) return []; //if the sign of step is opposite the direction we should be moving, the loop will never finish

	//initialize empty array
	let arr = [];

	if (step > 0) {
		//loop from start to end, counting up
		for (let i = start; i <= end; i += step) {
			arr.push(i);
		}
	} else {
		//loop from start to end, counting down. It's still += step because the step is negative
		for (let i = start; i >= end; i += step) {
			arr.push(i);
		}
	}

	//return the constructed array
	return arr;
}

////////////////////////////////////////////////////////////////////////////////
// sum /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: an array of numbers
 * O: the sum of the numbers
 * C: N/A
 * E: N/A
 */

function sum(arr) {
	//initialize sum variable to 0
	let sum = 0;

	//loop over the array
	for (let i = 0; i < arr.length; i++) {
		//add each element to the sum
		sum += arr[i];
	}
	//return the sum
	return sum;
}

////////////////////////////////////////////////////////////////////////////////
// reverseArray ////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/*
 * I: an array
 * O: a new array that contains the input elements in reverse order
 * C: may not use builtin reverse methods
 * E: N/A
 */
function reverseArray(arr) {
	//initialize new empty array
	let newArr = [];

	//loop over input array in reverse
	for (let i = arr.length - 1; i >= 0; i--) {
		//push each element to the new array
		newArr.push(arr[i]);
	}

	//return the new array
	return newArr;
}

////////////////////////////////////////////////////////////////////////////////
// reverseArrayInPlace /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: an array
 * O: no return value, but reverses the array in place
 * C: must reverse in place; may not use builtin reverse methods
 * E: N/A
 */
function reverseArrayInPlace(arr) {
	//figure out which index is the "halfway" point (can ignore the center element in an array with odd length)
	let midpoint = Math.floor((arr.length - 1) / 2);

	//count over half of the array
	for (let i = 0; i <= midpoint; i++) {
		//reverse the element counting from the front of the element with the corresponding element counting from the back
		let placeholder = arr[i];
		arr[i] = arr[arr.length -1 - i];
		arr[arr.length -1 - i] = placeholder;
	}

	//no return statement because this function works in place

}

////////////////////////////////////////////////////////////////////////////////
// arrayToList /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: an array of values
 * O: a list of the same values
 * C: N/A
 * E: empty input array
 */
function arrayToList(arr) {
	if (arr.length === 0) return undefined; //I'm not sure this is exactly right, but I have to do something to handle an empty input
	if (arr.length === 1) { //base case
		return {
			value: arr[0],
			rest: null
		};
	} else { //recursive case
		return {
			value: arr[0],
			rest: arrayToList(arr.slice(1))
		};
	}
	//you could also solve this by working backwards from the end of the array and using prepend()
}

////////////////////////////////////////////////////////////////////////////////
// listToArray /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a list object
 * O: an array of all the list's values
 * C: N/A
 * E: N/A
 */
function listToArray(list) {
	if (list.rest === null) { //base case
		return [list.value];
	} else { //recursive case
		return [list.value].concat(listToArray(list.rest));
	}
}

////////////////////////////////////////////////////////////////////////////////
// prepend /////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a value to prepend, and an existing list to prepend it to
 * O: a new list with the value prepended to the input list
 * C: N/A
 * E: N/A
 */
function prepend(value, list) {
	//return an object literal
	return {
		value: value,
		rest: list
	};
}

////////////////////////////////////////////////////////////////////////////////
// nth /////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: a list object, and a number representing a index in the list
 * O: the value at the given index of the input list
 * C: N/A
 * E: Must handle if giving index is past the end of the list
 */
function nth(list, index) {
	//negative index values are meaningless
	if (index < 0) return undefined;
	//if index is 0, we're at the correct place in the list so return the value
	if (index === 0) return list.value;
	//if we haven't reached index but have reached the end of the list, return undefined
	if (list.rest === null) return undefined;
	//otherwise, search the next node in the list and decrement the index by 1 
	return nth(list.rest, index - 1);
}

////////////////////////////////////////////////////////////////////////////////
// deepEqual ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * I: two values of any type
 * O: true for simple types that are equal or for objects with equal properties; false otherwise
 * C: N/A
 * E: N/A
 */
function deepEqual(item1, item2) {
	//deal with all the special cases first
	if (typeof item1 !== typeof item2) return false; //if they're of different types return false
	if (Array.isArray(item1) !== Array.isArray(item2)) return false; //if both are objects but one is an array, return false
	if (item1 instanceof Date || item2 instanceof Date) return item1 === item2; //if either is a date, return whether they're the same date
	//I feel like there are probably more special object cases besides Date
	if (item1 === null || item2 === null) return item1 === item2; //if either is null, return whether they both are

	switch (typeof item1) { //which we checked is the same as typeof item2
		//simple types can be compared directly
		case "number":
		case "string":
		case "boolean":
		case "undefined":
			return item1 === item2;
			break;
		//complex types must be compared element by element, recursively
		case "object":
			if (Array.isArray(item1)) { //which would guarantee that item2 is also an array
				if (item1.length !== item2.length) return false;

				//since we ensured they're the same length, this will check every element in both arrays
				for (let i = 0; i < item1.length; i++) {
					if (!deepEqual(item1[i], item2[i])) return false;
				}
				//only return true if every element of both arrays is deeply equal
				return true;
			} else { //normal objects - we've already ruled out arrays, dates, and null
				if (Object.keys(item1).length !== Object.keys(item2).length) return false;

				//since we checked that they have the same number of keys, we only have to check the keys on one item
				//if either has mismatched keys, they both will, so the hasOwnProperty check will catch it
				for (let key in item1) {
					if (!item2.hasOwnProperty(key)) return false;
					if (!deepEqual(item1[key], item2[key])) return false;
				}
				//only return true if every key/value pair is deeply equal
				return true;
			}
			break;
		default:
			console.log("apparently I missed a possibility");
			console.log(item1);
			console.log(item2);
	}
}

////////////////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

if ((typeof process !== 'undefined') &&
  (typeof process.versions.node !== 'undefined')) {
  module.exports = {
    range,
    sum,
    reverseArray,
    reverseArrayInPlace,
    arrayToList,
    listToArray,
    prepend,
    nth,
    deepEqual,
  };
};
