import { apiDeleteMember, apiDeleteResult, apiReadResults, refreshMembersView, results } from "../helpers/api.js";
import { notificationFeedback } from "../helpers/notification-feedback.js";
import { refreshTop5Results } from "../results/results-top-five-section.js";

function confirmDeleteMember(member) {
	const dialogContent = document.querySelector("#main-dialog");

	dialogContent.innerHTML = "";

	const html = /*html*/ `
	
	<h2>Are you sure you want to delete: <p>${member.firstName} ${member.lastName}</p></h2>
	<h3 class="center">${resultCountOfMember(member.uid)} results will be deleted</h3>
	<br>
	
	 <div class="center"><button id="confirm-delete-btn" >Confirm deletion</button></div>
	`;

	dialogContent.insertAdjacentHTML("beforeend", html);
	document.querySelector("#confirm-delete-btn").addEventListener("click", () => deleteMember(member));
}

function resultCountOfMember(memberUserId) {
	let count = 0;
	for (const result of results) {
		if (result.memberId === memberUserId) {
			count++;
		}
	}

	return count;
}

async function deleteMember(member) {
	const firstName = member.firstName;
	const lastName = member.lastName;
	const response = await apiDeleteMember(member);

	if (response.ok) {
		// Create visual feedback function for user here.
		console.log("Member successfully deleted");
		refreshMembersView();

		await deleteAllResultsUnderMember(member.uid);
		refreshTop5Results();
		notificationFeedback(`<b>${firstName} ${lastName}</b> has been deleted ✅`, true);
	} else {
		//Visual feedback function goes here.

		console.error("An error has occurred while deleting member");
		notificationFeedback("Error occured while deleting member ⛔", false);
	}
	document.querySelector("#main-dialog-frame").close();
}

async function deleteAllResultsUnderMember(memberUserId) {
	for (const result of results) {
		if (result.memberId === memberUserId) {
			const response = await apiDeleteResult(result);

			if (response.ok) {
				console.log(`Result ${result.resultId} has been deleted`);
			}
		}
	}
	await apiReadResults();
}

export { confirmDeleteMember };
