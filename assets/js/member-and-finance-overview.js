import { members } from "./api.js";
import { countInactiveMembers } from "./member-table.js";
import { calculateMemberAge } from "./member-detailed-view.js";

const inactiveSubscriptionPrice = 500;
const juniorSubscriptionPrice = 1000;
const seniorSubscriptionPrice = 1600;
const seniorPlusSubscriptionPrice = 1200;

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
	//Inactive
	totalInactiveMembers = countInactiveMembers();

	//Junior
	totalJuniorMembers = countJuniorMembers();

	//Senior
	totalSeniorMembers = countSeniorMembers();

	//SeniorPlusMembers
	totalSeniorPlusMembers = countSeniorPlusMembers();
}

function populateAmountInTable(inactive, junior, senior, seniorPlus) {
	document.querySelector("#inactive-count").textContent = inactive;
	document.querySelector("#junior-count").textContent = junior;
	document.querySelector("#senior-count").textContent = senior;
	document.querySelector("#senior-plus-count").textContent = seniorPlus;
}

function populateSubscriptionPrice() {
	const subscriptionPriceArr = [
		inactiveSubscriptionPrice,
		juniorSubscriptionPrice,
		seniorSubscriptionPrice,
		seniorPlusSubscriptionPrice,
	];

	const [
		inactiveSubscriptionPriceWithComma,
		juniorSubscriptionPriceWithComma,
		seniorSubscriptionPriceWithComma,
		seniorPlusSubscriptionPriceWithComma,
	] = addCommaInNumber(subscriptionPriceArr);

	document.querySelector("#inactive-subscription").textContent = inactiveSubscriptionPriceWithComma;
	document.querySelector("#junior-subscription").textContent = juniorSubscriptionPriceWithComma;
	document.querySelector("#senior-subscription").textContent = seniorSubscriptionPriceWithComma;
	document.querySelector("#senior-plus-subscription").textContent = seniorPlusSubscriptionPriceWithComma;
}

function subscriptionSubTotal(inactiveCount, juniorCount, seniorCount, seniorPlusCount) {
	const inactiveSubTotal = inactiveCount * inactiveSubscriptionPrice;
	const juniorSubTotal = juniorCount * juniorSubscriptionPrice;
	const seniorSubTotal = seniorCount * seniorSubscriptionPrice;
	const seniorPlusSubTotal = seniorPlusCount * seniorPlusSubscriptionPrice;
	const grandTotal = inactiveSubTotal + juniorSubTotal + seniorSubTotal + seniorPlusSubTotal;

	const subTotalArr = [inactiveSubTotal, juniorSubTotal, seniorSubTotal, seniorPlusSubTotal, grandTotal];

	const [
		inactiveSubTotalWithComma,
		juniorSubTotalWithComma,
		seniorSubTotalWithComma,
		seniorPlusSubTotalWithComma,
		grandTotalWithComma,
	] = addCommaInNumber(subTotalArr);

	document.querySelector("#inactive-subscription-subtotal").textContent = inactiveSubTotalWithComma;
	document.querySelector("#junior-subscription-subtotal").textContent = juniorSubTotalWithComma;
	document.querySelector("#senior-subscription-subtotal").textContent = seniorSubTotalWithComma;
	document.querySelector("#senior-plus-subscription-subtotal").textContent = seniorPlusSubTotalWithComma;
	document.querySelector("#total-member-subscription-grand-total").textContent = grandTotalWithComma;
}

function addCommaInNumber(subTotalArr) {
	const subTotalArrWithComma = [];
	for (const subtotal of subTotalArr) {
		if (String(subtotal).length > 3) {
			const threeZeros = String(subtotal).slice(-3);
			const otherNumbers = String(subtotal).slice(0, -3);

			const result = `${otherNumbers}.${threeZeros}`;
			subTotalArrWithComma.push(result);
		} else {
			subTotalArrWithComma.push(String(subtotal));
		}
	}

	return subTotalArrWithComma;
}

function countJuniorMembers() {
	// let count = 0;=
	// for (const member of members) {
	// 	const age = calculateMemberAge(member);
	// 	if (age < 18) {
	// 		count++;
	// 	}
	// }
	// return count;

	// const juniorArr = members.filter((member) => {
	// 	if (calculateMemberAge(member) < 18) {
	// 		return member;
	// 	}
	// });

	const juniorArr = members.filter((member) => calculateMemberAge(member) < 18);
	return juniorArr.length;
}

function countSeniorMembers() {
	const seniorArr = members.filter((member) => calculateMemberAge(member) >= 18 && calculateMemberAge(member) <= 60);
	return seniorArr.length;
}

function countSeniorPlusMembers() {
	const seniorPlusArr = members.filter((member) => calculateMemberAge(member) > 60);
	return seniorPlusArr.length;
}

export { displayFinancialTable, updateFinancialTable };
