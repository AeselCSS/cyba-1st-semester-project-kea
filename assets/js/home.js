import { createMinMaxDate } from "./helpers-module.js";
import { notificationFeedback } from "./notification-feedback.js";

function displayJoinForm() {
	document.querySelector("#main-dialog").innerHTML = "";

	const html = /*html*/ `
		<form id="join-form">
			<div id="form-content">
				<label for="firstName">First name</label>
				<input type="text" name="firstName" id="firstName" required />

				<label for="lastName">Last name</label>
				<input type="text" name="lastName" id="lastName" required />

				<label for="email">Email</label>
				<input type="email" name="email" id="email" required />

				<label for="dateOfBirth">Date of birth</label>
				<input type="date" name="dateOfBirth" id="dateOfBirth" min=${createMinMaxDate(100)} max=${createMinMaxDate(
		5
	)} required />

				<label for="gender">Gender</label>
				<select name="gender" id="gender" required>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="non-binary">Non-binary</option>
				</select>
            </div>
							
				<div id="home-form-button">
					<input id="home-form-input-button" type="button" value="Send"/>
				</div>
		</form>
    `;

	document.querySelector("#main-dialog").insertAdjacentHTML("beforeend", html);
	document.querySelector("#main-dialog-frame").showModal();
	document.querySelector("#home-form-input-button").addEventListener("click", sendForm);
}

function sendForm() {
	document.querySelector("#main-dialog-frame").close();
	notificationFeedback("Success! We will reach back to you through Email", true);
}

export { displayJoinForm };
