// imports
import { confirmDeleteMember } from "./delete-member.js";
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

            <div class="details-body-grid">
				<div class="details-img">
					<img src="${member.image}">
				</div>
				<div id="details-else">
					<h3>Name</h3> 
					${member.firstName} ${member.lastName}
					<h3>Age</h3> 
					${memberAge}
					<h3>Gender</h3> 
					${member.gender}
					<h3>Email</h3> 
					${member.email}
					<h3>Member Status</h3> 
					${showMemberActivityStatus(member)}
					<h3>Membertype</h3> 
					${member.agegroup} - ${showMemberCompetitiveStatus(member)}
					${
						member.disciplines
							? `<h3>Disciplines</h3>
					 ${showMemberDisciplines(member)}`
							: ""
					}
				</div>
			</div>
        </section>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", html);

	if (localStorage.getItem("user") !== "chairman") {
		document.querySelector("#details-btns").classList.add("hidden");
	}

	//Eventlistener til update
	document.querySelector("#details-update-btn").addEventListener("click", () => updateMemberForm(member));

	//Eventlistener til delete
	document.querySelector("#details-delete-btn").addEventListener("click", () => confirmDeleteMember(member));

	// Open dialog/modal, if it's not already open
	const dialogFrame = document.querySelector("#main-dialog-frame");
	if (!dialogFrame.open) dialogFrame.showModal();
}

function showMemberActivityStatus(member) {
	return member.isActiveMember ? "Active" : "Inactive";
}

function showMemberCompetitiveStatus(member) {
	return member.isCompetitive ? "Competitive Swimmer" : "Casual Swimmer";
}

function showMemberDisciplines(member) {
	return member.disciplines.join(", ");
}

export { memberDetailsDialog };
