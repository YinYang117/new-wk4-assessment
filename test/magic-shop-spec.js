const { expect } = require("chai");

const {Adventurer} = require("../classes/adventurer.js");
const {Hero} = require("../classes/hero.js");
const {MagicShop} = require("../classes/magicshop.js");
const {Item} = require("../classes/item.js"); 


describe("Adventurer", function () {
	it("should have a name, a default level, gold, and items property.", function () {
		let adventurer = new Adventurer("Parthanax");

		expect(adventurer).to.have.property("name");
		expect(adventurer).to.have.property("level");
		expect(adventurer).to.have.property("gold");
		expect(adventurer).to.have.property("items"); 

		expect(adventurer.name).to.equal("Parthanax");
		expect(adventurer.level).to.equal(1);
		expect(adventurer.gold).to.equal(0);
		expect(adventurer.items).to.eql([]);
		
		let adventurer2 = new Adventurer("Quill", 30);
		
		expect(adventurer2.name).to.equal("Quill");
		expect(adventurer2.level).to.equal(30);
		expect(adventurer2.gold).to.equal(0);
		expect(adventurer2.items).to.eql([]);
	});

	it("should have methods to add and subtract gold", function () {
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

	it("should throw an error with a message if subtracting gold would result in a negative number", function () {
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

	it("should change default to level 10, and add 250 gold when created", function () {
		let hero = new Hero("Leroy Jenkins");

		expect(hero.name).to.equal("Leroy Jenkins");
		expect(hero.level).to.equal(10);
		expect(hero.gold).to.equal(250);

		hero.addGold(100);
		expect(hero.gold).to.equal(350);

		expect(() => hero.subtractGold(500)).to.throw(Error);

		let hero2 = new Hero("Mr MinMaxer", 99);
		expect(hero2.level).to.equal(99);
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

});

describe("MagicShop", function () {
	it("should have an array of items", function () {
		shop = new MagicShop();

		expect(shop.items).to.eql([]);
	});

	it("can add items to the shop", function () {
		shop = new MagicShop();
		let sword = new Item("Excalibur", 900);

		shop.addItem(sword);
		
		expect(shop.items.length).to.equal(1);
		expect(shop.items).to.include(sword);
		expect(shop.items[0].name).to.equal("Excalibur");
		expect(shop.items[0].price).to.equal(900);
	});

	it("has a greeting that lists their items and prices", function () {
		shop = new MagicShop();

		let sword = new Item("Excalibur", 900);
		shop.addItem(sword);
		expect(shop.items[0]).to.eql(sword);

		let shopGreeting1 = "Welcome! We have many items for sale. Excalibur for 900 gold.";
		expect(shop.greeting()).to.equal(shopGreeting1);

		let shield = new Item("Triforce Shield", 1200);
		shop.addItem(shield);

		let shopGreeting2 = "Welcome! We have many items for sale. Excalibur for 900 gold. Triforce Shield for 1200 gold.";
		expect(shop.greeting()).to.equal(shopGreeting2);

		let bow = new Item("WindGale Bow", 400);
		shop.addItem(bow);

		let shopGreeting3 = "Welcome! We have many items for sale. Excalibur for 900 gold. Triforce Shield for 1200 gold. WindGale Bow for 400 gold.";
		expect(shop.greeting()).to.equal(shopGreeting3);
	})

	context("selling items from the shop", function () {
		it("has a static method that sell items from a shop", function () {
			shop = new MagicShop();
			let glove = new Item("Infinity Glove", 400);
			let filler = new Item("Fluff", 0)
			let stuff = new Item("Stuff", 150)
			shop.addItem(filler);
			shop.addItem(glove);
			shop.addItem(stuff);

			let adventurer = new Adventurer("Thanos");
			adventurer.addGold(500);

			MagicShop.sellItem(shop, adventurer, glove);

			expect(adventurer.items.length).to.equal(1);
			expect(adventurer.items).to.include(glove);
			expect(shop.items).to.include(filler, stuff);
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
	
		it("wont sell, and throws an error, if the buyer doesn't have enough gold", function () {
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
			let tapeplayer = new Item("Old-Fashioned Tape Player", 300);
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