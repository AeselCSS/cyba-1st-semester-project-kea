import { login } from "./login.js";
import { logout } from "./logout.js";


function checkIfLoggedIn() {
  const user = localStorage.getItem("user");
  if (user) {
    // check user role in local storage and grant access
    systemAccess(localStorage.getItem("user"));
} else {
    location.href = "#home"; // redirect to guest landing page
    systemAccess("guest"); // grant guest access
}
}

// grant access based on user role in local storage
function systemAccess(role) {
	console.log(`systemAccess: ${role} found in local storage`);
	if (role === "chairman") {
		showChairmanNavLinks();
	} else if (role === "cashier") {
		showCashierNavLinks();
	} else if (role === "trainer") {
		showTrainerNavLinks();
	} else if (role === "guest") {
		console.log("no user logged in - guest view shown");
		showGuestNavLinks();
	}

	// show the nav links for guest
	function showGuestNavLinks() {
		const guestNavLinks = /*html*/ `
        <!-- navigation bar -->
        <a href="#home" class="view-link" id="home-link">Home</a>
        <button id="login-btn">Log in</button>
        `;
		document.querySelector("nav").innerHTML = guestNavLinks;
        // add event listener to login button
        document.querySelector("#login-btn").addEventListener("click", login);
	}
	// show the nav links for chairman
	function showChairmanNavLinks() {
		const chairmanNavLinks = /*html*/ `
        <!-- navigation bar -->
        <a href="#home" class="view-link" id="home-link">Home</a>
        <a href="#members" class="view-link" id="members-link">Members</a>
        <button id="logout-btn">Log out</button>
        `;
		document.querySelector("nav").innerHTML = chairmanNavLinks;
        // add event listener to logout button
        document.querySelector("#logout-btn").addEventListener("click", logout);
	}
	// show the nav links for cashier
	function showCashierNavLinks() {
		const cashierNavLinks = /*html*/ `
        <!-- navigation bar -->
        <a href="#home" class="view-link" id="home-link">Home</a>
        <a href="#members" class="view-link" id="members-link">Members</a>
        <a href="#finances" class="view-link" id="finances-link">Finances</a>
        <button id="logout-btn">Log out</button>
        `;
		document.querySelector("nav").innerHTML = cashierNavLinks;
        // add event listener to logout button
        document.querySelector("#logout-btn").addEventListener("click", logout);
	}
	// show the nav links for trainer
	function showTrainerNavLinks() {
		const trainerNavLinks = /*html*/ `
        <!-- navigation bar -->
        <a href="#home" class="view-link" id="home-link">Home</a>
        <a href="#members" class="view-link" id="members-link">Members</a>
        <a href="#top-five" class="view-link" id="top-five-link">Top 5</a>
        <button id="logout-btn">Log out</button>
        `;
		document.querySelector("nav").innerHTML = trainerNavLinks;
        // add event listener to logout button
        document.querySelector("#logout-btn").addEventListener("click", logout);
	}
}

export { checkIfLoggedIn, systemAccess };