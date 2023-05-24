import { members } from "../helpers/api.js";
import { calculateMemberAge } from "../helpers/helpers-module.js";
import { showMembers } from "./show-members.js";

function refreshFiltersAndSort() {
	const filteredMembers = filters();
	const sortedMembers = sort(filteredMembers);
	showMembers(sortedMembers);
}

function filters() {
	const filter = document.querySelector("#filter").value;
	const searchValue = document.querySelector("#search").value.toLowerCase();

	let filteredArr = filterByCheckBox(members);
	filteredArr = filterByProperties(filteredArr);
	filteredArr = filterBySearch(filteredArr);

	return filteredArr;

	function filterByCheckBox(members) {
		const checkboxValues = Array.from(document.querySelectorAll(".checkbox-filter:checked")).map(
			(checkbox) => checkbox.value
		);

		return members.filter((member) => {
			if (checkboxValues.length === 0) {
				return member;
			} else if (checkboxValues.includes("is-indebt")) {
				return member.hasPayed === false;
			} else if (checkboxValues.includes("is-competitive")) {
				return member.isCompetitive === true;
			}
		});
	}

	function filterByProperties(membersToFilterArr) {
		if (filter === "all") {
			return membersToFilterArr;
		} else {
			const filteredMembers = membersToFilterArr.filter(filterProperty);
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

	function filterBySearch(filteredMembersArr) {
		// Filters members by searching through every property
		const searchMembers = filteredMembersArr.filter((member) => {
			for (const key in member) {
				// Skips the keys image and uid
				if (["image", "uid"].includes(key)) continue;
				const value = member[key];
				// Checks strings and arrays for a match and returns true if found
				if (typeof value === "string" && value.toLowerCase().includes(searchValue)) return true;
				if (Array.isArray(value) && value.some((index) => index.toLowerCase().includes(searchValue)))
					return true;
			}
			return false;
		});
		// Returns filtered members
		return searchMembers;
	}
}

function sort(filteredMembersArr) {
	let sortValue = document.querySelector("#members-sort").value;
	let isReverse = false;
	let sortedMembers = [];

	//if sortValue includes "-reverse", then remove the word, but remember to reverse the array in the end.
	if (sortValue.includes("-reverse")) {
		//firstName-reverse bliver til firstName
		sortValue = sortValue.split("-")[0];
		isReverse = true;
	}

	//Sort if string, else number (member's age)
	if (sortValue !== "dateOfBirth") {
		sortedMembers = filteredMembersArr.sort((a, b) => a[sortValue].localeCompare(b[sortValue]));
	} else if (sortValue === "dateOfBirth") {
		sortedMembers = filteredMembersArr.sort((a, b) => calculateMemberAge(a) - calculateMemberAge(b));
	}

	//Reverse array if the sortValue included "-reverse" earlier
	if (isReverse) {
		sortedMembers.reverse();
	}

	return sortedMembers;
}

export { refreshFiltersAndSort };
