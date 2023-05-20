function notificationFeedback(messageString, isSuccessful) {
	const dialog = document.querySelector("#notification-feedback");
	dialog.style.display = "flex";
	dialog.classList.add("fade-out");
	dialog.innerHTML = messageString;
	dialog.addEventListener("animationend", () => {
		dialog.style.display = "none";
	});

	if (isSuccessful) {
		dialog.style.backgroundColor = "green";
	} else {
		dialog.style.backgroundColor = "red";
	}
}

export { notificationFeedback };
