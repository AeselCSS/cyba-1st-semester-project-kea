import { searchbarAndFilter } from "./search.js";

// module variables
const endpoint = "https://cyba-1st-semester-project-default-rtdb.europe-west1.firebasedatabase.app";
let members = [];
let results = [];

// CRUD functions
// Create
async function apiCreateMember(member) {
	const response = await fetch(`${endpoint}/members.json`, {
		method: "POST",
		body: JSON.stringify(member),
	});
	return response;
}

// Create result
async function apiCreateResult(result) {
	const response = await fetch(`${endpoint}/results.json`, {
		method: "POST",
		body: JSON.stringify(result),
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

async function apiReadResults() {
	const response = await fetch(`${endpoint}/results.json`);
	results = prepareResults(await response.json()); 
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

function prepareResults(resultsAsObjects) {
	const results = [];
	for (const key in resultsAsObjects) {
		const result = resultsAsObjects[key];
		if (result) {
			results.push(result);
		}
	}
	return results;
}

export async function refreshMembersView() {
	await apiReadMembers();
	document.querySelector("#filter").value = "all";
	document.querySelector("#search").value = "";
	document.querySelector("#members-sort").value = "firstName";

	searchbarAndFilter();
}

// exports
export {
	members,
	results,
	apiCreateMember,
	apiCreateResult,
	apiReadMembers,
	apiReadRole,
	apiReadResults,
	apiUpdateMember,
	apiDeleteMember,
};
