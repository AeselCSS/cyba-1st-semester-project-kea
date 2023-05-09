
const endpoint = "https://cyba-1st-semester-project-default-rtdb.europe-west1.firebasedatabase.app";
let members = [];

async function apiReadMembers() {
    const response = await fetch(`${endpoint}/members.json`);    
    const membersInObjects = await response.json();

    members = prepareMembers(membersInObjects);
}

function prepareMembers(membersInObjects) {
    const arr = []

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


export {apiReadMembers, members}