// import { showMembers } from "./show-members.js";
import { filterMembers } from "./filter.js";
import { sortAndShowMembers } from "./sort.js";
import { members } from "./api.js";

let globalFilteredMembers;

//This variable (array) gets exported to filterMembers to get filtered. We had to export it instead of sending it as an argument, because the latter didn't work.
let membersToFilter;

function searchbarAndFilter() {
	const inDebt = document.querySelector("#checkbox-in-debt");
	const competitive = document.querySelector("#checkbox-competitive");
	// Get current selected filter and search value
	const filter = document.querySelector("#filter").value;
	const searchValue = document.querySelector("#search").value.toLowerCase();

	let filteredMembers = "";

	//If inDebt is checked, then filter the global member array and get a filtered array of only indebted members. Store the indebted members array in membersToFilter variable for export in filterMembers()
	//Else if inDebt is unchecked, filter the whole global member array.
	//We filter by using the value of filter
	 const user = localStorage.getItem("user");
	 if (user === "cashier") {
	if (inDebt.checked === true) {
		console.log("inDebt checked");
		const membersInDebtArr = members.filter((member) => member.hasPayed === false);
		membersToFilter = membersInDebtArr;
		filteredMembers = filterMembers(filter);
	} else if (inDebt.checked === false) {
		console.log("inDebt unchecked");
		membersToFilter = members;
		filteredMembers = filterMembers(filter);
	} 
	} else if (user === "trainer") {
	if (competitive.checked === true) {
		console.log("competitive checked");
		const competitiveMembersArr = members.filter((member) => member.isCompetitive === true);
		membersToFilter = competitiveMembersArr;
		filteredMembers = filterMembers(filter);
	} else if (competitive.checked === false) {
		console.log("competitive unchecked");
		membersToFilter = members;
		filteredMembers = filterMembers(filter);
	}
	} else {
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

export { searchbarAndFilter, globalFilteredMembers, membersToFilter };
