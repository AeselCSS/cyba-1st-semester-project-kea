

function showMembers(members) {
    clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
    const htmlGrid = /*html*/`
    <article class="grid-item">
        <img src=${member.image}>
        <p>${member.firstName} ${member.lastName}</p>
    </article>
    `

    document.querySelector("#members-grid").insertAdjacentHTML("beforeend", htmlGrid);

    
}

function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}
