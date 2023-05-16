import { memberDetailsDialog } from "./member-detailed-view.js";

function showMembers(members) {
	clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
	//Added class has-payed-true or has-payed-false. If it is has-payed-true, then a class with a red border is displayed
	const htmlGrid = /*html*/ `
    <article class="grid-item">
    <img src=${member.image}>
        <div class="grid-item-bottom">
            <h2>${member.firstName} ${member.lastName}</h2>
            <p><button class="grid-item-details-btn">Details</button></p>
            </div>
    </article>
    `;

	document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);
	document
		.querySelector("#members-grid .grid-item:last-child .grid-item-details-btn")
		.addEventListener("click", () => memberDetailsDialog(member));

	//Kode en if-statement, der kontrollerer at man er logget ind som cashier OG member er i gæld.
	//Hvis ovenstående er true, så smid en class "member-in-debt" på den grid-item.

	if (localStorage.getItem("user") === "cashier" && member.hasPayed === false) {
		document.querySelector(".grid-item:last-child").classList.add("member-in-debt");
	} else {
		document.querySelector(".grid-item:last-child").classList.remove("member-in-debt");
	}

	/* TABLE DOM kommer her og bliver outputtet i #members-table. Kommer også en eventlistener på dens knap.*/
}

function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}

export { showMembers };
