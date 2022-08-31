const { expect } = require("chai");

const Pokemon = require("../classes/pokemon.js");
const Trainer = require("../classes/trainer.js");

beforeEach(() => {
	const pickachu = new Pokemon("Pickachu", 10, 180, 25);
	const ash = new Trainer("Ash Ketchum", 10);
})
describe("Pokemon", function () {
	it("has a name, level, hp, and attack property", function() {
		const pickachu = new Pokemon("Pickachu", 10, 180, 25);
		expect(pickachu).to.have.property("name");
		expect(pickachu).to.have.property("level");
		expect(pickachu).to.have.property("hp");
		expect(pickachu).to.have.property("attack");
		expect(pickachu.name).to.equal("Pickachu");
		expect(pickachu.level).to.equal(10);
		expect(pickachu.hp).to.equal(180);
		expect(pickachu.attack).to.equal(25);
	});
});

describe("Trainer", function () {
	it("has a name, age, and array of pokemon", function() {
		const ash = new Trainer("Ash Ketchum", 10);
		expect(ash.name).to.equal("Ash Ketchum");
		expect(ash.age).to.equal(10);
		expect(ash.pokemon).to.eql([]);
	});
})