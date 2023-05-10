// imports
import { checkIfLoggedIn } from "./system-access.js";

function logout() {
	localStorage.removeItem("user");
	checkIfLoggedIn();
}

export { logout };