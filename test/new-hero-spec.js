const { expect } = require("chai");

const Person = require("../baseclass")
const Hero = require("../classes/hero.js");
const Villan = require("../classes/magicshop.js");
const Item = require("../classes/item.js");

describe("Base Class"), function() {
	it("has a name and a default health properties", function() {
		let person1 = Person("John Doe", 125);

		expect(person1).to.have.property("name");
		expect(person1).to.have.property("health");
		expect(person1.name).to.equal("John Doe");
		expect(person1.health).to.equal(125);

		let person2 = Person("Jane Doe");
		expect(person2.name).to.equal("Jane Doe")
		expect(person2.health).to.equal(100)
	})

	it("should have a static introduction function", function() {
		let person1 = Person("Mrs Weatherspoon");
		let greeting = "Hello! I'm Mrs Weatherspoon";
		expect(Person.introduction(person1)).to.equal(greeting);

		let person2 = Person("Mr Rogers");
		let greeting2 = "Hello! I'm Mr Rogers";
		expect(Person.introduction(person2)).to.equal(greeting2);
	})
}
describe("Hero"), function() {
	it("should inherit from Person", function() {
		const hero = Hero("King Arthur", 150)

		expect(hero).to.be.instanceOf(Person);
		expect(hero).to.be.instanceOf(Hero);
		expect(hero.name).to.equal("King Arthur");
		expect(hero.health).to.equal(150);

		const hero2 = Hero("Lancelot");
		expaect(hero2.health).to.equal(100);
	})
}
describe("Villan"), function() {
	it("should also inherit from Person", function() {
		const villan = Villan("Megamind");

		expect(villan).to.be.instanceOf(Person);
		expect(villan).to.be.instanceOf()
	})
}
describe("Item"), function() {
	it("", function() {
		
	})
}