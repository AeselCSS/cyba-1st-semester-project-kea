

function closeDialogEventListener() {
    const closeDialogButton = document.querySelector("#btn-close-dialog-modal");
	const dialogContent = document.querySelector("#main-dialog");
	const dialogModal = document.querySelector("#main-dialog-border");
	closeDialogButton.addEventListener("click", () => {
		dialogContent.innerHTML = "";
		dialogModal.close();
	});
}


export {closeDialogEventListener}