// imports
import { checkIfLoggedIn } from "./system-access.js";
import { resetFilterSearchSort } from "./helpers-module.js";
import { notificationFeedback } from "./notification-feedback.js";

function logout() {
	localStorage.removeItem("user");
	removeMemberInDebtClass();
	resetFilterSearchSort();
	checkIfLoggedIn();
	notificationFeedback('You have logged out 🙋‍♂️', true)
}

function removeMemberInDebtClass() {
	const articles = document.querySelectorAll(".grid-item");

	for (const article of articles) {
		article.classList.remove("member-in-debt");
	}
}

export { logout };
