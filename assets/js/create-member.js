// imports
import { apiCreateMember, updateMemberDisplay } from "./api.js";

const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

// createMember form upon clicking the create new member button
function createMemberForm() {
	// clear the dialog content if any - we need to do this smarter and uniform in the future
    document.querySelector("#main-dialog").innerHTML = "";
	// create the form
	const createMemberForm = /*html*/ `
    <form id="create-member-form">
        <label for="firstName">First name</label>
        <input type="text" name="firstName" id="firstName" required>
        
        <label for="lastName">Last name</label>
        <input type="text" name="lastName" id="lastName" required>
        
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
        
        <label for="image">Image</label>
        <input type="url" name="image" id="image" value=${defaultAvatar} required>
        
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" required>
        
        <label for="gender">Gender</label>
        <select name="gender" id="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        </select>
        
        <label for="membershipStatus">Membership status</label>
        <select name="membershipStatus" id="membershipStatus" required>
        <option value="active">Active</option>
        <option value="passiv">Passiv</option>
        </select>

        <label for="memberType">Member type</label>
        <select name="memberType" id="memberType" required>
        <option value="casual">Casual</option>
        <option value="competitive">Competitive</option>
        </select>

        <div id="disciplines-container" style="display: none;">
        <label>Disciplines</label>
        <br>
        <input type="checkbox" name="disciplines" value="butterfly"> Butterfly
        <input type="checkbox" name="disciplines" value="backstroke"> Backstroke
        <input type="checkbox" name="disciplines" value="breaststroke"> Breaststroke
        <input type="checkbox" name="disciplines" value="freestyle"> Freestyle
        <input type="checkbox" name="disciplines" value="medley"> Medley
      </div>

        <input type="submit" value="Create member">
        <input type="reset" value="Reset">
        `;
	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", createMemberForm);
	const form = document.querySelector("#create-member-form");

	// Show/hide the disciplines container based on the member type
	const memberTypeSelect = form.querySelector("#memberType");
	const disciplinesContainer = form.querySelector("#disciplines-container");
	memberTypeSelect.addEventListener("change", () => {
		if (memberTypeSelect.value === "competitive") {
			disciplinesContainer.style.display = "block";
		} else {
			disciplinesContainer.style.display = "none";
		}
	});

	// add event listener to submit and reset buttons
	form.addEventListener("submit", createMember);
	form.addEventListener("reset", () => form.reset());

	document.querySelector("#main-dialog").showModal();
}

// createMember function
async function createMember(event) {
	event.preventDefault();

    const dialog = document.querySelector("#main-dialog");
	const form = event.target;
	
    const newMember = {
		firstName: form.firstName.value,
		lastName: form.lastName.value,
		email: form.email.value,
		image: form.image.value,
		dateOfBirth: form.dateOfBirth.value,
		gender: form.gender.value,
		isActiveMember: form.membershipStatus.value === "active",
		isCompetitive: form.memberType.value === "competitive",
		// add disciplines as an array of selescted values, but only if member type is competitive
		// [...form.disciplines] is a spread operator that converts a NodeList to an array
		// discipline.checked is a boolean value that is true if the checkbox is checked
		// the .map method is used to retrieve the "value" property of each selected checkbox, and returns them as a new array
		// the array is then assigned to the disciplines property of the newMember object
		// if the member type is not "competitive", the disciplines property is set to an empty array
		disciplines:
			form.memberType.value === "competitive"
				? [...form.disciplines].filter((discipline) => discipline.checked).map((discipline) => discipline.value)
				: [],
	};

	// call apiCreateMember function from api.js
	const response = await apiCreateMember(newMember);
	if (response.ok) {
		console.log("Member created");
        console.log(newMember);
		// reset the form, close the dialog and clear the dialog content
		form.reset();
		dialog.close();
		dialog.innerHTML = "";
		// TODO: show success message to user
		updateMemberDisplay();
	} else {
		console.log("Error occured while creating new member");
		// TODO: show error message to user
	}
}

export { createMemberForm };
