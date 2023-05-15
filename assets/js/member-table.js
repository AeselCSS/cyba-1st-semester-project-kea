import { members } from "./api.js";

function calculateMembersCount() {

	//Saves the count of active and inactives members in variables.
	const activeMembersSum = countActiveMembers();
	const inactiveMembersSum = countInactiveMembers();

	//Adds the sum of both to get the total count
	const totalMembersCount = activeMembersSum + inactiveMembersSum;

	//Populates the table with the above variables
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

function populateMembersTable(activeCount, inactiveCount, totalCount) {
	document.querySelector("#active-member-count").textContent = activeCount;
	document.querySelector("#inactive-member-count").textContent = inactiveCount;
	populateTotalNumberInTables(totalCount);
}

function populateTotalNumberInTables(totalCount) {
	//Iterates all elements with class-name "total-member-count" and sets .textContent to totalMembersCount
	const nodeList = document.querySelectorAll(".total-member-count");
	for (const element of nodeList) {
		element.textContent = totalCount;
	}
}

export { calculateMembersCount, countInactiveMembers };