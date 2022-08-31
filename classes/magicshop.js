class MagicShop{
	constructor(){
		this.items = [];
	}

	static sellItem(shop, person, item){
		if (person.gold < item.price) throw Error(`Can not sell ${item.name}, ${person.name} does not have enough gold.`)
		
		for (let i = 0; i < shop.items.length; i++){
			if (shop.items[i].name === item.name) {
				shop.items.splice(i, 1);
			}
		}

		person.items.push(item)
		person.gold -= item.price
	}

	addItem(item){
		this.items.push(item)
	}

	greeting(){
		let returnStr = "Welcome! We have many items for sale."

		this.items.forEach(item => {
			returnStr += ` ${item.name} for ${item.price} gold.`
		})

		return returnStr
	}
}

module.exports = { MagicShop }