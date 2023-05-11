import { apiUpdateMember } from "./api.js";

function updateMemberForm(member) {
	console.log(member.uid);
	console.log("update function");

	document.querySelector("#main-dialog").innerHTML = "";
	// create the form
	const updateMemberForm = /*html*/ `
    <form id="update-member-form">
	<div id="form-content">
        <label for="firstName">First name</label>
        <input type="text" name="firstName" id="firstName" value="${member.firstName}" required>
        
        <label for="lastName">Last name</label>
        <input type="text" name="lastName" id="lastName" value="${member.lastName}" required>
        
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="${member.email}" required>
        
        <label for="image">Image</label>
        <input type="url" name="image" id="image" value=${member.image} required>
        
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" value="${member.dateOfBirth}" required>
        
        <label for="gender">Gender</label>
        <select name="gender" id="gender" value="${member.gender}" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        </select>
        
        <label for="membershipStatus">Membership status</label>
        <select name="membershipStatus" id="membershipStatus" value="${showMemberActivityStatus(member)}" required>
        <option value="active">Active</option>
        <option value="passiv">Passiv</option>
        </select>

        <label for="memberType">Member type</label>
        <select name="memberType" id="memberType"  required>
        <option id="casual" value="casual">Casual</option>
        <option id="competitive" value="competitive" >Competitive</option>
        </select>

        <div id="disciplines-container" style="display: none;">
        <label>Disciplines</label>
        <br>
        <input type="checkbox" name="disciplines" id="butterfly" value="butterfly"> Butterfly
        <input type="checkbox" name="disciplines" id="backstroke" value="backstroke"> Backstroke
        <input type="checkbox" name="disciplines" id="breaststroke" value="breaststroke"> Breaststroke
        <input type="checkbox" name="disciplines" id="freestyle" value="freestyle"> Freestyle
        <input type="checkbox" name="disciplines" id="medley" value="medley"> Medley
      </div>
	</div>
	  <div id="form-buttons">
    <input type="reset" value="Reset">
    <input type="submit" value="Update member">
	</div>
	</form>
        `;
	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", updateMemberForm);

	// convert the boolean value from isCompetitive to a selection in the member type dropdown
	showMemberCompetitiveStatus(member);
	// display disciplines container if member is competitive
	const form = document.querySelector("#update-member-form");
	const memberTypeSelect = form.querySelector("#memberType");

	displayDisciplines();
	memberTypeSelect.addEventListener("change", displayDisciplines);

	// add event listener to submit and reset buttons
	form.addEventListener("submit", updateMember);
	form.addEventListener("reset", () => form.reset());

	function displayDisciplines() {
		const disciplinesContainer = form.querySelector("#disciplines-container");
		if (memberTypeSelect.value === "competitive") {
			disciplinesContainer.style.display = "block";
			if (member.disciplines) {
				setCheckBoxValues(member);
			}
		} else {
			disciplinesContainer.style.display = "none";
		}
	}

	// updateMember function
	async function updateMember(event) {
		console.log(event);
		event.preventDefault();

		const dialog = document.querySelector("#main-dialog");
		const form = event.target;

		const updatedMember = {
			uid: member.uid,
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			email: form.email.value,
			image: form.image.value,
			dateOfBirth: form.dateOfBirth.value,
			gender: form.gender.value,
			isActiveMember: form.membershipStatus.value === "active",
			isCompetitive: form.memberType.value === "competitive",
			disciplines:
				form.memberType.value === "competitive"
					? [...form.disciplines]
							.filter((discipline) => discipline.checked)
							.map((discipline) => discipline.value)
					: [],
		};

		const response = await apiUpdateMember(updatedMember);
		if (response.ok) {
			console.log("Member updated");
			console.log(updatedMember);
			// reset the form, close the dialog and clear the dialog content
			form.reset();
			dialog.close();
			dialog.innerHTML = "";
			// TODO: show success message to user
			// TODO: update members list
		} else {
			console.log("Error occured while updated member");
			// TODO: show error message to user
		}
	}
}

// helper functions for updateMemberForm - might need better function names
function showMemberActivityStatus(member) {
	return member.isActiveMember ? "Active" : "Inactive";
}

function showMemberCompetitiveStatus(member) {
	console.log(member.isCompetitive);
	member.isCompetitive
		? (document.querySelector("#competitive").selected = true)
		: (document.querySelector("#casual").selected = true);
}

function setCheckBoxValues(member) {
	console.log(member.disciplines);
	for (const discipline of member.disciplines) {
		if (discipline.includes("butterfly")) {
			document.querySelector("#butterfly").checked = true;
		} else if (discipline.includes("backstroke")) {
			document.querySelector("#backstroke").checked = true;
		} else if (discipline.includes("breaststroke")) {
			document.querySelector("#breaststroke").checked = true;
		} else if (discipline.includes("freestyle")) {
			document.querySelector("#freestyle").checked = true;
		} else if (discipline.includes("medley")) {
			document.querySelector("#medley").checked = true;
		}
	}
}

export { updateMemberForm };
