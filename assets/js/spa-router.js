function initViews() {
	window.addEventListener("hashchange", viewChange); // whenever the hash changes (you hit a link or change the hash)
	viewChange(); // by default, call viewChange to display the first view
}

function viewChange() {
	let hashLink = "#home"; // default view

	if (location.hash) {
		// if there's a hash value, use as link
		hashLink = location.hash;
	}

	hideAllViews(); // hide all views

	document.querySelector(hashLink).classList.add("active"); // add .active to the view you want to show
	setActiveLink(hashLink); // set active link in nav bar
}

function setActiveLink(view) {
	const link = document.querySelector(`a.view-link[href="${view}"]`); // reference to link in nav bar
	if (link) {
		link.classList.add("active"); // add .active to active link in nav bar
	}
}

function hideAllViews() {
	// remove .active for all .view-content elements (all views) and .view-link elements (all links)
	document.querySelectorAll(".view-content").forEach((link) => link.classList.remove("active"));
	document.querySelectorAll(".view-link").forEach((link) => link.classList.remove("active"));
}

export { initViews };
