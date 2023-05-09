

function showMembers(members) {
    clearContent();

	for (const member of members) {
		showMember(member);
	}
}

function showMember(member) {
    const htmlGrid = /*html*/`
    <article class="grid-item">
        
    </article>
    `

     
}

function clearContent() {
	document.querySelector("#members-grid").innerHTML = "";
	document.querySelector("#members-table").innerHTML = "";
}
