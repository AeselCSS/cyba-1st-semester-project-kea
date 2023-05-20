function notificationFeedback(messageString, isSuccessful) {
	const dialog = document.querySelector("#notification-feedback");
	dialog.style.display = "flex";
	dialog.classList.add("pop-in-out");
	dialog.innerHTML = `<h3>${messageString}</h3>`;
	dialog.addEventListener("animationend", () => {
		dialog.style.display = "none";
	});

	if (isSuccessful) {
		dialog.style.backgroundColor = "white";
	} else {
		dialog.style.backgroundColor = "rgb(249, 95, 95)";
	}
}

export { notificationFeedback };
