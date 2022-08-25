const { expect } = require("chai");

const Adventurer = require("../classes/adventurer.js");
const Hero = require("../classes/hero.js");
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

	it("should have gold that defaults to 0", function () {
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
		let hero = new Hero("Leroy Jenkins", 2, 1000);

		expect(hero instanceof Hero).to.be.true;
		expect(hero instanceof Adventurer).to.be.true;
	});

	it("should add 10 levels when created", function () {
		let hero = new Hero("Leroy Jenkins", 2);

		expect(hero.name).to.equal("Leroy Jenkins");
		expect(hero.level).to.equal(12);
	});

	it("should have an extra 250 gold when created", function () {
		let hero = new Hero("Leroy Jenkins", 2);

		expect(hero.name).to.equal("Leroy Jenkins");
		expect(hero.level).to.equal(12);
		expect(hero.gold).to.equal(250);

		let arthur = new Hero("King Arthur", 15, 500);

		expect(arthur.name).to.equal("King Arthur");
		expect(arthur.level).to.equal(25);
		expect(arthur.gold).to.equal(750);
	});

});

describe("Item", function () {
	it("has a name", function () {
		let shield = new Item("Hylian Shield")

		expect(shield.name).to.equal("Hylian Shield")
	});

	it("has a gold price", function () {
		let sword = new Item("Excalibur", 900)

		expect(sword.name).to.equal("Excalibur");
		expect(sword.price).to.equal(900);
	});

	it("can set a boolean called sellToHeros and sellToAdventures with a function", function () {
		let sword = new Item("Excalibur", 900)

		expect(sword.name).to.equal("Excalibur");
		expect(sword.price).to.equal(900);
		expect(sword.sellToHeros).to.equal(true);
		expect(sword.sellToAdventures).to.equal(true);

		sword.toggleAdventures();
		expect(sword.sellToAdventures).to.equal(false);

		sword.toggleHeros();
		expect(sword.sellToHeros).to.equal(false);

		sword.toggleAdventures();
		expect(sword.sellToAdventures).to.equal(true);

		sword.toggleHeros();
		expect(sword.sellToHeros).to.equal(true);
	});

});

describe("MagicShop", function () {
	it("should have an array of the items in the shop", function () {
		shop = new MagicShop();

		expect(shop.items).to.equal([]);
	});

	it("can add items to the shop", function () {
		shop = new MagicShop();
		let sword = new Item("Excalibur", 900);

		expect(shop.items).to.equal([]);
		shop.addItem(sword);
		
	});

	it("can say hello to customers and list their items by name", function () {
		shop = new MagicShop();

		let sword = new Item("Excalibur", 900);
		shop.addItem(sword);
		
		let shopGreeting1 = "Welcome! We have some items for sale. Excalibur for 900 gold."
		expect(shop.greeting()).to.equal(shopGreeting1);

		let shield = new Item("Triforce Shield", 1200);
		shop.addItem(shield);

		let shopGreeting2 = "Welcome! We have some items for sale. Excalibur for 900 gold and Triforce Shield for 1200 gold."
		expect(shop.greeting()).to.equal(shopGreeting2);

		let bow = new Item("WindGale Bow", 400);
		shop.addItem(bow);

		let shopGreeting3 = "Welcome! We have some items for sale. Excalibur for 900 gold, Triforce Shield for 1200 gold, and WindGale Bow for 400 gold."
		expect(shop.greeting()).to.equal(shopGreeting3);

	})

	context("selling items", function () {
		it("can sell items and remove them from the shop's array of items", function () {
		
		});
	
		it("subtracts gold from the buyer when they purchase an item", function () {
			
		});
	
		it("wont sell something if the buyer doesn't have enough gold", function () {
			
		});
	})

});