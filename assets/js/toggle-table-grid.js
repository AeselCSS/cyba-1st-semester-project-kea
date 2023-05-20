function toggleTableGridView() {
	const button = document.querySelector("#toggle-table-grid");
	const table = document.querySelector("#members-table");
	const grid = document.querySelector(".member-grid-wrapper");

    
	grid.classList.toggle("hidden");
	table.classList.toggle("hidden");
    
	if ((button.textContent === "View table")) {
		button.textContent = "View grid";
	} else if ((button.textContent === "View grid")) {
		button.textContent = "View table";
	}
}

export { toggleTableGridView };
