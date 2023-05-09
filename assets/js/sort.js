import { showMembers } from "./show-members.js";


function sortMembers(membersArr) {
    const sortValue = document.querySelector("#members-sort").value;
    
    let sortedMembers = membersArr.sort(picksort)
    reverseArray();

    function picksort(member1, member2) {
        console.log(sortValue);

        if (!sortValue.includes("-") && sortValue !== "dateOfBirth") {
            return member1[sortValue].localeCompare(member2[sortValue]);
        } else if (!sortValue.includes("-") && sortValue === "dateOfBirth") {


            
            return member1[sortValue] - member2[sortValue];
        }
    }

    function reverseArray() {
        
        if (sortValue.includes("-reverse")) {
			sortedMembers.reverse();
		}
    }

    showMembers(sortedMembers)
}





export {sortMembers}