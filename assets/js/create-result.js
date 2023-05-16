import { apiCreateResult, apiReadResults } from "./api.js";

function addResultDialog(member) {
	document.querySelector("#main-dialog").innerHTML = "";

	// create the form
	const html = /*html*/ `
    <h2>Add result</h2>
    <form id="create-result-form">
	<div id="form-content">

     <label for="resultType">Result type</label>
    <select name="resultType" id="resultType" required>
        <option value="training">Training</option>
        <option value="competition">Competition</option>
    </select>

    <label for="date">Date of result</label>
    <input type="date" name="date" id="date" required>

      <label for="discipline">Discipline</label>
    <select name="discipline" id="discipline" required>
        <option value="" hidden>Select discipline</option>
        <option value="butterfly" hidden>Butterfly</option>
        <option value="backstroke" hidden>Backstroke</option>
        <option value="breaststroke" hidden>Breaststroke</option>
        <option value="freestyle" hidden>Freestyle</option>
        <option value="medley" hidden>Medley</option>
    </select>

    <label for="time">time of result</label>
    <input type="text" name="time" id="time" placeholder="mm:ss.ms (eg. 01:30.24)" required>
    </div>

    <!-- competition details, only shows when competition type is selected -->
    <div id="competition-container" style="display: none">
        <label for="location">Location</label>
        <input type="text" name="location" id="location" placeholder="Location name">

        <label for="name">Name</label>
        <input type="text" name="name" id="name" placeholder="Competition name">

        <label for="placement">Placement</label>
        <input type="number" name="placement" id="placement" min="1" max="10" placeholder="Placement in competition">
    </div>
	
	<div id="form-buttons">
        <input type="reset" value="Reset">
        <input type="submit" value="Add result">
	</div>
</form>
        `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", html);

	// Only shows members disciplines in the dropdown menu
	showMemberDisciplines(member.disciplines);

	// Select form
	const form = document.querySelector("#create-result-form");

	// add event listener to result type dropdown (Training/Competition)
	const competitionFormFields = document.querySelector("#competition-container");

	// shows competition fields if selected in dropdown menu
	// adds/removes competition fields as required (can't submit training result if true)
	document.querySelector("#resultType").addEventListener("change", event => {
		if (form.resultType.value === "training") {
			competitionFormFields.style.display = "none";
			form.location.required = false;
			form.name.required = false;
			form.placement.required = false;
		} else if (form.resultType.value === "competition") {
			competitionFormFields.style.display = "grid";
			form.location.required = true;
			form.name.required = true;
			form.placement.required = true;
		}
	});

	// add event listener to submit and reset buttons
	form.addEventListener("submit", createResultObject);

	form.addEventListener("reset", () => {
		competitionFormFields.style.display = "none";
		form.reset();
	});

	function showMemberDisciplines(disciplinesArray) {
		// Selects discipline dropdown menu
		const disciplineDropDown = document.querySelector("#discipline");

		// Checks member discipline property, unhides the option in dropdown menu if present in disciplines array
		for (const discipline of disciplinesArray) {
			// Selects disciplines dropdown menu
			const disciplineOption = disciplineDropDown.querySelector(`option[value="${discipline}"]`);
			// Shows discipline option if it's present in array
			if (disciplineOption) {
				disciplineOption.hidden = false;
			}
		}
	}

	async function createResultObject(event) {
		event.preventDefault();

		// Selects dialog/modal
		const dialog = document.querySelector("#main-dialog");
		const dialogFrame = document.querySelector("#main-dialog-frame");

		// Selects form
		const form = event.target;

		// Create result object
		const result = {
			memberId: member.uid,
			resultType: form.resultType.value,
			date: form.date.value,
			discipline: form.discipline.value,
			time: form.time.value,
			competitionLocation: form.location.value,
			competitionName: form.name.value,
			competitionPlacement: form.placement.value,
		};

		// If training result, remove uneeded properties from object
		if (form.resultType.value === "training") {
			delete result.competitionLocation;
			delete result.competitionName;
			delete result.competitionPlacement;
		}

		// POST request to Firebase
		const response = await apiCreateResult(result);

		if (response.ok) {
			console.log("Result was added to Firebase! 🔥");
			console.log(response);
			form.reset();
			dialogFrame.close();
			dialog.innerHTML = "";
			//Fetch and update whole results arr.
			await apiReadResults();
		} else {
			console.log("Something went wrong with result POST request");
		}
	}
}

export { addResultDialog };
