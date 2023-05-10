// imports
import { deleteMember } from "./delete-member.js";
import { updateMemberForm } from "./update-member.js";

function memberDetailsDialog(member) {
	document.querySelector("#main-dialog").innerHTML = "";
	const memberAge = calculateMemberAge(member);

	const html = /*html*/ `
        <section class="member-details-section">
            <div id="details-btns">
                <input type="button" id="details-update-btn" value="Update">
                <input type="button" id="details-delete-btn" value="Delete">
            </div>

            <div id="details-img">
                <img src="${member.image}">
            </div>

            <div id="details-else">
                <ul>
                    <li>Name: ${member.firstName} ${member.lastName}</li>
                    <li>Age: ${memberAge}</li>
                    <li>Member Status: ${showMemberActivityStatus(member)}</li>
                    <li>Membertype: ${showMemberType(memberAge)} - ${showMemberCompetitiveStatus(member)}</li>
                    <li>Disciplines: ${showMemberDisciplines(member)}</li>
                </ul>
            </div>
        </section>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", html);

	//EVENTLISTENER TIL UPDATE OPGAVE
	document.querySelector("#details-update-btn").addEventListener("click", () => updateMemberForm(member));

	//EVENTLISTENER TIL DELETE OPGAVE
	document.querySelector("#details-delete-btn").addEventListener("click", () => deleteMember(member));

	document.querySelector("#main-dialog").showModal();
}

function calculateMemberAge(member) {
	//member.dateOfBirth format YYYY-MM-DD
	const dateArr = member.dateOfBirth.split("-");
	const date = new Date(dateArr[0], dateArr[1], dateArr[2]);
	const age = new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970;
	return age;
}

function showMemberType(age) {
	if (age < 18) {
		return "Junior";
	} else if (age > 65) {
		return "Senior+";
	} else {
		return "Senior";
	}
}

function showMemberActivityStatus(member) {
	return member.isActiveMember ? "Active" : "Inactive";
}

function showMemberCompetitiveStatus(member) {
	return member.isCompetitive ? "Competitive swimmer" : "Casual swimmer";
}

function showMemberDisciplines(member) {
	return member.isCompetitive ? member.disciplines.join(", ") : "None";
}

export { memberDetailsDialog };
