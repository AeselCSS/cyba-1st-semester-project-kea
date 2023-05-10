import { apiDeleteMember } from "./api.js";

async function deleteMember(member) {
	console.log(member.uid);
	const response = await apiDeleteMember(member.uid);

	if (response.ok) {
		// Create visual feedback function for user here.
		console.log("Member successfully deleted");
	} else {
		//Visual feedback function goes here.
		console.error("An error has occurred");
	}
	document.querySelector("#main-dialog").close();
}

export { deleteMember };
