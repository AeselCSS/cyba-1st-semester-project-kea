
const endpoint = "https://cyba-1st-semester-project-default-rtdb.europe-west1.firebasedatabase.app";

async function getMembers(url) {
    const response = await fetch(`${url}/members.json`);    
    const members = await response.json();

    const preparedMembers = prepareMembers(members);
    return preparedMembers
}

function prepareMembers(members) {
    const arr = []

    for (const key in members) {
        const member = members[key];

        if (!member) {
            continue;
        }

        member.uid = key;
        arr.push(member);
    }

    return arr;
}





export {endpoint, getMembers}