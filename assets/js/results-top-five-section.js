function getTop5Results(members, results) {
	// add name and gender to results
	for (const result of results) {
		const member = members.find((member) => member.uid === result.memberId);
		if (member) {
			result.memberName = `${member.firstName} ${member.lastName}`;
			result.memberGender = member.gender;
		}
	}
	// convert time from string to number in seconds 
	calculateTimeToSeconds(results);
	
	// Apply filters to members and results
	const filteredData = applyFilters(members, results);
	const filteredMembers = filteredData.members;
	let filteredResults = filteredData.results;

	filteredResults = filteredResults.filter((result) =>
		filteredMembers.some((member) => member.uid === result.memberId)
	);
	const top5AllDisciplines = [];
	const disciplines = ["butterfly", "freestyle", "backstroke", "breaststroke"];

	for (const discipline of disciplines) {
		// Get top 5 results for each discipline from filtered results
		const top5Discipline = filteredResults
			.filter((result) => result.discipline === discipline)
			.sort((a, b) => a.time - b.time)
			.slice(0, 5);

		// Add top 5 results to top5AllDisciplines array
		top5AllDisciplines.push(...top5Discipline);
	}
	// convert time back into string
	convertTimeBackToString(results);

	// Split top5AllDisciplines array into 4 arrays, one for each discipline
	const top5Butterfly = top5AllDisciplines.filter((result) => result.discipline === "butterfly");
	const top5Freestyle = top5AllDisciplines.filter((result) => result.discipline === "freestyle");
	const top5Backstroke = top5AllDisciplines.filter((result) => result.discipline === "backstroke");
	const top5Breaststroke = top5AllDisciplines.filter((result) => result.discipline === "breaststroke");

	showTop5Results(top5Butterfly);
	showTop5Results(top5Freestyle);
	showTop5Results(top5Backstroke);
	showTop5Results(top5Breaststroke);
}

function showTop5Results(top5results) {
	if (top5results.length > 0) {
		// add index of result +1 to each result as a key called top5placement
		calculateTopFivePlacement(top5results);
		const discipline = top5results[0].discipline;
		const gridArticle = document.querySelector(`#top-five-${discipline}`);
		gridArticle.querySelector("h3").textContent = discipline;
		for (const result of top5results) {
			showTop5result(result);
		}
	} else {
		noResults();
	}
}

function showTop5result(result) {
	// console.log(result);
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
}

function noResults() {
	const grid = document.querySelector("#top-five-grid");
	const html = /*html*/ `
		<h3>No results available with the selected filters</h3>
	`;
	grid.insertAdjacentHTML("beforeend", html);
}

// filters
// filter members by agegroup
function filterByAgeGroup(members) {
	const ageFilter = document.querySelector("#age-filter").value;
	return members.filter((member) => member.agegroup.toLowerCase() === ageFilter.toLowerCase());
}
// by gender from dropdown
function filterByGender(members) {
	const genderFilter = document.querySelector("#gender-filter").value;
	return members.filter((member) => member.gender.toLowerCase() === genderFilter.toLowerCase());
}

// by result type from checkboxes
function filterByResultType(results) {
	// create an array of the checked result types
	const checkedResultTypes = Array.from(document.querySelectorAll(".result-type-filter:checked")).map(
		(checkbox) => checkbox.value
	);
	// console.log(checkedResultTypes);
	return checkedResultTypes.length > 0
		? results.filter((result) => checkedResultTypes.includes(result.resultType))
		: results;
}

function applyFilters(members, results) {
	let filteredMembers = filterByAgeGroup(members);
	filteredMembers = filterByGender(filteredMembers);
	const filteredResults = filterByResultType(results);
	return { members: filteredMembers, results: filteredResults };
}

// display filters on the section title for top-five section
// function displayFilters() {
//     const ageFilter = document.querySelector("#age-filter").value;
//     const genderFilter = document.querySelector("#gender-filter").value;
//     const resultTypeFilters = Array.from(document.querySelectorAll(".result-type-filter:checked")).map(
//         (checkbox) => checkbox.value
//     );

//     const filtersString = `Top 5 results for:${ageFilter} ${genderFilter} ${resultTypeFilters.join(" ")}`;
//     document.querySelector("#top-five-filters").textContent = filtersString;
// }

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
		const minutes = Math.floor(result.time / 60);
		const seconds = (result.time % 60).toFixed(2);
		const timeString = `${minutes}:${seconds}`;
		result.time = timeString;
	}
}

function calculateTopFivePlacement(top5results) {
	for (const [index, result] of top5results.entries()) {
		result.top5placement = index + 1;
	}
}


// // check if a result object in results has a date property
// // if not add a date key and set it to a date between january 2020 and today

// function addDateToResults(results) {
// 	for (const result of results) {
// 		const resultId = result.id;
// 		if (!result.date) {
// 			const randomDate = new Date(
// 				2020,
// 				Math.floor(Math.random() * 12),
// 				Math.floor(Math.random() * 28) + 1
// 			).toLocaleDateString();
// 			result.date = randomDate;
// 			// update the result in the database
// 			apiUpdateResult(result);
// 		}
// 	}
// }

export { getTop5Results};
