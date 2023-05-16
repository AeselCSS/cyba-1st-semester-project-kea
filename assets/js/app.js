"use strict";

// imports
import { initViews } from "./spa-router.js";
import { apiReadMembers, apiReadResults, members } from "./api.js";
import { showMembers } from "./show-members.js";
import { checkIfLoggedIn } from "./system-access.js";
import { createMemberForm } from "./create-member.js";
import { searchbarAndFilter } from "./search.js";
import { sortAndShowMembers } from "./sort.js";
import { displayMembersInDebt } from "./restance.js"
import { calculateMembersCount } from "./member-table.js";
import { displayFinancialTable } from "./member-and-finance-overview.js";
import { refreshTop5Results } from "./results-top-five-section.js";

// onload event
window.addEventListener("load", initApp);

// initApp function
async function initApp() {
	console.log(`App is running!`);
	initViews(); // init spa router
	checkIfLoggedIn(); // check if user is logged in
	// members
	await apiReadMembers();
	//showMembers(members)
	// sortAndShowMembers(members);
	searchbarAndFilter()
	// top 5 results
	await apiReadResults();
	refreshTop5Results();
	// financial overview
	calculateMembersCount();
	displayFinancialTable();
	displayMembersInDebt();

	// add event listeners
	// filters on members section
	document.querySelector("#search").addEventListener("keyup", searchbarAndFilter);
	document.querySelector("#members-sort").addEventListener("change", () => sortAndShowMembers(members));
	document.querySelector("#filter").addEventListener("change", searchbarAndFilter);
	document.querySelector("#add-new-member-btn").addEventListener("click", createMemberForm);
	document.querySelector("#checkbox-in-debt").addEventListener("change", searchbarAndFilter);
	document.querySelector("#checkbox-competitive").addEventListener("change", searchbarAndFilter);

	// filters on top five section
	document.querySelector("#age-filter").addEventListener("change", refreshTop5Results);
	document.querySelector("#gender-filter").addEventListener("change", refreshTop5Results);
	document.querySelectorAll(".result-type-filter").forEach((checkbox) => {
		checkbox.addEventListener("change", refreshTop5Results);
	});

}