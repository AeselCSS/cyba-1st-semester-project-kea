import { calculateMemberAge } from "./member-detailed-view.js";
import { showMembers } from "./show-members.js";
import { searchbarAndFilter, globalFilteredMembers } from "./search.js";

function sortAndShowMembers(membersArr) {
	let sortedMembersResult;
	globalFilteredMembers ? (sortedMembersResult = sortMembers(globalFilteredMembers)) : (sortedMembersResult = sortMembers(membersArr));
	showMembers(sortedMembersResult);
}

function sortMembers(membersArr) {
	let sortValue = document.querySelector("#members-sort").value;
	let isReverse = false;
	let sortedMembers;

	if (sortValue.includes("-reverse")) {
		const indexOfDash = sortValue.indexOf("-reverse");
		sortValue = sortValue.slice(0, indexOfDash);
		isReverse = true;
	}

	if (sortValue !== "dateOfBirth") {
		sortedMembers = membersArr.sort((member1, member2) => member1[sortValue].localeCompare(member2[sortValue]));
	} else if (sortValue === "dateOfBirth") {
		sortedMembers = membersArr.sort(
			(member1, member2) => calculateMemberAge(member1) - calculateMemberAge(member2)
		);
	}

	ifSortValueIncludesReverse(sortedMembers, isReverse);

	return sortedMembers;
}

function ifSortValueIncludesReverse(arr, isReverse) {
	if (isReverse) {
		arr.reverse();
	}
}

export { sortAndShowMembers };
