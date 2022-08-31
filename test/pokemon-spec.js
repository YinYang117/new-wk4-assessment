const { expect } = require("chai");

const Pokemon = require("../classes/pokemon.js");
const Trainer = require("../classes/trainer.js");


describe("Pokemon", function () {
	it("has a name, level, hp, and attack property", function() {
		const ditto = new Pokemon("Ditto", 10, 180, 25);
		expect(ditto).to.have.property("name");
		expect(ditto).to.have.property("level");
		expect(ditto).to.have.property("hp");
		expect(ditto).to.have.property("attack");
		expect(ditto.name).to.equal("Ditto");
		expect(ditto.level).to.equal(10);
		expect(ditto.hp).to.equal(180);
		expect(ditto.attack).to.equal(25);
	});
});

describe("Trainer", function () {
	it("has a name, age, and array of pokemon", function() {
		const ash = new Trainer("Ash Ketchup", 10);
		expect(ash.name).to.equal("Ash Ketchup");
		expect(ash.age).to.equal(10);
		expect(ash.pokemon).to.eql([]);
	});
})