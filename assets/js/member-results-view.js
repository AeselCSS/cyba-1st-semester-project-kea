import { results } from "./api.js";

function memberResultsDialog(member) {
	document.querySelector("#main-dialog").showModal();

	document.querySelector("#main-dialog").innerHTML = "";

	// Basic dialog HTML
	const basicHtml = /*html*/ `
    <h2>Results for ${member.firstName} ${member.lastName}</h2>
    <div id="member-dialog-results-container">
        <ul id="member-dialog-results-list">
         <!-- Inserts results list -->
        </ul>
    </div>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", basicHtml);

	// Uses filter to add member's results to array, then sorts them by date
	const memberResults = results.filter(filterMemberResults).sort(sortResultsByDate);

	// Results HTML to insert into DOM
	insertResultsHtml(memberResults);

	//Filter and sort functions
	function filterMemberResults(result) {
		return result.memberId === member.uid;
	}

	function sortResultsByDate(a, b) {
		return new Date(b.date) - new Date(a.date);
	}
}

// HTML to insert as result
function insertResultsHtml(sortedMemberResults) {
	// Checks if member has any results (empty results array)
	if (!sortedMemberResults.length) {
		// If no results, shows NO DATA message
		document.querySelector("#member-dialog-results-container").innerHTML = `<br><h2>NO DATA AVAILABLE</h2>`;
	} else {
		// If results exist, shows them in list form
		for (const result of sortedMemberResults) {
			const html = /*html*/ `
                <li>${result.date}</li>
                `;

			document.querySelector("#member-dialog-results-list").insertAdjacentHTML("beforeend", html);
		}
	}
}

export { memberResultsDialog };
