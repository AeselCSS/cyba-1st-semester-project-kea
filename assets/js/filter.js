import {membersToFilter} from "./search.js"


function filterMembers(filter) {

	if (filter === "all") {
		return membersToFilter;
	} else {
		const filteredMembers = membersToFilter.filter(filterProperty);
		return filteredMembers;

		function filterProperty(member) {
			if (filter === "active") {
				return member["isActiveMember"] === true;
			} else if (filter === "inactive") {
				return member["isActiveMember"] === false;
			} else if (filter === "competitive") {
				return member["isCompetitive"] === true;
			} else if (filter === "casual") {
				return member["isCompetitive"] === false;
			} else if (filter === "male" || filter === "female" || filter === "non-binary") {
				return member["gender"] === filter;
			} else if (filter === "junior") {
				return member["agegroup"] === filter;
			} else if (filter === "senior") {
				return member["agegroup"] === filter; 
			}
		}
	}
}

export { filterMembers };
