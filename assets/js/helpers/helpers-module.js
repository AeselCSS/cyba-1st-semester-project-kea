import {displayJoinForm} from "../home/home.js";
import { refreshFiltersAndSort } from "../members/filter-and-sort.js";
import { createMemberForm } from "../members/create-member.js";
import { toggleTableGridView } from "./toggle-table-grid.js";
import { refreshTop5Results } from "../results/results-top-five-section.js";

function closeDialogEventListener() {
	const closeDialogButton = document.querySelector("#btn-close-dialog-modal");
	const dialogContent = document.querySelector("#main-dialog");
	const dialogModal = document.querySelector("#main-dialog-frame");
	closeDialogButton.addEventListener("click", () => {
		dialogContent.innerHTML = "";
		dialogModal.close();
	});
}

function resetFilterSearchSort() {
	document.querySelector("#search").value = "";
	document.querySelector("#members-sort").value = "firstName";
	document.querySelector("#filter").value = "all";
}

// create min/max date for date input
function createMinMaxDate(yearsToSubtract) {
	const today = new Date();
	// subtract years from today
	const date = today.setFullYear(today.getFullYear() - yearsToSubtract);
	// convert in ISO string
	return new Date(date).toISOString().split("T")[0];
}

function calculateMemberAge(member) {
	//member.dateOfBirth format YYYY-MM-DD
	const dateArr = member.dateOfBirth.split("-");
	const date = new Date(dateArr[0], dateArr[1], dateArr[2]);
	const age = new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970;
	return age;
}

function initiateEventlisteners() {
	// add event listeners
	document.querySelector("#join-btn").addEventListener("click", displayJoinForm);
	// filters on members section
	closeDialogEventListener();
	document.querySelector("#search").addEventListener("input", refreshFiltersAndSort);
	document.querySelector("#members-sort").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#filter").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#add-new-member-btn").addEventListener("click", createMemberForm);
	document.querySelector("#checkbox-in-debt").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#checkbox-competitive").addEventListener("change", refreshFiltersAndSort);
	document.querySelector("#toggle-table-grid").addEventListener("click", toggleTableGridView);

	// filters on top five section
	document.querySelector("#age-filter").addEventListener("change", refreshTop5Results);
	document.querySelector("#gender-filter").addEventListener("change", refreshTop5Results);
	document.querySelectorAll(".result-type-filter").forEach((checkbox) => {
		checkbox.addEventListener("change", refreshTop5Results);
	});
}

export { closeDialogEventListener, resetFilterSearchSort, createMinMaxDate, calculateMemberAge, initiateEventlisteners };
