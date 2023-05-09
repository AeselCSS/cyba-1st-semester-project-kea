/*
Hey Chris - jeg har nogle få spørgsmål angående min delete user story
1. Er det korrekt at jeg har lavet en nyt modul til delete eller skulle den ligge i api.js?
2. Er det korrekt forstået at jeg skal kalde min function apiDeleteMember?
3. skal jeg importerer eller eksportere apiDeleteMember?
*/

import { endpoint } from "./api.js";

async function apiDeleteMember(member) {
	const response = await fetch(`${endpoint}/members/${member.id}.json`, { method: "DELETE" });
	if (response.ok) {
		console.log("Member successfully deleted");
	}
}
