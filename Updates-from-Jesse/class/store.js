const PremiumCustomer = require("./premium-customer.js");


class Store {

  constructor() {
    this.items = [];
  }

  addItem(item) {
    if (item.isValid()) {
      this.items.push(item);
    } else {
      throw new Error("Item is not valid");
    }
  }

  getStoreItemPrices() {
    const prices = [];

    for (let i = 0 ; i < this.items.length ; i++) {
      let item = this.items[i];
      prices.push(`${item.name}: $${item.price}`);
    }

    return prices;
  }

  doTransaction(customer, itemName) {

    let discount = 0;
    if (customer instanceof PremiumCustomer) discount = 1;

    for (let i = 0 ; i < this.items.length ; i++) {
      let item = this.items[i];
      if (item.name === itemName) {
        if (customer.money < item.price - discount) {
          throw new Error("Insufficient funds")
        } else {
          customer.money -= item.price - discount;
          customer.purchases.push(item.name);
          return;
        }
      }
    }

    throw new Error("Item not found");
  }

}

module.exports = Store;