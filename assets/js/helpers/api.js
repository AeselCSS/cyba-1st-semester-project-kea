import { refreshFiltersAndSort } from "../members/filter-and-sort.js";
import { updateFinancialTable } from "../finances/member-and-finance-overview.js";
import { calculateMemberAge } from "./helpers-module.js";
import { calculateMembersCount } from "../finances/member-table.js";
import { displayMembersInDebt } from "../finances/restance.js";
import { checkIfLoggedIn } from "./system-access.js";

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

async function apiUpdateResult(result) {
	const response = await fetch(`${endpoint}/results/${result.resultId}.json`, {
		method: "PUT",
		body: JSON.stringify(result),
	});
	return response;
}

// Delete
async function apiDeleteMember(member) {
	const response = await fetch(`${endpoint}/members/${member.uid}.json`, { method: "DELETE" });
	return response;
}

async function apiDeleteResult(result) {
	const response = await fetch(`${endpoint}/results/${result.resultId}.json`, { method: "DELETE" });
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
		// calculate members agegroup based on birthyear
		const age = calculateMemberAge(member);
		if (age < 18) {
			member.agegroup = "junior";
		} else if (age < 60) {
			member.agegroup = "senior";
		} else {
			member.agegroup = "senior+";
		}
		arr.push(member);
	}
	return arr;
}

function prepareResults(resultsAsObjects) {
	const results = [];
	// convert results to array and add resultId
	for (const key in resultsAsObjects) {
		const result = resultsAsObjects[key];
		if (result) {
			result.resultId = key;
			results.push(result);
		}
	}
	// add member name and gender to results if not already present
	for (const result of results) {
		if (!result.memberName || !result.memberGender) {
			const member = members.find((member) => member.uid === result.memberId);
			if (member) {
				result.memberName = `${member.firstName} ${member.lastName}`;
				result.memberGender = member.gender;
			}
		}
	}

	return results;
}

async function refreshMembersView() {
	await apiReadMembers();
	refreshFiltersAndSort();
	checkIfLoggedIn();
	calculateMembersCount();
	updateFinancialTable();
	displayMembersInDebt();
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
	apiUpdateResult,
	apiDeleteMember,
	refreshMembersView,
	apiDeleteResult,
};
