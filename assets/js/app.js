"use strict";

// imports
import { apiReadMembers, apiReadResults } from "./helpers/api.js";
import { createMemberForm } from "./members/create-member.js";
import { refreshFiltersAndSort } from "./members/filter-and-sort.js";
import { closeDialogEventListener, resetFilterSearchSort } from "./helpers/helpers-module.js";
import { displayJoinForm } from "./home/home.js";
import { displayMembersInDebt } from "./finances/restance.js";
import { initViews } from "./helpers/spa-router.js";
import { checkIfLoggedIn } from "./helpers/system-access.js";
import { displayFinancialTable } from "./finances/member-and-finance-overview.js";
import { calculateMembersCount } from "./finances/member-table.js";
import { refreshTop5Results } from "./results/results-top-five-section.js";
import { toggleTableGridView } from "./helpers/toggle-table-grid.js";

// onload event
window.addEventListener("load", initApp);

// initApp function
async function initApp() {
	console.log(`App is running!`);
	initViews(); // init spa router
	checkIfLoggedIn(); // check if user is logged in
	resetFilterSearchSort(); // Resets search, filter and sort values on load/refresh
	// members
	await apiReadMembers();
	//showMembers(members)
	// sortAndShowMembers(members);
	refreshFiltersAndSort();
	// top 5 results
	await apiReadResults();
	refreshTop5Results();
	// financial overview
	calculateMembersCount();
	displayFinancialTable();
	displayMembersInDebt();

	// add event listeners
	document.querySelector("#join-btn").addEventListener("click", displayJoinForm);
	// filters on members section
	closeDialogEventListener();
	document.querySelector("#search").addEventListener("input", refreshFiltersAndSort);
	// document.querySelector("#members-sort").addEventListener("change", () => sortAndShowMembers(members));
	document.querySelector("#members-sort").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#filter").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#add-new-member-btn").addEventListener("click", createMemberForm);
	document.querySelector("#checkbox-in-debt").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#checkbox-competitive").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#toggle-table-grid").addEventListener("click", toggleTableGridView);

	// filters on top five section
	document.querySelector("#age-filter").addEventListener("change", refreshTop5Results);
	document.querySelector("#gender-filter").addEventListener("change", refreshTop5Results);
	document.querySelectorAll(".result-type-filter").forEach((checkbox) => {
		checkbox.addEventListener("change", refreshTop5Results);
	});
}
