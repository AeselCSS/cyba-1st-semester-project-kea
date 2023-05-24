import { apiCreateResult, apiReadResults } from "../helpers/api.js";
import { createMinMaxDate } from "../helpers/helpers-module.js";
import { notificationFeedback } from "../helpers/notification-feedback.js";
import { refreshTop5Results } from "./results-top-five-section.js";

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
    <input type="date" name="date" id="date" max="${createMinMaxDate(0)}" required>

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
	<div id="time-container"> 
    <input type="number" name="mm" id="mm" step="1" placeholder="mm" min="0" max="59" required>
    <input type="number" name="ss" id="ss" step="1" placeholder="ss" min="0" max="59" required>
    <input type="number" name="ms" id="ms" step="1" placeholder="ms" min="0" max="99" required>
    </div>
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
	document.querySelector("#resultType").addEventListener("change", (event) => {
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
			time: resultTimeInputToString(),
			competitionLocation: form.location.value,
			competitionName: form.name.value,
			competitionPlacement: form.placement.value,
		};

		function resultTimeInputToString() {
			const minutes = document.querySelector("#mm").value;
			const seconds = document.querySelector("#ss").value;
			const miliSeconds = document.querySelector("#ms").value;

			return `${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}.${miliSeconds.padStart(2, "0")}`;
		}

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
			notificationFeedback(`Added new result for <b>${member.firstName} ${member.lastName}</b> ✅`, true);
			form.reset();
			dialogFrame.close();
			dialog.innerHTML = "";
			//Fetch and update whole results arr.
			await apiReadResults();
			refreshTop5Results();
		} else {
			console.log("Something went wrong with result POST request");
			notificationFeedback("Error occured while creating new result ⛔", false);
		}
	}
}

export { addResultDialog };
