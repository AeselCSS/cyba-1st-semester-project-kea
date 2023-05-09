"use strict";

// imports
import { initViews } from "./spa-router.js";
import { endpoint, getMembers } from "./api.js";

// onload event
window.addEventListener("load", initApp);

// initApp function
async function initApp() {
	initViews();
	console.log(`App is running!`);
	const members = await getMembers(endpoint);

	console.log(members);
}
