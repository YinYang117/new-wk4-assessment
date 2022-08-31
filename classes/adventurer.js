class Adventurer{
	constructor(name, level = 1){
		this.name = name;
		this.level = level;
		this.gold = 0;
		this.items = [];
	};

	addGold(num) {
		this.gold += num;
	};

	subtractGold(num) {
		if (this.gold < num) throw Error("Not enough gold to subtract.")
		this.gold -= num;
	};
}

module.exports = {Adventurer}
