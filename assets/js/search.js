import { showMembers } from "./show-members.js";
import { filterMembers } from "./filter.js";

function searchbar() {
	const searchValue = document.querySelector("#search").value.toLowerCase();
	const filter = document.querySelector("#filter").value;

	const filteredArray = filterMembers(filter);

	const searchArray = checkAllProperties(filteredArray);

	showMembers(searchArray);

	function checkAllProperties(array) {
		const searchArray = [];

		//TODO: Combine with filter

		// Loops through every member
		for (const member of array) {
			// Loops through every key in current member
			for (const key in member) {
				const value = member[key];
				//Checks strings for a match
				if (typeof value === "string") {
					if (checkString(value)) {
						searchArray.push(member);
						break;
					}
					// Checks arrays for a match
				} else if (typeof value === "object") {
					if (checkArray(value)) {
						searchArray.push(member);
						break;
					}
				}
			}
		}
		return searchArray;
	}

	function checkString(string) {
		return string.toLowerCase().includes(searchValue);
	}

	function checkArray(array) {
		// Checks indexes in array, if one matches, stops and returns true
		return array.some(index => index.toLowerCase().includes(searchValue));
	}
}

export { searchbar };
