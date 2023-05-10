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

async function apiDeleteMember(member) {
	const response = await fetch(`${endpoint}/members/${member.id}.json`, { method: "DELETE" });
	if (response.ok) {
		console.log("Member successfully deleted");
	}
}

export { apiReadMembers, members, apiReadRole };

export { members, apiCreateMember, apiReadMembers, apiReadRole, apiUpdateMember, apiDeleteMember };