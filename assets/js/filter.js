import { members } from "./api.js";
import { showMembers } from "./show-members.js";

function filterChange(event) {
	const filter = document.querySelector("#filter").value;
	console.log("current filter: " + filter);

	if (filter === "all") {
		showMembers(members);
	} else {
		const filteredMembers = members.filter(filterProperty);
		showMembers(filteredMembers);

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

export { filterChange };
