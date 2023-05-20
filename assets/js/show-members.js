import { memberDetailsDialog } from "./member-detailed-view.js";
import { memberResultsDialog } from "./member-results-view.js";
import { calculateMemberAge } from "./member-detailed-view.js";

let isGrid = true;

function showMembers(members) {
	clearContent();

	let delay = 0;
	for (const member of members) {
		const gridElement = showMemberGrid(member);
		gridElement.style.setProperty("--delay", delay + "s");
		delay += 0.05;

		const tableElement = showMemberTable(member);
		console.log(tableElement);
		tableElement.style.setProperty("--delay", delay + "s");
		delay += 0.01;
	}
}

function showMemberGrid(member) {
	isGrid = true;
	//Added class has-payed-true or has-payed-false. If it is has-payed-true, then a class with a red border is displayed
	const htmlGrid = /*html*/ `
    <article class="grid-item">
    <img src=${member.image}>
        <div class="grid-item-bottom">
            <h2>${member.firstName} ${member.lastName}</h2>
            <p class="grid-item-bottom-btns"><button class="grid-item-details-btn">Details</button> ${
				member.isCompetitive ? '<button class="grid-and-table-item-results-btn">Results</button>' : ""
			}</p>
            </div>
    </article>
    `;

	document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);

	// Adds event listener on details btn
	document
		.querySelector("#members-grid .grid-item:last-child .grid-item-details-btn")
		.addEventListener("click", () => memberDetailsDialog(member));

	showMembersIndebtForCashier("grid", member);
	ResultBtnSetup(member);

	const memberGridElement = document.querySelector("#members-grid .grid-item:last-child");

	return memberGridElement;
}

function showMemberTable(member) {
	isGrid = false;
	const html = /*html*/ `
		<tr class="table-item">
		<td><img src=${member.image}></td>
		<td>${member.firstName}</td>
		<td>${calculateMemberAge(member)}</td>
		<td>${member.gender}</td>
		<td>${member.email}</td>
		<td>${member.isActiveMember ? "Active" : "Inactive"}</td>
		<td>${member.isCompetitive ? "Competitive" : "Casual"}</td>
		<td id="table-flex-container-btn"> 
			 <button class="table-item-details-btn">Details</button> 
			${member.isCompetitive ? "<button class='grid-and-table-item-results-btn' >Results</button>" : ""} 
		</td>
		</tr>
		
		`;
	document.querySelector("#members-table-content").insertAdjacentHTML("beforeend", html);

	// Adds event listener on details btn
	document
		.querySelector("#members-table .table-item:last-child .table-item-details-btn")
		.addEventListener("click", () => memberDetailsDialog(member));

	showMembersIndebtForCashier("table", member);
	ResultBtnSetup(member);

	const memberTableElement = document.querySelector("#members-table .table-item:last-child");

	return memberTableElement;
}

function ResultBtnSetup(member) {
	// Only adds result button if member is competitive
	if (member.isCompetitive) {
		if (isGrid) {
			eventListenerAndTrainerVisiblity("grid", member);
		} else if (!isGrid) {
			eventListenerAndTrainerVisiblity("table", member);
		}
	}
}

function eventListenerAndTrainerVisiblity(gridOrTable, member) {
	const resultBtn = document.querySelector(
		`#members-${gridOrTable} .${gridOrTable}-item:last-child .grid-and-table-item-results-btn`
	);

	// Adds click event to button, opens member results dialog
	resultBtn.addEventListener("click", () => memberResultsDialog(member));

	// Hides button if not logged as trainer
	if (localStorage.getItem("user") !== "trainer") {
		resultBtn.classList.add("hidden");
	}
}

//Kode en if-statement, der kontrollerer at man er logget ind som cashier OG member er i gæld.
//Hvis ovenstående er true, så smid en class "member-in-debt" på den grid-item.
function showMembersIndebtForCashier(gridOrTable, member) {
	const person = document.querySelector(`.${gridOrTable}-item:last-child`);

	// Adds red border for cashier, if member is in debt
	if (localStorage.getItem("user") === "cashier" && member.hasPayed === false) {
		person.classList.add("member-in-debt");
	} else {
		person.classList.remove("member-in-debt");
	}
}

function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table-content").innerHTML = "";
}

export { showMembers };
