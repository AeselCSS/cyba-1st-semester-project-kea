function closeDialogEventListener() {
	const closeDialogButton = document.querySelector("#btn-close-dialog-modal");
	const dialogContent = document.querySelector("#main-dialog");
	const dialogModal = document.querySelector("#main-dialog-frame");
	closeDialogButton.addEventListener("click", () => {
		dialogContent.innerHTML = "";
		dialogModal.close();
	});
}

function resetFilterSearchSort() {
	document.querySelector("#search").value = "";
	document.querySelector("#members-sort").value = "firstName";
	document.querySelector("#filter").value = "all";
}

// create min/max date for date input
function createMinMaxDate(yearsToSubtract) {
	const today = new Date();
	// subtract years from today
	const date = today.setFullYear(today.getFullYear() - yearsToSubtract);
	// convert in ISO string
	return new Date(date).toISOString().split("T")[0];
}

export { closeDialogEventListener, resetFilterSearchSort, createMinMaxDate };
