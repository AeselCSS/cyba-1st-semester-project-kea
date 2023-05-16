import { apiDeleteMember, refreshMembersView } from "./api.js";

async function deleteMember(member) {
	console.log(member.uid);
	const response = await apiDeleteMember(member.uid);

	if (response.ok) {
		// Create visual feedback function for user here.
		console.log("Member successfully deleted");
		refreshMembersView();
		// TODO: show success message to user
	} else {
		//Visual feedback function goes here.
		// TODO: show error message to user
		console.error("An error has occurred");
	}
	document.querySelector("#main-dialog-border").close();
}

export { deleteMember };
