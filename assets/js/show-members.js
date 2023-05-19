import { memberDetailsDialog } from "./member-detailed-view.js";
import { memberResultsDialog } from "./member-results-view.js";
import { calculateMemberAge } from "./member-detailed-view.js";

let isGrid = true;

function showMembers(members) {
	clearContent();

	for (const member of members) {
		showMemberGrid(member);
		showMemberTable(member);
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

	// button event listeners
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

	addResultBtnEventlistener(member);

	//hides result-button if user is not trainer
	onlyShowResultBtnForTrainer(member);

	// if (localStorage.getItem("user") !== "trainer") {
	// 	document
	// 		.querySelector("#members-grid .grid-item:last-child .grid-and-table-item-results-btn")
	// 		.classList.add("hidden");

	// 	document.querySelector("#members-table .table-item:last-child .table-item-details-btn").classList.add("hidden");
	// }
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

	document
		.querySelector("#members-table .table-item:last-child .table-item-details-btn")
		.addEventListener("click", () => memberDetailsDialog(member));

	addResultBtnEventlistener(member);
	onlyShowResultBtnForTrainer(member);
}

// add click eventlistener to result button if member is competitive
function addResultBtnEventlistener(member) {
	if (member.isCompetitive) {
		if (isGrid) {
			document
				.querySelector("#members-grid .grid-item:last-child .grid-and-table-item-results-btn")
				.addEventListener("click", () => memberResultsDialog(member));
		} else if (!isGrid) {
			document
				.querySelector("#members-table .table-item:last-child .grid-and-table-item-results-btn")
				.addEventListener("click", () => memberResultsDialog(member));
		}
	}
}

function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table-content").innerHTML = "";
}

function onlyShowResultBtnForTrainer(member) {
	if (localStorage.getItem("user") !== "trainer") {
		if (member.isCompetitive) {
			if (isGrid) {
				console.log(
					document.querySelector("#members-grid .grid-item:last-child .grid-and-table-item-results-btn")
				);
				document
					.querySelector("#members-grid .grid-item:last-child .grid-and-table-item-results-btn")
					.classList.add("hidden");
			} else if (!isGrid) {
				document
					.querySelector("#members-table .table-item:last-child .grid-and-table-item-results-btn")
					.classList.add("hidden");
			}
		}
	}
}

export { showMembers };
