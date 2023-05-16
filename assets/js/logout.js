// imports
import { checkIfLoggedIn } from "./system-access.js";

function logout() {
	localStorage.removeItem("user");
	removeMemberInDebtClass();
	checkIfLoggedIn();
}

function removeMemberInDebtClass() {
	const articles = document.querySelectorAll(".grid-item");

	for (const article of articles) {
		article.classList.remove("member-in-debt");
	}
}

export { logout };
