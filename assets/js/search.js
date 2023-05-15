// import { showMembers } from "./show-members.js";
import { filterMembers } from "./filter.js";
import { sortAndShowMembers } from "./sort.js";
import { members } from "./api.js";

let globalFilteredMembers;

//This variable (array) gets exported to filterMembers to get filtered. We had to export it instead of sending it as an argument, because the latter didn't work.
export let membersToFilter;

function searchbarAndFilter() {
	const inDebt = document.querySelector("#checkbox-in-debt");
	// Get current selected filter and search value
	const filter = document.querySelector("#filter").value;
	const searchValue = document.querySelector("#search").value.toLowerCase();

	let filteredMembers = "";

	//If inDebt is checked, then filter the global member array and get a filtered array of only indebted members. Store the indebted members array in membersToFilter variable for export in filterMembers()
	//Else if inDebt is unchecked, filter the whole global member array.
	//We filter by using the value of filter
	if (inDebt.checked === true) {
		const membersInDebtArr = members.filter((member) => member.hasPayed === false);
		membersToFilter = membersInDebtArr;
		filteredMembers = filterMembers(filter);
	} else if (inDebt.checked === false) {
		membersToFilter = members;
		filteredMembers = filterMembers(filter);
	}

	// Create list by searching through filtered list members properties
	const searchedMembers = searchMemberProperties(filteredMembers, searchValue);
	// Sort and Update view
	globalFilteredMembers = filter == "all" || searchValue ? searchedMembers : null;
	sortAndShowMembers(globalFilteredMembers);
}

function searchMemberProperties(filteredMembersArr, searchValue) {
	// Filters members by searching through every property
	const searchMembers = filteredMembersArr.filter((member) => {
		for (const key in member) {
			// Skips the keys image and uid
			if (["image", "uid"].includes(key)) continue;
			const value = member[key];
			// Checks strings and arrays for a match and returns true if found
			if (typeof value === "string" && value.toLowerCase().includes(searchValue)) return true;
			if (Array.isArray(value) && value.some((index) => index.toLowerCase().includes(searchValue))) return true;
		}
		return false;
	});
	// Returns filtered members
	return searchMembers;
}



// let globalFilteredMembers;

// function searchbarAndFilter() {
// 	// Get current selected filter and search value
// 	const filter = document.querySelector("#filter").value;
// 	const searchValue = document.querySelector("#search").value.toLowerCase();

// 	// Create filtered members list
// 	const filteredMembers = filterMembers(filter);

// 	// Create list by searching through filtered list members properties
// 	const searchedMembers = searchMemberProperties(filteredMembers, searchValue);

// 	if (filter == "all" || searchValue) {
// 		globalFilteredMembers = searchedMembers;
// 	} else {
// 		globalFilteredMembers = "";
// 	}

// 	// Update view
// 	// showMembers(searchedMembers);
// 	sortAndShowMembers(searchedMembers)
// }

// function searchMemberProperties(array, searchValue) {
// 	const searchMembers = [];

// 	// Loops through every member
// 	for (const member of array) {
// 		// Loops through every key in current member
// 		for (const key in member) {
// 			const value = member[key];
// 			//Checks strings for a match
// 			if (typeof value === "string") {
// 				if (checkString(value)) {
// 					searchMembers.push(member);
// 					break;
// 				}
// 				// Checks arrays for a match
// 			} else if (typeof value === "object") {
// 				if (checkArray(value)) {
// 					searchMembers.push(member);
// 					break;
// 				}
// 			}
// 		}
// 	}
// 	return searchMembers;

// 	function checkString(string) {
// 		return string.toLowerCase().includes(searchValue);
// 	}

// 	function checkArray(array) {
// 		// Checks indexes in array, if one matches, stops and returns true
// 		return array.some(index => index.toLowerCase().includes(searchValue));
// 	}
// }

export { searchbarAndFilter, globalFilteredMembers };
