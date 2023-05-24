"use strict";

// imports
import { displayFinancialTable } from "./finances/member-and-finance-overview.js";
import { calculateMembersCount } from "./finances/member-table.js";
import { displayMembersInDebt } from "./finances/restance.js";
import { apiReadMembers, apiReadResults } from "./helpers/api.js";
import { initiateEventlisteners, resetFilterSearchSort } from "./helpers/helpers-module.js";
import { initViews } from "./helpers/spa-router.js";
import { checkIfLoggedIn } from "./helpers/system-access.js";
import { refreshFiltersAndSort } from "./members/filter-and-sort.js";
import { refreshTop5Results } from "./results/results-top-five-section.js";

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
	refreshFiltersAndSort();
	// top 5 results
	await apiReadResults();
	refreshTop5Results();
	// financial overview
	calculateMembersCount();
	displayFinancialTable();
	displayMembersInDebt();
	// event listeners
	initiateEventlisteners()
}


