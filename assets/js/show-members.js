import { memberDetailsDialog } from "./member-detailed-view.js";
import { memberResultsDialog } from "./member-results-view.js";

function showMembers(members) {
    clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
	//Added class has-payed-true or has-payed-false. If it is has-payed-true, then a class with a red border is displayed
	const htmlGrid = /*html*/ `
    <article class="grid-item has-payed-${member.hasPayed}">
    <img src=${member.image}>
        <div class="grid-item-bottom">
            <h2>${member.firstName} ${member.lastName}</h2>
            <p class="grid-item-bottom-btns"><button class="grid-item-details-btn">Details</button><button class="grid-item-results-btn">Results</button></p>
            </div>
    </article>
    `;

	document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);

    // button event listeners
	document
		.querySelector("#members-grid .grid-item:last-child .grid-item-details-btn")
		.addEventListener("click", () => memberDetailsDialog(member));

	/* TABLE DOM kommer her og bliver outputtet i #members-table. Kommer også en eventlistener på dens knap.*/
    document.querySelector("#members-grid .grid-item:last-child .grid-item-results-btn").addEventListener("click", () => memberResultsDialog(member));

    /* TABLE DOM kommer her og bliver outputtet i #members-table. Kommer også en eventlistener på dens knap.*/
}


function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}


export {showMembers}