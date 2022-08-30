const Adventurer = require("./adventurer");

class Hero extends Adventurer{
	constructor(name, level = 1){
		super(name, level)
	}
}

module.exports = {
	Hero
}