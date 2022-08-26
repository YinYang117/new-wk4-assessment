class Customer {

  constructor(name) {
    this.name = name;
    this.money = 0;
    this.purchases = [];
  }

  addFunds(amount) {
    this.money += amount;
  }

  withdrawFunds(amount) {
    if (this.money < amount) {
        throw new Error("Insufficient funds");
    }
    this.money -= amount;
  }

}

module.exports = Customer;
