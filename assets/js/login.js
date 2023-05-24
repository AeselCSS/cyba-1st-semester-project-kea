// imports
import { apiReadRole } from "./api.js";
import { systemAccess } from "./system-access.js";
import { refreshFiltersAndSort } from "./filter-and-sort.js";
import { notificationFeedback } from "./notification-feedback.js";

// create login form upon clicking login button
function login() {
	// clear the dialog content if any - we need to do this smarter and uniform in the future
	document.querySelector("#main-dialog").innerHTML = "";

	const loginForm = /*html*/ `
    <form id="login-form">
		<h2>Please login</h2>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" required>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
    `;
	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", loginForm);
	document.querySelector("#login-form").addEventListener("submit", userAuthentication);

	// show dialog modal
	document.querySelector("#main-dialog-frame").showModal();
}

async function userAuthentication(event) {
	event.preventDefault();
	// get username and password from form
	let username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	// get role from api
	const user = await apiReadRole(username);
	// check if role exists and if password is correct
	if (user && user.password === password) {
		// Makes first letter uppercase
		username = username.charAt(0).toUpperCase() + username.slice(1);

		console.log(`${username} logged in`);
		notificationFeedback(`<b>${username}</b> logged in ✅`, true);
		// save users role in local storage
		localStorage.setItem("user", user.role);
		// check user role in local storage and grant access
		systemAccess(localStorage.getItem("user"));
		// redirect to members page
		location.href = "#members";
		//Show members anew with sort, search and filter value in mind
		refreshFiltersAndSort();
		// provide visual feedback that user is logged in
		// to be created later
	} else {
		console.log("Wrong username or password");
		notificationFeedback("Wrong username or password ⛔", false);

		// show error message
		// to be created later
	}
	// close dialog modal
	document.querySelector("#main-dialog-frame").close();
	// clear dialog modal
	document.querySelector("#main-dialog").innerHTML = "";
}

// exports
export { login };
