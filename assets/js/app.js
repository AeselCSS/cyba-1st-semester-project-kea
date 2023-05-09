"use strict";

// imports
import { initViews } from "./spa-router.js";
import { apiReadMembers, members } from "./api.js";
import { showMembers } from "./show-members.js";
import { searchbar } from "./search.js";
import { filterChange } from "./filter.js";

// onload event
window.addEventListener("load", initApp);

// initApp function
async function initApp() {
	console.log(`App is running!`);
	initViews();
	await apiReadMembers();
	showMembers(members);

	document.querySelector('#filter').addEventListener('change', filterChange)

	document.querySelector('#search').addEventListener('keyup', searchbar);
}

