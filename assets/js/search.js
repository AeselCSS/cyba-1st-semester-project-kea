import { showMembers } from "./show-members.js";
import { filterMembers } from "./filter.js";

function searchbar() {
	// Get current selected filter and search value
	const filter = document.querySelector("#filter").value;
	const searchValue = document.querySelector("#search").value.toLowerCase();

	// Create filtered members list
	const filteredMembers = filterMembers(filter);

	// Create list by searching through filtered list members properties
	const searchedMembers = searchMemberProperties(filteredMembers, searchValue);

	// Update view
	showMembers(searchedMembers);
}

function searchMemberProperties(array, searchValue) {
	const searchMembers = [];

	//TODO: Combine with filter

	// Loops through every member
	for (const member of array) {
		// Loops through every key in current member
		for (const key in member) {
			const value = member[key];
			//Checks strings for a match
			if (typeof value === "string") {
				if (checkString(value)) {
					searchMembers.push(member);
					break;
				}
				// Checks arrays for a match
			} else if (typeof value === "object") {
				if (checkArray(value)) {
					searchMembers.push(member);
					break;
				}
			}
		}
	}

	return searchMembers;

	function checkString(string) {
		return string.toLowerCase().includes(searchValue);
	}

	function checkArray(array) {
		// Checks indexes in array, if one matches, stops and returns true
		return array.some(index => index.toLowerCase().includes(searchValue));
	}
}

export { searchbar, searchMemberProperties };
