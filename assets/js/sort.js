import { showMembers } from "./show-members.js";
import {calculateMemberAge} from "./member-detailed-view.js"

function sortMembers(membersArr) {
    const sortValue = document.querySelector("#members-sort").value;
    
    let sortedMembers = membersArr.sort(picksort)
    reverseArray();

    function picksort(member1, member2) {
        console.log(sortValue);

        if (!sortValue.includes("-") && sortValue !== "dateOfBirth") {
            return member1[sortValue].localeCompare(member2[sortValue]);
        } else if (!sortValue.includes("-") && sortValue === "dateOfBirth") {
            return calculateMemberAge(member1) - calculateMemberAge(member2);
        } else if (sortValue === "non-binary") {
            //???

        }
    }

    function reverseArray() {
        
        if (sortValue.includes("-reverse")) {
			sortedMembers.reverse();
		}
    }

    return sortedMembers
}





export {sortMembers}