import { memberDetailsDialog } from "./member-detailed-view.js";

function showMembers(members) {
    clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
    const htmlGrid = /*html*/`
    <article class="grid-item">
    <img src=${member.image}>
        <div class="grid-item-bottom">
            <h2>${member.firstName} ${member.lastName}</h2>
            <p><button class="grid-item-details-btn">Details</button></p>
            </div>
    </article>
    `

    document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);
    document.querySelector("#members-grid .grid-item:last-child .grid-item-details-btn").addEventListener("click", () => memberDetailsDialog(member));


    //Added red border to indebted members
    if (!member.hasPayed) {
        document.querySelector("#members-grid .grid-item:last-child").classList.add("red-border-in-debt");
        //Add also table here
    }

    /* TABLE DOM kommer her og bliver outputtet i #members-table. Kommer også en eventlistener på dens knap.*/
}


function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}


export {showMembers}