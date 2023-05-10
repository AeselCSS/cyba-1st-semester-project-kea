import { members } from "./api.js";
import { showMembers } from "./show-members.js";
import { searchMemberProperties } from "./search.js";

function filterChange() {
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

function filterMembers(filter) {
if (filter === "all") {
	return members
} else {
	const filteredMembers = members.filter(filterProperty);
	return filteredMembers

	function filterProperty(member) {
		if (filter === "active") {
			return member["isActiveMember"] === true;
		} else if (filter === "inactive") {
			return member["isActiveMember"] === false;
		} else if (filter === "competitive") {
			return member["isCompetitive"] === true;
		} else if (filter === "casual") {
			return member["isCompetitive"] === false;
		}
	}
}

}

export { filterChange, filterMembers };
