import { calculateMemberAge } from "./member-detailed-view.js";
import { showMembers } from "./show-members.js";

function sortAndShowMembers(membersArr) {
	let sortValue = document.querySelector("#members-sort").value;
    let sortedMembers;
    let isToReverse = false;
	
    if (sortValue.includes("-")) {
        const indexOfDash = sortValue.indexOf("-");
        sortValue = sortValue.slice(0, indexOfDash);
        isToReverse = true;
    }

	if (sortValue !== "dateOfBirth") {
		sortedMembers = membersArr.sort((member1, member2) => member1[sortValue].localeCompare(member2[sortValue]));
	} else if (sortValue === "dateOfBirth") {
		sortedMembers = membersArr.sort(
			(member1, member2) => calculateMemberAge(member1) - calculateMemberAge(member2)
		);
	}

	
	function ifSortValueIncludesReverse() {
		if (isToReverse) {
			sortedMembers.reverse();
		}
	}

	ifSortValueIncludesReverse();
	showMembers(sortedMembers);
}

export { sortAndShowMembers };
