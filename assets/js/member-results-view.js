import { results } from "./api.js";
import { addResultDialog } from "./create-result.js";

function memberResultsDialog(member) {
	document.querySelector("#main-dialog-frame").showModal();

	document.querySelector("#main-dialog").innerHTML = "";

	// Basic dialog HTML
	const basicHtml = /*html*/ `
    <h2 class="dialog-header-text-center">Results for ${member.firstName} ${member.lastName}</h2>
    <div id="member-dialog-results-container">
		<div class="member-dialog-results-btn">
			<button id="member-dialog-results-button">Add result</button>
		</div>
        <table id="member-dialog-results-table">
        	<thead>
        		<tr>
        			<th><h3>Date</h3></th>
        			<th><h3>Time</h3></th>
        			<th><h3>Discipline</h3></th>
        			<th><h3>Training/Competition</h3></th>
        			<th><h3>Location</h3></th>
        			<th><h3>Name</h3></th>
        			<th><h3>Placement</h3></th>
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
	document.querySelector("#member-dialog-results-button").addEventListener("click", () => addResultDialog(member));

	// Uses filter to add member's results to array, then sorts them by date
	const memberResults = results.filter(filterMemberResults).sort(sortResultsByDate);

	// Results HTML to insert into DOM
	insertResultsHtml(memberResults, member);

	//Filter and sort functions
	function filterMemberResults(result) {
		return result.memberId === member.uid;
	}

	function sortResultsByDate(a, b) {
		return new Date(b.date) - new Date(a.date);
	}
}

// HTML to insert as result
function insertResultsHtml(sortedMemberResults, member) {
	// Checks if member is competitive
	if (!member.isCompetitive) {
		document.querySelector("#member-dialog-results-container").innerHTML = "<h2>Not a competitive member</h2>";
		// Checks if member has any results (empty results array)
	} else if (!sortedMemberResults.length) {
		// If no results, shows NO DATA message
		const html = /*html*/ `
			<h2>Currently no results</h2>
			`;
		document.querySelector("#member-dialog-results-container").insertAdjacentHTML("beforeend", html);
	} else {
		// If results exist, shows them in list form
		for (const result of sortedMemberResults) {
			const html = /*html*/ `
                <tr>
                	<td>${result.date}</td>
                	<td>${result.time}</td>
                	<td>${result.discipline}</td>
                	<td>${result.resultType}</td>
                	<td>${result.competitionLocation ? result.competitionLocation : "-"}</td>
                	<td>${result.competitionName ? result.competitionName : "-"}</td>
                	<td>${result.competitionPlacement ? result.competitionPlacement : "-"}</td>
                </tr>
            `;

			document.querySelector("#member-dialog-results-list").insertAdjacentHTML("beforeend", html);
		}
	}
}

export { memberResultsDialog };
