import { members } from "./api.js";
import { showMembers } from "./show-members.js";

function searchbar() {
	const searchValue = document.querySelector("#search").value.toLowerCase();

	const searchArray = checkAllProperties();
	showMembers(searchArray);

	function checkAllProperties() {
		const searchArray = [];

		//TODO: Combine with filter

		// Loops through every member
		for (const member of members) {
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
