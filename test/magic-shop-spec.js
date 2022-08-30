const { expect } = require("chai");

const Adventurer = require("../classes/adventurer.js");
const Hero = require("../classes/hero.js");
const MagicShop = require("../classes/magicshop.js");
const Item = require("../classes/item.js"); 


describe("Adventurer", function () {
	it("should have a name and a level that defaults to 1.", function () {
		let adventurer = new Adventurer("Parthanax");

		expect(adventurer).to.have.property("name");
		expect(adventurer).to.have.property("level");
		expect(adventurer.name).to.equal("Parthanax");
		expect(adventurer.level).to.equal(1);
		
		let adventurer2 = new Adventurer("Quill", 3);
		
		expect(adventurer2.name).to.equal("Quill");
		expect(adventurer2.level).to.equal(3);
	});

	it("should have a gold property that starts at 0 and an empty items array", function () {
		let adventurer = new Adventurer("Parthanax");

		expect(adventurer).to.have.property("gold");
		expect(adventurer).to.have.property("items"); 
		expect(adventurer.gold).to.equal(0);
		expect(adventurer.items).to.equal([]);

		let adventurer2 = new Adventurer("Quill", 3);
		expect(adventurer2.gold).to.equal(0);
		expect(adventurer2.items).to.equal([]);
	});

	it("should have a methods to add and or subtract gold", function () {
		let robin = new Adventurer("Robin Hood");

		expect(robin.gold).to.equal(0);
		robin.addGold(100);
		expect(robin.gold).to.equal(100);
		robin.addGold(50);
		expect(robin.gold).to.equal(150);
		robin.subtractGold(25);
		expect(robin.gold).to.equal(125);
		robin.subtractGold(125);
		expect(robin.gold).to.equal(0);
	});

	it("should throw an error if subtracting gold would result in a negative number", function () {
		let robin = new Adventurer("Robin Hood");
		robin.addGold(10);

		expect(() => robin.subtractGold(200)).to.throw(Error);
		try {
			robin.subtractGold(200)
		} catch (error) {
			expect(error.message).to.equal("Not enough gold to subtract.")
		}

		expect(robin.gold).to.equal(10);
	})

});

describe("Heros", function () {
	it("should be a child class of Adventurer", function () {
		let hero = new Hero("Leroy Jenkins");

		expect(hero instanceof Hero).to.be.true;
		expect(hero instanceof Adventurer).to.be.true;
	});

	it("should add 10 levels and 250 gold when created", function () {
		//Maybe make levels change to 10 default instead of adding
		let hero = new Hero("Leroy Jenkins", 2);

		expect(hero.name).to.equal("Leroy Jenkins");
		expect(hero.level).to.equal(12);
		expect(hero.gold).to.equal(250);

		hero.addGold(100);
		expect(hero.gold).to.equal(350);
		hero.subtractGold(500);
		expect(() => hero.subtractGold(500)).to.throw(Error);
	});

});

describe("Item", function () {
	it("has name and price properties", function () {
		let shield = new Item("Hylian Shield", 300)

		expect(shield).to.have.property("name")
		expect(shield).to.have.property("price")
		expect(shield.name).to.equal("Hylian Shield")
		expect(shield.price).to.equal(300)
	});

	it("has a boolean property that toggles true / false with a function", function () {
		let sword = new Item("Excalibur", 500)

		expect(sword).to.have.property("onlySellToHeros");
		expect(sword.onlySellToHeros).to.equal(false);

		sword.toggleSellToHeros();

		expect(sword.onlySellToHeros).to.equal(true);
		
		sword.toggleSellToHeros();

		expect(sword.onlySellToHeros).to.equal(false);
	});

});

describe("MagicShop", function () {
	it("should have an array of items", function () {
		shop = new MagicShop();

		expect(shop.items).to.equal([]);
	});

	it("can add items to the shop", function () {
		shop = new MagicShop();
		let sword = new Item("Excalibur", 900);

		expect(shop.items).to.equal([]);
		
		shop.addItem(sword);
		
		expect(shop.items.length).to.equal(1);
		expect(shop.items[0].name).to.equal("Excalibur");
		expect(shop.items[0].price).to.equal(900)
	});

	it("has a greeting that lists their items and prices", function () {
		shop = new MagicShop();

		let sword = new Item("Excalibur", 900);
		shop.addItem(sword);
		expect(shop.items[0]).to.eql(sword);

		let shopGreeting1 = "Welcome! We have Excalibur for 900 gold.";
		expect(shop.greeting()).to.equal(shopGreeting1);

		let shield = new Item("Triforce Shield", 1200);
		shop.addItem(shield);

		let shopGreeting2 = "Welcome! We have Excalibur for 900 gold, and Triforce Shield for 1200 gold.";
		expect(shop.greeting()).to.equal(shopGreeting2);

		let bow = new Item("WindGale Bow", 400);
		shop.addItem(bow);

		let shopGreeting3 = "Welcome! We have Excalibur for 900 gold, Triforce Shield for 1200 gold, and WindGale Bow for 400 gold.";
		expect(shop.greeting()).to.equal(shopGreeting3);
	})

	context("selling items from the shop", function () {
		it("has a static method that sell items from a shop", function () {
			shop = new MagicShop();
			let glove = new Item("Infinity Glove", 400);
			shop.addItem(glove);
			let adventurer = new Adventurer("Thanos");
			adventurer.addGold(500);
			expect(adventurer.items.length).to.equal(0);
			expect(shop.items.length).to.equal(1)

			MagicShop.sellItem(shop, adventurer, glove);

			expect(adventurer.items.length).to.equal(1);
			expect(adventurer.items).to.include(glove);
			expect(shop.items).to.equal([]);
		});
	
		it("subtracts gold from the buyer when they purchase an item", function () {
			shop = new MagicShop();
			let glove = new Item("Infinity Glove", 400);
			shop.addItem(glove);
			let hero = new Adventurer("Man of Iron");
			hero.addGold(500);

			MagicShop.sellItem(shop, hero, glove);

			expect(hero.gold).to.equal(100);
		});
	
		it("wont sell something if the buyer doesn't have enough gold", function () {
			let adventurer = new Adventurer("Link")
			adventurer.addGold(400);
			
			shop = new MagicShop();
			let boomerang = new Item("Boomerang", 500);
			shop.addItem(boomerang);
			
			expect(() => MagicShop.sellItem(shop, adventurer, boomerang)).to.throw(Error);
			try {
				MagicShop.sellItem(shop, adventurer, boomerang)
			} catch (error) {
				expect(error.message).to.equal("Can not sell Boomerang, Link does not have enough gold.")
			}
			
			let hero = new Hero("Starlord")
			hero.addGold(100);
			let tapeplayer = new Item("Old-Fashioned Tape Player", 150);
			shop.addItem(tapeplayer);

			expect(() => MagicShop.sellItem(shop, hero, tapeplayer)).to.throw(Error);
			try {
				MagicShop.sellItem(shop, hero, tapeplayer)
			} catch (error) {
				expect(error.message).to.equal("Can not sell Old-Fashioned Tape Player, Starlord does not have enough gold.")
			}
		});
	})

});

// Idea:
// Change hero and adv to be the same.
// Have normal items and magic items. magic inherits from normal
// Can also change magic shop to be a treasure chest.
// I'll look into this after I finish it as is for now.