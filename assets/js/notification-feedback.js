function notificationFeedback(messageString, isSuccessful) {
	const dialog = document.querySelector("#notification-feedback");

	// dialog.showModal();

	if (isSuccessful) {
		dialog.style.backgroundColor = "green";
	} else {
		dialog.style.backgroundColor = "orange";
	}
	dialog.classList.add("fade-out");
	dialog.classList.add("fade-out");
	dialog.classList.add("hidden");
	dialog.innerHTML = messageString;
}

export { notificationFeedback };
