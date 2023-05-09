import { memberDetailsDialog } from "./member-detailed-view.js";

function showMembers(members) {
    clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
    console.log(member);
    const htmlGrid = /*html*/`
    <article class="grid-item">
        <img src=${member.image}>
        <p>${member.firstName} ${member.lastName}</p>
        <button class="grid-item-details-btn">Details</button>
    </article>
    `

    document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);
    document.querySelector("#members-grid .grid-item:last-child .grid-item-details-btn").addEventListener("click", () => memberDetailsDialog(member));

    /* TABLE DOM kommer her og bliver outputtet i #members-table. Kommer også en eventlistener på dens knap.*/
}


function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}


export {showMembers}