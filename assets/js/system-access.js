import { login } from "./login.js";
import { logout } from "./logout.js";


function checkIfLoggedIn() {
  const user = localStorage.getItem("user");
  if (user) {
    // check user role in local storage and grant access
    systemAccess(localStorage.getItem("user"));
} else {
    location.href = "#home"; // redirect to guest landing page
    systemAccess("guest"); // grant guest access
}
}

// grant access based on user role in local storage
function systemAccess(role) {
    // nav links and buttons
    const membersLink = document.querySelector("#members-link")
    const financesLink = document.querySelector("#finances-link")
    const topFiveLink = document.querySelector("#top-five-link")
    const loginBtn = document.querySelector("#login-btn")
    const logoutBtn = document.querySelector("#logout-btn")

    // role specific buttons
    const resultsBtn = document.querySelectorAll(".grid-item-results-btn")
    const addMemberBtn = document.querySelector("#add-new-member-btn"); 


	console.log(`systemAccess: ${role} found in local storage`);
	if (role === "chairman") {
		// nav links and buttons
		loginBtn.className = "hidden";
		logoutBtn.className = "";
		membersLink.className = "";
		financesLink.className = "hidden";
		topFiveLink.className = "hidden";
		// role specific buttons
		addMemberBtn.className = "";
		ResultsBtnClass("hidden");
	} else if (role === "cashier") {
		// nav links and buttons
		loginBtn.className = "hidden";
		logoutBtn.className = "";
		membersLink.className = "";
		financesLink.className = "";
		topFiveLink.className = "hidden";
		// role specific buttons
		addMemberBtn.className = "hidden";
		ResultsBtnClass("hidden");
	} else if (role === "trainer") {
		// nav links and buttons
		loginBtn.className = "hidden";
		logoutBtn.className = "";
		membersLink.className = "";
		financesLink.className = "hidden";
		topFiveLink.className = "";
		// role specific buttons
		addMemberBtn.className = "hidden";
		ResultsBtnClass("");
	} else if (role === "guest") {
		console.log("no user logged in - guest view shown");
		// nav links and buttons
		loginBtn.className = "";
		logoutBtn.className = "hidden";
		membersLink.className = "hidden";
		financesLink.className = "hidden";
		topFiveLink.className = "hidden";
	}

    // eventlisteners
    document.querySelector("#login-btn").addEventListener("click", login);
    document.querySelector("#logout-btn").addEventListener("click", logout);
    
    // show/hide all results buttoms on member grid
    function ResultsBtnClass (string) {
        if (string) {
            resultsBtn.forEach((btn)=> btn.classList.add(string))  
        } else {
            resultsBtn.forEach((btn) => btn.classList.remove("hidden")); 
        }
    }
}


export { checkIfLoggedIn, systemAccess };