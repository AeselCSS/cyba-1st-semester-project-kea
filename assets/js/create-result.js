import { apiCreateResult } from "./api.js";

function addResultDialog(memberUid) {

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
        <option value="butterfly">Butterfly</option>
        <option value="backstroke">Backstroke</option>
        <option value="breaststroke">Breaststroke</option>
        <option value="freestyle">Freestyle</option>
        <option value="medley">Medley</option>
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

	const form = document.querySelector("#create-result-form");

	// add event listener result type dropdown
	const competitionFormFields = document.querySelector("#competition-container");

	// shows competition fields if selected in dropdown menu
	// adds/removes competition fields as required (can't submit training result if true)
	document.querySelector("#resultType").addEventListener("change", event => {
		if (form.resultType.value === "training") {
			competitionFormFields.style.display = "none";
			form.location.required = true;
			form.name.required = true;
			form.placement.required = true;
		} else if (form.resultType.value === "competition") {
			competitionFormFields.style.display = "grid";
			form.location.required = false;
			form.name.required = false;
			form.placement.required = false;
		}
	});

	// add event listener to submit and reset buttons
	form.addEventListener("submit", createResultObject);
	form.addEventListener("reset", () => {
		competitionFormFields.style.display = "none";
		form.reset();
	});

	async function createResultObject(event) {
		event.preventDefault();

		const form = event.target;

		const result = {
			memberId: memberUid,
			resultType: form.resultType.value,
			date: form.date.value,
			discipline: form.discipline.value,
			time: form.time.value,
			competitionLocation: form.location.value,
			competitionName: form.name.value,
			competitionPlacement: form.placement.value,
		};

		if (form.resultType.value === "training") {
			delete result.competitionLocation;
			delete result.competitionName;
			delete result.competitionPlacement;
		}
		console.log(result);

      

	}
}

export { addResultDialog };
