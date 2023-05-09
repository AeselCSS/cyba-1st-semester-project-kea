"use strict";

// imports
import { initViews } from "./spa-router.js";
import { apiReadMembers, members } from "./api.js";
import { showMembers } from "./show-members.js";
import { sortMembers } from "./sort.js";

// onload event
window.addEventListener("load", initApp);

// initApp function
async function initApp() {
	console.log(`App is running!`);
	initViews();
	await apiReadMembers();
	// showMembers(members);
	sortMembers(members)

	document.querySelector("#members-sort").addEventListener("change", () => sortMembers(members));
}

