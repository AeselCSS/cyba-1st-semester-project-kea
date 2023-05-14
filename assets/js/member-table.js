import { members } from "./api.js";

function calculateMembersCount() {
	const activeMembersSum = countActiveMembers();
    const inactiveMembersSum = countInactiveMembers();
    const totalMembersCount = activeMembersSum + inactiveMembersSum;

    populateMembersTable(activeMembersSum, inactiveMembersSum, totalMembersCount)
}

function countActiveMembers() {
	const activeMembersArr = members.filter(member => member.isActiveMember === true)
	return activeMembersArr.length
}

function countInactiveMembers() {
    const inactiveMembersArr = members.filter((member) => member.isActiveMember === false);
	return inactiveMembersArr.length;
}

function populateMembersTable(active, inactive, total) {
    document.querySelector(".active-member-count").textContent = active;
    document.querySelector("#inactive-member-count").textContent = inactive;
    document.querySelector("#total-member-count").textContent = total;
}


export { calculateMembersCount };