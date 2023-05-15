import { members } from "./api.js";

//Change name to calculateMemberInDebt
function displayMembersInDebt() {
	const { activeMembersInDebt, inactiveMembersInDebt } = countMembersInDebt();
	showDebtCountInDOM(activeMembersInDebt, inactiveMembersInDebt);
}

function countMembersInDebt() {
	let activeMembersInDebt = 0;
	let inactiveMembersInDebt = 0;

	const membersInDebtArr = members.filter((member) => member.hasPayed === false);

	for (const debtedMember of membersInDebtArr) {
		if (debtedMember.isActiveMember) {
			activeMembersInDebt++;
		} else {
			inactiveMembersInDebt++;
		}
	}

	return { activeMembersInDebt, inactiveMembersInDebt };
}

function showDebtCountInDOM(activeMembersInDebt, inactiveMembersInDebt) {
    document.querySelector("#debt-active-count").textContent = activeMembersInDebt;
    document.querySelector("#debt-inactive-count").textContent = inactiveMembersInDebt;
    document.querySelector("#debt-total-count").textContent = activeMembersInDebt + inactiveMembersInDebt;
}

export { displayMembersInDebt };
