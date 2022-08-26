const Customer = require("./customer.js");

class PremiumCustomer extends Customer {

  constructor(name) {
    super(name);
    this.money = 5;
  }

}

module.exports = PremiumCustomer;