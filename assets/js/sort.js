import {calculateMemberAge} from "./member-detailed-view.js"
import { showMembers } from "./show-members.js";



function sortAndShowMembers(membersArr) {
    const sortValue = document.querySelector("#members-sort").value;
    
    let sortedMembers = membersArr.sort(picksort)
    ifIncludesReverse();

    function picksort(member1, member2) {
        if (!sortValue.includes("-") && sortValue !== "dateOfBirth") {
            return member1[sortValue].localeCompare(member2[sortValue]);
        } else if (!sortValue.includes("-") && sortValue === "dateOfBirth") {
            return calculateMemberAge(member1) - calculateMemberAge(member2);
        }
    }

    function ifIncludesReverse() {
        
        if (sortValue.includes("-reverse")) {
			sortedMembers.reverse();
		}
    }

    showMembers(sortedMembers);
}





export {sortAndShowMembers}