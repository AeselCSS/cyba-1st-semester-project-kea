import { apiDeleteMember, refreshMembersView, apiUpdateResult, apiReadResults } from "./api.js";
import { results } from "./api.js";

async function deleteMember(member) {
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
		await deleteAllResultsUnderMember(member.uid)
		// TODO: show success message to user
	} else {
		//Visual feedback function goes here.
		// TODO: show error message to user
		console.error("An error has occurred");
	}
	document.querySelector("#main-dialog-frame").close();
}

async function deleteAllResultsUnderMember(memberUserId) {
	
	for (const result of results) {
		if (result.memberId === memberUserId) {
			const response = await apiUpdateResult(result)

			if (response.ok) {
				console.log(`${result.resultId} has been deleted`);
			}
		}
	}
	await apiReadResults();
}

export { deleteMember };
