const { Adventurer } = require("./adventurer");

class Hero extends Adventurer{
	constructor(name, level = 10){
		super(name, level)
		this.gold = 250;
		this.items = [];
	}
}

module.exports = {
	Hero
}