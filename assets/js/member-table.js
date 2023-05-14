import { members } from "./api.js";

function calculateMembersCount() {
	const activeMembersSum = countActiveMembers();
	const inactiveMembersSum = countInactiveMembers();
	const totalMembersCount = activeMembersSum + inactiveMembersSum;

	populateMembersTable(activeMembersSum, inactiveMembersSum, totalMembersCount);
}

function countActiveMembers() {
	const activeMembersArr = members.filter((member) => member.isActiveMember === true);
	return activeMembersArr.length;
}

function countInactiveMembers() {
	const inactiveMembersArr = members.filter((member) => member.isActiveMember === false);
	return inactiveMembersArr.length;
}

function populateMembersTable(active, inactive, total) {
	document.querySelector("#active-member-count").textContent = active;
	document.querySelector("#inactive-member-count").textContent = inactive;
	populateTotalNumberInTables(total);
}

function populateTotalNumberInTables(total) {
	//Iterates all elements with class-name "total-member-count" and sets .textContent to totalMembersCount
	const classNavn = document.querySelectorAll(".total-member-count");
	for (const element of classNavn) {
		element.textContent = total;
	}
}

export { calculateMembersCount, countInactiveMembers };