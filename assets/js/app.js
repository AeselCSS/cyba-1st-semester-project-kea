"use strict";

// imports
import { initViews } from "./spa-router.js";
import { apiReadMembers, apiReadResults, members } from "./api.js";
import { showMembers } from "./show-members.js";
import { checkIfLoggedIn } from "./system-access.js";
import { createMemberForm } from "./create-member.js";
import { searchbarAndFilter } from "./search.js";
import { sortAndShowMembers } from "./sort.js";
import {displayMembersInDebt} from "./restance.js"
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
	await apiReadMembers();
	//showMembers(members)
	sortAndShowMembers(members);
	await apiReadResults();
	refreshTop5Results();

	// add event listeners
	document.querySelector("#add-new-member-btn").addEventListener("click", createMemberForm);
	document.querySelector("#members-sort").addEventListener("change", () => sortAndShowMembers(members));
	document.querySelector("#filter").addEventListener("change", searchbarAndFilter);
	document.querySelector("#checkbox-in-debt").addEventListener("change", searchbarAndFilter);
	document.querySelector("#search").addEventListener("keyup", searchbarAndFilter);

	// filters on top five section
	document.querySelector("#age-filter").addEventListener("change", refreshTop5Results);
	document.querySelector("#gender-filter").addEventListener("change", refreshTop5Results);
	document.querySelectorAll(".result-type-filter").forEach((checkbox) => {
		checkbox.addEventListener("change", refreshTop5Results);
	});

	//fINANCES TAB
	calculateMembersCount();
	displayFinancialTable();
	displayMembersInDebt()
}