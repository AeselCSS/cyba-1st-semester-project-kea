import { members } from "./api.js";

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

export { filterMembers };
