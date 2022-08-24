const { expect } = require("chai");

const Adventurer = require("../classes/adventurer.js");
const Heros = require("../classes/heros.js");
const MagicShop = require("../classes/magicshop.js");
const Item = require("../classes/item.js"); 


describe("Adventurer", function () {
	it("should have a name", function () {
		let adventurer = new Adventurer("Parthanax")

		expect(adventurer.name).to.equal("Parthanax")
	});

	it("should have a level that defaults to 1", function () {
		let adventurer = new Adventurer("Parthanax")

		expect(adventurer.name).to.equal("Parthanax")
		expect(adventurer.level).to.equal(1)

		let adventurer2 = new Adventurer("Quill", 3)

		expect(adventurer2.name).to.equal("Quill")
		expect(adventurer2.level).to.equal(3)
	});

	it("should have gold", function () {
		let adventurer = new Adventurer("Parthanax")

		expect(adventurer.name).to.equal("Parthanax", 1)
		expect(adventurer.gold).to.equal(0)

		let adventurer2 = new Adventurer("Quill", 3, 115)

		expect(adventurer2.name).to.equal("Quill")
		expect(adventurer2.gold).to.equal(115)
	});

});

  describe("Heros", function () {
	it("should be a child class of Adventurer", function () {
		
	});

	it("should have a level", function () {
		
	});

	it("should not allow levels below 10", function () {
		
	});

});

describe("MagicShop", function () {
	it("should have an array of the items in the shop", function () {
		
	});

	it("can add items to the shop", function () {
		
	});

	context("selling items", function () {
		it("can sell items and remove them from the shop's array of items", function () {
		
		});
	
		it("subtracts gold from the buyer when they purchase an item", function () {
			
		});
	
		it("wont sell something if the buyer doesn't have enough gold", function () {
			
		});
	})

});

describe("Item", function () {
	it("has a name", function () {
		
	});

	it("has a gold price", function () {
		
	});

	it("can set a Hero Only tag to only allow hero's to buy it", function () {
		
	});

});