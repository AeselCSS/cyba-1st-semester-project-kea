import { members } from "../helpers/api.js";
import { countInactiveMembers } from "./member-table.js";

//Prices for each member type
const inactiveSubscriptionPrice = 500;
const juniorSubscriptionPrice = 1000;
const seniorSubscriptionPrice = 1600;
const seniorPlusSubscriptionPrice = 1200;

// Number of total members of each type
let totalInactiveMembers = 0;
let totalJuniorMembers = 0;
let totalSeniorMembers = 0;
let totalSeniorPlusMembers = 0;

//
function displayFinancialTable() {
	countAllMemberTypes();
	populateAmountInTable(totalInactiveMembers, totalJuniorMembers, totalSeniorMembers, totalSeniorPlusMembers);
	populateSubscriptionPrice();
	subscriptionSubTotal(totalInactiveMembers, totalJuniorMembers, totalSeniorMembers, totalSeniorPlusMembers);
}

function updateFinancialTable() {
	countAllMemberTypes();
	populateAmountInTable(totalInactiveMembers, totalJuniorMembers, totalSeniorMembers, totalSeniorPlusMembers);
	subscriptionSubTotal(totalInactiveMembers, totalJuniorMembers, totalSeniorMembers, totalSeniorPlusMembers);
}

function countAllMemberTypes() {
	//Inactive - Iterates through members and returns number of inactive members using filter
	totalInactiveMembers = countInactiveMembers();

	//Junior - Counts all Junior members
	totalJuniorMembers = countJuniorMembers();

	//Senior - Counts all Senior members
	totalSeniorMembers = countSeniorMembers();

	//SeniorPlusMembers - Counts all senior plus members
	totalSeniorPlusMembers = countSeniorPlusMembers();
}

// Displays total number of each category in the Overview Table
function populateAmountInTable(inactive, junior, senior, seniorPlus) {
	document.querySelector("#inactive-count").textContent = inactive;
	document.querySelector("#junior-count").textContent = junior;
	document.querySelector("#senior-count").textContent = senior;
	document.querySelector("#senior-plus-count").textContent = seniorPlus;
}

function populateSubscriptionPrice() {
	// addCommaInNumber 
	const inactiveSubscriptionPriceWithComma = addCommaInNumber(inactiveSubscriptionPrice)
	const juniorSubscriptionPriceWithComma = addCommaInNumber(juniorSubscriptionPrice)
	const seniorSubscriptionPriceWithComma = addCommaInNumber(seniorSubscriptionPrice)
	const seniorPlusSubscriptionPriceWithComma = addCommaInNumber(seniorPlusSubscriptionPrice)


	//Displays the subscription price per year for each member type category in the table overview
	document.querySelector("#inactive-subscription").textContent = inactiveSubscriptionPriceWithComma;
	document.querySelector("#junior-subscription").textContent = juniorSubscriptionPriceWithComma;
	document.querySelector("#senior-subscription").textContent = seniorSubscriptionPriceWithComma;
	document.querySelector("#senior-plus-subscription").textContent = seniorPlusSubscriptionPriceWithComma;
}

//Calculates the total subscription price for each member type category by multiplying amount of members * subscription price
function subscriptionSubTotal(inactiveCount, juniorCount, seniorCount, seniorPlusCount) {
	const inactiveSubTotal = inactiveCount * inactiveSubscriptionPrice;
	const juniorSubTotal = juniorCount * juniorSubscriptionPrice;
	const seniorSubTotal = seniorCount * seniorSubscriptionPrice;
	const seniorPlusSubTotal = seniorPlusCount * seniorPlusSubscriptionPrice;
	const grandTotal = inactiveSubTotal + juniorSubTotal + seniorSubTotal + seniorPlusSubTotal;
	
	// addCommaInNumber
	const inactiveSubTotalWithComma = addCommaInNumber(inactiveSubTotal);
	const juniorSubTotalWithComma = addCommaInNumber(juniorSubTotal);
	const seniorSubTotalWithComma = addCommaInNumber(seniorSubTotal);
	const seniorPlusSubTotalWithComma = addCommaInNumber(seniorPlusSubTotal);
	const grandTotalWithComma = addCommaInNumber(grandTotal);


	//Displays the total subscription price for each member type and the total sum /grand total category in the table overview
	document.querySelector("#inactive-subscription-subtotal").textContent = inactiveSubTotalWithComma;
	document.querySelector("#junior-subscription-subtotal").textContent = juniorSubTotalWithComma;
	document.querySelector("#senior-subscription-subtotal").textContent = seniorSubTotalWithComma;
	document.querySelector("#senior-plus-subscription-subtotal").textContent = seniorPlusSubTotalWithComma;
	document.querySelector("#total-member-subscription-grand-total").textContent = grandTotalWithComma;

	displayGrandTotalExcludingIndebted(grandTotal);
}

function displayGrandTotalExcludingIndebted(grandTotalIncludingDebt) {
	const debt = calculateDebt();

	const grandTotalExcludingDebt = grandTotalIncludingDebt - debt;
	const grandTotalExcludingDebtWithComma = addCommaInNumber(grandTotalExcludingDebt);

	document.querySelector("#total-member-subscription-grand-total-excluding-indebted").textContent =
		grandTotalExcludingDebtWithComma;
}

function calculateDebt() {
	let amount = 0;
	//Created array of indebted members using filter
	const membersInDebtArr = members.filter((member) => member.hasPayed === false);

	for (const debtedMember of membersInDebtArr) {
		if (!debtedMember.isActiveMember) {
			amount += 500;
		} else if (debtedMember.agegroup === "junior") {
			amount += 1000;
		} else if (debtedMember.agegroup === "senior") {
			amount += 1600;
		} else if (debtedMember.agegroup === "senior+") {
			amount += 1200;
		}
	}
	return amount;
}

function addCommaInNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Iterates through members and returns number of juniors members using filter
function countJuniorMembers() {
	const juniorArr = members.filter((member) => member.agegroup === "junior");
	return juniorArr.length;
}

// Iterates through members and returns number of seniors members using filter
function countSeniorMembers() {
	const seniorArr = members.filter((member) => member.agegroup === "senior");
	return seniorArr.length;
}
// Iterates through members and returns number of seniors plus members using filter
function countSeniorPlusMembers() {
	const seniorPlusArr = members.filter((member) => member.agegroup === "senior+");
	return seniorPlusArr.length;
}

export { displayFinancialTable, updateFinancialTable };
