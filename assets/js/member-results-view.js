import { results } from "./api.js";

function memberResultsDialog(member) {
	document.querySelector("#main-dialog").showModal();

	document.querySelector("#main-dialog").innerHTML = "";

	// Uses filter to add members results to array, then sort them by date
	const memberResults = results.filter(getMemberResults).sort(sortResultsByDate);

	// Basic dialog HTML
	const html = /*html*/ `
    <h2>Results for ${member.firstName} ${member.lastName}</h2>
    <div id="member-dialog-results-container">
        <ul id="member-dialog-results-list">
         <!-- Inserts results list -->
        </ul>
    </div>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", html);

	// Results HTML to insert into DOM
	insertResultsHtml(memberResults);

	function getMemberResults(result) {
		return result.memberId === member.uid;
	}

	function sortResultsByDate(a, b) {
		return new Date(b.date) - new Date(a.date);
	}
}

function insertResultsHtml(sortedMemberResults) {
	// Checks if member has any results (empty results array)
	if (!sortedMemberResults.length) {
		// If no results, shows NO DATA message
		document.querySelector("#member-dialog-results-container").innerHTML = `<br><h2>NO DATA AVAILABLE</h2>`;
	} else {
		// If results are present, show's them in list form
		for (const result of sortedMemberResults) {
			const html = /*html*/ `
                <li>${result.date}</li>
                `;

			document.querySelector("#member-dialog-results-list").insertAdjacentHTML("beforeend", html);
		}
	}
}

export { memberResultsDialog };
