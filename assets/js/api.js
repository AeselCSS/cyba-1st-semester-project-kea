import { searchbarAndFilter } from "./search.js";
import { updateFinancialTable } from "./member-and-finance-overview.js";
import { calculateMembersCount } from "./member-table.js";

// module variables
const endpoint = "https://cyba-1st-semester-project-default-rtdb.europe-west1.firebasedatabase.app";
let members = [];

// CRUD functions
// Create
async function apiCreateMember(member) {
	const response = await fetch(`${endpoint}/members.json`, {
		method: "POST",
		body: JSON.stringify(member),
	});
	return response;
}

// Read
async function apiReadMembers() {
	const response = await fetch(`${endpoint}/members.json`);
	const membersInObjects = await response.json();

	members = prepareMembers(membersInObjects);
}

async function apiReadRole(role) {
	const response = await fetch(`${endpoint}/roles/${role}.json`);
	return response.json();
}

// Update
async function apiUpdateMember(member) {
	const response = await fetch(`${endpoint}/members/${member.uid}.json`, {
		method: "PUT",
		body: JSON.stringify(member),
	});
	return response;
}

// Delete
async function apiDeleteMember(member) {
	const response = await fetch(`${endpoint}/members/${member}.json`, { method: "DELETE" });
	return response;
}

// Helper functions
function prepareMembers(membersInObjects) {
	const arr = [];

	for (const key in membersInObjects) {
		const member = membersInObjects[key];

		if (!member) {
			continue;
		}

		member.uid = key;
		arr.push(member);
	}

	return arr;
}

export async function refreshMembersView() {
	await apiReadMembers();
	document.querySelector("#filter").value = "all";
	document.querySelector("#search").value = "";
	document.querySelector("#members-sort").value = "firstName";

	searchbarAndFilter();
	calculateMembersCount();
	updateFinancialTable();
}

// exports
export { members, apiCreateMember, apiReadMembers, apiReadRole, apiUpdateMember, apiDeleteMember };
