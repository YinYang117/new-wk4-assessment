const { expect } = require("chai");

const Castle = require("../class/castle.js");
const Noble = require("../class/noble.js");
const King = require("../class/king.js");
const Staff = require("../class/staff.js");

describe("Castle", function () {
  it("should set a name for the castle when created", function () {
    let castle = new Castle("Warwick");

    expect(castle.name).to.equal("Warwick");
  });

  it("should set income and expenses to 0 when created", function () {
    let castle = new Castle("Warwick");

	expect(castle.income).to.equal(0);
	expect(castle.expenses).to.equal(0);
  });

  it("should have an array of nobility living there", function () {
	let castle = new Castle("Edinburgh");

	expect(castle.name).to.equal("Edinburgh");
	expect(castle.nobility).to.deep.equal([]);
  })
})

describe("Noble", function () {
	it("should set a name and income for the noble when created", function () {
		let noble1 = new Noble("Lancelot", 1000);

		expect(noble1.name).to.equal("Lancelot");
		expect(noble1.income).to.equal(1000);

		let noble2 = new Noble("Guinevere", 1200);
		
		expect(noble2.name).to.equal("Guinevere");
		expect(noble2.income).to.equal(1200);
	});
});

describe("King", function () {
	it("should set a name and income for the king when created", function () {
		let king = new King("Arthur", 1000);
	});

	it("should have a method to add a noble to the king's list of nobles", function () {
		let king = new King("Arthur", 1000);
		let noble = new Noble("Lancelot", 1000);
		king.addNoble(noble);
		expect(king.nobility).to.deep.equal([noble]);
	});

	it("should have a method to remove a noble from the king's list of nobles", function () {
		let king = new King("Arthur", 1000);
		let noble = new Noble("Lancelot", 1000);
		king.addNoble(noble);
		king.removeNoble(noble);
		expect(king.nobility).to.deep.equal([]);
	});

	it("should have a method to calculate the total income of all the nobles", function () {
		let king = new King("Arthur", 1000);
		let noble1 = new Noble("Lancelot", 1000);
		let noble2 = new Noble("Guinevere", 1200);
		king.addNoble(noble1);
		king.addNoble(noble2);
		expect(king.totalIncome()).to.equal(2200);
	});

	it("should have a method to calculate the total expenses of all the nobles", function () {
		let king = new King("Arthur", 1000);
		let noble1 = new Noble("Lancelot", 1000);
		let noble2 = new Noble("Guinevere", 1200);
		king.addNoble(noble1);
		king.addNoble(noble2);
		expect(king.totalExpenses()).to.equal(0);
	});

	
});

// it("should allow nobles to be added to the castle", function () {
// 	let castle = new Castle("York");
// 	let noble = new Noble("Sir John the Bald");
// 	castle.addNoble(noble);
// 	expect(castle.nobility).to.deep.equal([noble]);
//   })

/*
13 its. 2 are pretty long.
4 classes.
1 class is almost the same but little extra.

Ideas:
	you have a castle
	nobles should be able to be added to the castle
		they have income
		they have a title
	the castle has a total income
	you can add staff to the castle
		they are expenses
	the castle has a total expenses
	can't add staff if there isn't enough income
	King is a noble
	each castle can only have one king
*/