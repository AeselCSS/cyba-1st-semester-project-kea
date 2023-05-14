import { results } from "./api.js";
import { addResultDialog } from "./create-result.js";

function memberResultsDialog(member) {
	console.log(member);
	document.querySelector("#main-dialog").showModal();

	document.querySelector("#main-dialog").innerHTML = "";

	// Basic dialog HTML
	const basicHtml = /*html*/ `
    <h2 class="dialog-header-text-center">Results for ${member.firstName} ${member.lastName}</h2>
    <div id="member-dialog-results-container">
	<div class="member-dialog-results-btn"><button>Add result</button></div>
        <table>
        <thead>
        <tr>
        <th><h3>Date</h3></th>
        <th><h3>Time</h3></th>
        <th><h3>Discipline</h3></th>
        <th><h3>Training/Competition</h3></th>
        </tr>
        </thead>
        <tbody id="member-dialog-results-list">
        <!-- Inserts result table rows -->
        </tbody>
        </table>
    </div>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", basicHtml);

	// button event listener
	document.querySelector(".member-dialog-results-btn").addEventListener("click", () => addResultDialog(member));

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
		document.querySelector("#member-dialog-results-container").innerHTML = `
		<h2>NOT A COMPETITIVE MEMBER</h2>
		<h2>NO DATA AVAILABLE</h2>
		`;
	} else {
		// If results exist, shows them in list form
		for (const result of sortedMemberResults) {
			const html = /*html*/ `
                <tr>
                <td>${result.date}</td>
                <td>${result.time}</td>
                <td>${result.discipline}</td>
                <td>${result.resultType}</td>
                </tr>
                `;

			document.querySelector("#member-dialog-results-list").insertAdjacentHTML("beforeend", html);
		}
	}
}

export { memberResultsDialog };
