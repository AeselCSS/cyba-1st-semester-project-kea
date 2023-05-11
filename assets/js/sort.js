import { calculateMemberAge } from "./member-detailed-view.js";
import { showMembers } from "./show-members.js";
import { globalFilteredMembers } from "./search.js";
import { filterMembers } from "./filter.js";

function sortAndShowMembers(membersArr) {
	const sortedMembersResult = checkSearchFilterParameter(membersArr);
	showMembers(sortedMembersResult);
}

function checkSearchFilterParameter(membersArr) {
	const filter = document.querySelector("#filter").value;
	const searchValue = document.querySelector("#search").value;

	//if filter is used but search-bar is empty, then sort the filtered array of members
	if (filter !== "all" && !searchValue) {
		const filteredMembers = filterMembers(filter);
		return sortMembers(filteredMembers);
	} else if (globalFilteredMembers) {
	// else if filter AND search-bar is used, then sort the given variable array saved in search.js
		return sortMembers(globalFilteredMembers);
	} else if (!globalFilteredMembers) {
	// else if filter AND search-bar is NOT used, then sort the given parameter.
		return sortMembers(membersArr);
	}
}

function sortMembers(membersArr) {
	let sortValue = document.querySelector("#members-sort").value;
	let isReverse = false;
	let sortedMembers;

	//if sortValue includes "-reverse", then remove the word, but remember to reverse the array in the end.
	if (sortValue.includes("-reverse")) {
		const indexOfDash = sortValue.indexOf("-reverse");
		sortValue = sortValue.slice(0, indexOfDash);
		isReverse = true;
	}
	
	//Sort if string, else number (member's age)
	if (sortValue !== "dateOfBirth") {
		sortedMembers = membersArr.sort((member1, member2) => member1[sortValue].localeCompare(member2[sortValue]));
	} else if (sortValue === "dateOfBirth") {
		sortedMembers = membersArr.sort(
			(member1, member2) => calculateMemberAge(member1) - calculateMemberAge(member2)
		);
	}

	//Reverse array if the sortValue included "-reverse" earlier
	ifSortValueIncludesReverse(sortedMembers, isReverse);

	return sortedMembers;
}

function ifSortValueIncludesReverse(arr, isReverse) {
	if (isReverse) {
		arr.reverse();
	}
}

export { sortAndShowMembers };
