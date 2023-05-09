async function apiDeleteMember(member) {
	const response = await fetch(`${endpoint}/members/${member.id}.json`, { method: "DELETE" });
	if (response.ok) {
		console.log("Member successfully deleted");
	}
}
