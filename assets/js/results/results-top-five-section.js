import { members, results } from "../helpers/api.js";

// Function to refresh the top 5 results based on the current filters
function refreshTop5Results() {
	// Get the filtered data based on the current filters
	const filteredData = applyFilters(members, results);
	const filteredMembers = filteredData.members;
	let filteredResults = filteredData.results;
	// filter the results based on the filtered members
	filteredResults = filteredResults.filter((result) =>
		filteredMembers.some((member) => member.uid === result.memberId)
	);
	// Clear the existing top 5 results from the UI
	clearTop5Results();
	// Call getTop5Results with the updated filtered data
	getTop5Results(filteredResults);
}

// Function to clear the existing top 5 results from the UI
function clearTop5Results() {
	const topFiveGridItems = document.querySelectorAll(".top-five-grid-item");
	topFiveGridItems.forEach((item) => {
		item.remove();
	});
}

function getTop5Results(results) {
	// Convert time from string to number in seconds
	calculateTimeToSeconds(results);

	// Get top 5 results for each discipline
	const top5AllDisciplines = {};
	const disciplines = ["butterfly", "freestyle", "backstroke", "breaststroke"];

	for (const discipline of disciplines) {
		// Track unique members for the current discipline
		const uniqueMembers = {};

		// Get top 5 results for the current discipline from filtered results
		const uniqueResults = results
			.filter((result) => result.discipline === discipline)
			.sort((a, b) => a.time - b.time)
			.reduce((uniqueResults, result) => {
				// Check if the member has already been added for this discipline
				if (!uniqueMembers[result.memberId]) {
					// Add the member to the unique members object and push the result to the accumulator
					uniqueMembers[result.memberId] = result.memberName;
					uniqueResults.push(result);
				}
				return uniqueResults;
			}, [])
			.slice(0, 5);

		// Add top 5 results as an array to top5AllDisciplines object
		top5AllDisciplines[discipline] = uniqueResults;
	}

	convertTimeBackToString(results);
	showTop5Results(top5AllDisciplines);
}

function showTop5Results(allDisciplines) {
	Object.keys(allDisciplines).forEach((discipline) => {
		const disciplineResults = allDisciplines[discipline];

		if (disciplineResults.length > 0) {
			// Add index of result + 1 to each result as a key called top5placement
			calculateTopFivePlacement(disciplineResults);

			// const gridArticle = document.querySelector(`#top-five-${discipline}`);
			// gridArticle.querySelector("h3").textContent = discipline;

			let delay = 0;
			for (const result of disciplineResults) {
				const gridElement = showTop5result(result);
				gridElement.style.setProperty("--delay", delay + "s");
				delay += 0.05;
			}
		} else {
			noResults(discipline);
		}
	});
}

function showTop5result(result) {
	const gridArticle = document.querySelector(`#top-five-${result.discipline}`);
	const htmlGridItem = /*html*/ `
	    <div class="top-five-grid-item">
	    <h4>${result.top5placement}: ${result.memberName}</h4>
	    <p>Gender: ${result.memberGender}</p>
	    <p>Time: ${result.time}</p>
	    <p>Date: ${result.date}</p>
	    <p>Type: ${result.resultType}</p>
	    </div>
    `;
	gridArticle.insertAdjacentHTML("beforeend", htmlGridItem);

	return gridArticle;
}

function noResults(discipline) {
	const gridArticle = document.querySelector(`#top-five-${discipline}`);
	const htmlGridItem = /*html*/ `
	    <div class="top-five-grid-item">
	    <h4>No results available</h4>
	    </div>
    `;
	gridArticle.insertAdjacentHTML("beforeend", htmlGridItem);
}

// filters
// filter members by age group
function filterByAgeGroup(members) {
	const ageFilter = document.querySelector("#age-filter").value;
	return members.filter((member) => member.agegroup.toLowerCase() === ageFilter.toLowerCase());
}

// filter by gender from dropdown
function filterByGender(members) {
	const genderFilter = document.querySelector("#gender-filter").value;
	return members.filter((member) => member.gender.toLowerCase() === genderFilter.toLowerCase());
}

// filter by result type from checkboxes
function filterByResultType(results) {
	// create an array of the checked result types
	const checkedResultTypes = Array.from(document.querySelectorAll(".result-type-filter:checked")).map(
		(checkbox) => checkbox.value
	);

	return results.filter((result) => {
		if (checkedResultTypes.length === 0) {
			// If no result type checkboxes are checked, exclude all results
			return false;
		} else {
			return checkedResultTypes.includes(result.resultType);
		}
	});
}

function applyFilters(members, results) {
	let filteredMembers = filterByAgeGroup(members);
	filteredMembers = filterByGender(filteredMembers);
	const filteredResults = filterByResultType(results);
	return { members: filteredMembers, results: filteredResults };
}

// helper functions
function calculateTimeToSeconds(results) {
	for (const result of results) {
		const time = result.time.split(":");
		const minutes = Number(time[0]);
		const seconds = Number(time[1]);
		// convert minutes to seconds, add seconds and set decimal to 3 digits
		// Number() converts the result to a number (from string) and toFixed(2) sets the decimal to 2 digits
		const resultInSeconds = Number((minutes * 60 + seconds).toFixed(2));
		result.time = resultInSeconds;
	}
}

function convertTimeBackToString(results) {
	for (const result of results) {
		const minutes = Math.floor(result.time / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (result.time % 60).toFixed(2).padStart(5, "0");
		const timeString = `${minutes}:${seconds}`;
		result.time = timeString;
	}
}

function calculateTopFivePlacement(top5results) {
	for (const [index, result] of top5results.entries()) {
		result.top5placement = index + 1;
	}
}

export { getTop5Results, refreshTop5Results };
