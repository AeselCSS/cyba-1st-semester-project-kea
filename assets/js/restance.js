import { members } from "./api.js";

//Change name to calculateMemberInDebt
function displayMembersInDebt() {
	//Destruct the returned value into two variables storing the number of members in debt: 
	const { activeMembersInDebt, inactiveMembersInDebt } = countMembersInDebt();
	showDebtCountInDOM(activeMembersInDebt, inactiveMembersInDebt);
}

function countMembersInDebt() {
	let activeMembersInDebt = 0;
	let inactiveMembersInDebt = 0;


    //Created array of indebted members using filter
	const membersInDebtArr = members.filter((member) => member.hasPayed === false);


    //Loop through created array. If member is active, do ++ on activeMembersInDebt, else, ++ on inactiveMembersInDebt
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
	//Show count and total in DOM
	document.querySelector("#debt-active-count").textContent = activeMembersInDebt;
	document.querySelector("#debt-inactive-count").textContent = inactiveMembersInDebt;
	document.querySelector("#debt-total-count").textContent = activeMembersInDebt + inactiveMembersInDebt;
}

export { displayMembersInDebt };
