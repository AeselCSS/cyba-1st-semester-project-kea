import { login } from "./login.js";
import { logout } from "./logout.js";
import { refreshFiltersAndSort } from "../members/filter-and-sort.js";

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
	// nav links and buttons
	const membersLink = document.querySelector("#members-link");
	const financesLink = document.querySelector("#finances-link");
	const topFiveLink = document.querySelector("#top-five-link");
	const loginBtn = document.querySelector("#login-btn");
	const logoutBtn = document.querySelector("#logout-btn");

	// search bar filters
	const filterMale = document.querySelector("#filter-male");
	const filterFemale = document.querySelector("#filter-female");
	const filterNonBinary = document.querySelector("#filter-non-binary");
	const filterActive = document.querySelector("#filter-active");
	const filterInactive = document.querySelector("#filter-inactive");
	const filterCompetitive = document.querySelector("#filter-competitive");
	const filterCasual = document.querySelector("#filter-casual");
	const filterJunior = document.querySelector("#filter-junior");
	const filterSenior = document.querySelector("#filter-senior");
	const competitiveCheckbox = document.querySelector("#checkbox-competitive");
	const inDebtCheckbox = document.querySelector("#checkbox-in-debt");

	// role specific buttons and checkboxes
	const resultsBtn = document.querySelectorAll(".grid-item-results-btn");
	const addMemberBtn = document.querySelector("#add-new-member-btn");
	const inDebt = document.querySelector("#in-debt-container");
	const competitive = document.querySelector("#competitive-filter-container");

	console.log(`systemAccess: ${role} found in local storage`);

	if (role === "chairman") {
		// nav links and buttons
		loginBtn.classList.add("hidden");
		logoutBtn.classList.remove("hidden");
		membersLink.classList.remove("hidden");
		financesLink.classList.add("hidden");
		topFiveLink.classList.add("hidden");
		// role specific buttons
		addMemberBtn.className = "";
		ResultsBtnClass("hidden");
		inDebt.className = "hidden";
		competitive.className = "hidden";
		// role specific filters
		filterMale.removeAttribute("hidden");
		filterFemale.removeAttribute("hidden");
		filterNonBinary.removeAttribute("hidden");
		filterActive.removeAttribute("hidden");
		filterInactive.removeAttribute("hidden");
		filterCompetitive.removeAttribute("hidden");
		filterCasual.removeAttribute("hidden");
		filterJunior.setAttribute("hidden", "");
		filterSenior.setAttribute("hidden", "");
		competitiveCheckbox.checked = false;
		inDebtCheckbox.checked = false;
		document.querySelector("#logged-in-span").textContent = "Chairman";
		document.querySelector("#log-in-text").classList.remove("hidden");
	} else if (role === "cashier") {
		// nav links and buttons
		loginBtn.classList.add("hidden");
		logoutBtn.classList.remove("hidden");
		membersLink.classList.remove("hidden");
		financesLink.classList.remove("hidden");
		topFiveLink.classList.add("hidden");
		// role specific buttons
		addMemberBtn.className = "hidden";
		ResultsBtnClass("hidden");
		inDebt.className = "";
		competitive.className = "hidden";
		// role specific filters
		filterMale.removeAttribute("hidden");
		filterFemale.removeAttribute("hidden");
		filterNonBinary.removeAttribute("hidden");
		filterActive.removeAttribute("hidden");
		filterInactive.removeAttribute("hidden");
		filterCompetitive.removeAttribute("hidden");
		filterCasual.removeAttribute("hidden");
		filterJunior.setAttribute("hidden", "");
		filterSenior.setAttribute("hidden", "");
		competitiveCheckbox.checked = false;
		inDebtCheckbox.checked = true;
		document.querySelector("#logged-in-span").textContent = "Cashier";
		document.querySelector("#log-in-text").classList.remove("hidden");
	} else if (role === "trainer") {
		// nav links and buttons
		loginBtn.classList.add("hidden");
		logoutBtn.classList.remove("hidden");
		membersLink.classList.remove("hidden");
		financesLink.classList.add("hidden");
		topFiveLink.classList.remove("hidden");
		// role specific buttons
		addMemberBtn.className = "hidden";
		ResultsBtnClass("");
		inDebt.className = "hidden";
		competitive.className = "";
		// role specific filters
		filterMale.setAttribute("hidden", "");
		filterFemale.setAttribute("hidden", "");
		filterNonBinary.setAttribute("hidden", "");
		filterActive.setAttribute("hidden", "");
		filterInactive.setAttribute("hidden", "");
		filterCompetitive.setAttribute("hidden", "");
		filterCasual.setAttribute("hidden", "");
		filterJunior.removeAttribute("hidden");
		filterSenior.removeAttribute("hidden");
		competitiveCheckbox.checked = true;
		inDebtCheckbox.checked = false;
		document.querySelector("#logged-in-span").textContent = "Trainer";
		document.querySelector("#log-in-text").classList.remove("hidden");
	} else if (role === "guest") {
		console.log("no user logged in - guest view shown");
		// nav links and buttons
		loginBtn.classList.remove("hidden");
		logoutBtn.classList.add("hidden");
		membersLink.classList.add("hidden");
		financesLink.classList.add("hidden");
		topFiveLink.classList.add("hidden");
		document.querySelector("#logged-in-span").textContent = "";
		document.querySelector("#log-in-text").classList.add("hidden");
	}

	// apply searchbar and filter to members section
	refreshFiltersAndSort();

	// eventlisteners
	document.querySelector("#login-btn").addEventListener("click", login);
	document.querySelector("#logout-btn").addEventListener("click", logout);

	// show/hide all results buttoms on member grid
	function ResultsBtnClass(string) {
		if (string) {
			resultsBtn.forEach((btn) => btn.classList.add(string));
		} else {
			resultsBtn.forEach((btn) => btn.classList.remove("hidden"));
		}
	}
}

export { checkIfLoggedIn, systemAccess };
