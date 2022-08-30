const { Adventurer } = require("./adventurer");

class Hero extends Adventurer{
	constructor(name, level){
		super(name, level)
	}
}

module.exports = {
	Hero
}