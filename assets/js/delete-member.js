import { apiDeleteMember, refreshMembersView } from "./api.js";
import { notificationFeedback } from "./notification-feedback.js";

async function deleteMember(member) {
	const firstName = member.firstName;
	console.log(member);
	const lastName = member.lastName;
	console.log(member.uid);
	const response = await apiDeleteMember(member.uid);

	if (response.ok) {
		// Create visual feedback function for user here.
		console.log("Member successfully deleted");
		refreshMembersView();

		// TODO: Call function with member.uid as argument to loop through all results and delete results with matching id. Update global results arr variable after loop end
		// for (const result of results){
		//	if (result.memberId === member.uid){
		//	await apiDeleteResult(result)
		// }
		// await apiReadResult()
		//}

		notificationFeedback(`${firstName} ${lastName} has been deleted`, true);
	} else {
		//Visual feedback function goes here.

		console.error("An error has occurred");
		notificationFeedback("An error has occurred", false);
	}
	document.querySelector("#main-dialog-frame").close();
}

export { deleteMember };
