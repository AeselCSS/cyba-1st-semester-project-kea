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
	document.querySelector("#checkbox-in-debt").checked = false;
	document.querySelector("#checkbox-competitive").checked = true;
}

// create max date for date input
function currentDate() {
	const today = new Date();
	// set max date to today
	return today.toISOString().split("T")[0];
}

export { closeDialogEventListener, resetFilterSearchSort, currentDate };
