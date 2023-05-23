import { apiUpdateMember, refreshMembersView } from "./api.js";
import { memberDetailsDialog } from "./member-detailed-view.js";
import { notificationFeedback } from "./notification-feedback.js";
import { createMinMaxDate } from "./helpers-module.js";

function updateMemberForm(member) {
	document.querySelector("#main-dialog").innerHTML = "";
	// create the form
	const updateMemberForm = /*html*/ `
	<h2>Update member</h2>
    <form id="update-member-form">
	<div id="form-content">
        <label for="firstName">First name</label>
        <input type="text" name="firstName" id="firstName" minlength="2" maxlength="20" value="${
			member.firstName
		}" required>
        
        <label for="lastName">Last name</label>
        <input type="text" name="lastName" id="lastName" minlength="2" maxlength="20" value="${
			member.lastName
		}" required>
        
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="${member.email}" required>
        
        <label for="image">Image</label>
        <input type="url" name="image" id="image" pattern=".*\.(jpg|jpeg|png|svg|webp|bmp|JPG|JPEG|PNG|SVG|WEBP|BMP)$" title="Please enter a valid URL ending with .jpg, .jpeg, .png, .svg, .webp, or .bmp"  value=${
			member.image
		} required>
        
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" min=${createMinMaxDate(100)} max=${createMinMaxDate(
		5
	)} value="${member.dateOfBirth}" required>
        
        <label for="gender">Gender</label>
        <select name="gender" id="gender" value="${member.gender}" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
        </select>
        
        <label for="membershipStatus">Membership status</label>
        <select name="membershipStatus" id="membershipStatus" required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
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
	document.querySelector("#gender").value = member.gender;
	document.querySelector("#membershipStatus").value = showMemberActivityStatus(member);

	// convert the boolean value from isCompetitive to a selection in the member type dropdown
	showMemberCompetitiveStatus(member);
	// display disciplines container if member is competitive
	const form = document.querySelector("#update-member-form");
	const memberTypeSelect = form.querySelector("#memberType");

	displayDisciplines();
	memberTypeSelect.addEventListener("change", displayDisciplines);

	// add event listener to submit and reset buttons
	form.addEventListener("submit", confirmUpdateMember);
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

	function confirmUpdateMember(event) {
		event.preventDefault();
		const dialogContent = document.querySelector("#main-dialog");
		const form = event.target;

		dialogContent.innerHTML = "";

		const html = /*html*/ `
		<h2>Summary of update changes</h2>
		
		<section class="member-details-section"> 

			<div class="details-body-grid"> 
				<div class="details-img"> 
					<img src="${form.image.value}">
				</div>
				<div class="details-else"> 
					<h3>First name</h3>
					<p>${form.firstName.value}</p> 
					<h3>Last name</h3>
					<p>${form.lastName.value}</p>
					<h3>E-mail</h3>
					<p>${form.email.value}</p> 
					<h3>Date of Birth</h3>
					<p>${form.dateOfBirth.value}</p> 
					<h3>Gender</h3>
					<p>${form.gender.value}</p> 
					<h3>Membership Status</h3>
					<p>${form.membershipStatus.value}</p> 
					<h3>Member Type</h3>
					<p>${form.memberType.value}</p> 
					<h3>${
						form.memberType.value === "competitive"
							? "Disciplines:</h3> " +
							  [...form.disciplines]
									.filter((discipline) => discipline.checked)
									.map((discipline) => discipline.value)
							: ""
					}
				</div>
				
			</div>
			<div id="confirmation-update-btns"> 
					<p><button id="confirm-update-btn" >Confirm update</button></p>
					<p><button id="cancel-update-btn" >Cancel update</button></p>
				</div>
	 </section>

	`;

		dialogContent.insertAdjacentHTML("beforeend", html);
		document.querySelector("#confirm-update-btn").addEventListener("click", () => updateMember());
		document.querySelector("#cancel-update-btn").addEventListener("click", () => memberDetailsDialog(member));

		async function updateMember() {
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
				document.querySelector("#main-dialog-frame").close();

				notificationFeedback(`${member.firstName} ${member.lastName} has been updated ✅`, true);
				refreshMembersView();
			} else {
				console.log("Error occured while updated member");
				notificationFeedback("Error occured while updating member ⛔", false);
			}
		}
	}
}

// helper functions for updateMemberForm - might need better function names
function showMemberActivityStatus(member) {
	return member.isActiveMember ? "active" : "inactive";
}

function showMemberCompetitiveStatus(member) {
	console.log(member.isCompetitive);
	member.isCompetitive
		? (document.querySelector("#competitive").selected = true)
		: (document.querySelector("#casual").selected = true);
}

function setCheckBoxValues(member) {
	
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
