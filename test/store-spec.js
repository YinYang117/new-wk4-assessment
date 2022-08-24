const { expect } = require("chai");

const Customer = require("../class/customer.js");
const PremiumCustomer = require("../class/premium-customer.js");
const Store = require("../class/store.js");
const StoreItem = require("../class/store-item.js");

describe("Customer", function () {
  it("should set username on creation", function () {
    let customer = new Customer("LeBron James");

    expect(customer.name).to.equal("LeBron James");
  });

  it("should have money and purchases attributes", function () {
    let customer = new Customer("LeBron James");

    expect(customer.money).to.equal(0);
    expect(customer.purchases).to.deep.equal([]);
  });

  it("should allow customers to add and withdraw funds", function () {
    let customer = new Customer("LeBron James");

    customer.addFunds(10);
    expect(customer.money).to.equal(10);

    customer.withdrawFunds(3);
    expect(customer.money).to.equal(7);
  });

  it("should not allow customers to withdraw more funds than they own", function () {
    let customer = new Customer("LeBron James");

    expect(customer.money).to.equal(0);
    expect(customer.withdrawFunds.bind(customer, 5)).to.throw(Error);
  });
});

describe("Store Item class", function () {
  it("should set item name and price on creation", function () {
    let storeItem = new StoreItem("Chair", 10);

    expect(storeItem.name).to.equal("Chair");
    expect(storeItem.price).to.equal(10);
  });

  it("should not be valid unless the name and price have been set", function () {
    let storeItemValid = new StoreItem("Chair", 10);
    let storeItemBlank = new StoreItem();
    let storeItemInvalidPrice = new StoreItem("Bad Chair", -1);

    expect(storeItemValid.isValid()).to.be.true;
    expect(storeItemBlank.isValid()).to.be.false;
    expect(storeItemInvalidPrice.isValid()).to.be.false;
  });
});

describe("Store class", function () {
  it("should allow valid store items to be added", function () {
    let store = new Store();
    let storeItem = new StoreItem("Chair", 10);

    expect(store.items.length).to.equal(0);
    store.addItem(storeItem);
    expect(store.items.length).to.equal(1);
  });

  it("should not allow invalid store items to be added", function () {
    let store = new Store();
    let storeItemInvalid = new StoreItem("Bad Chair", -10);

    expect(store.addItem.bind(store, storeItemInvalid)).to.throw(Error);
    expect(store.items.length).to.equal(0);
  });

  it("should return a list of store items and prices in the order they were added", function () {
    let store = new Store();
    let storeItemMug = new StoreItem("Mug", 3);
    let storeItemChair = new StoreItem("Chair", 10);
    let storeItemTable = new StoreItem("Table", 20);

    let expectedReturn = ["Mug: $3", "Chair: $10", "Table: $20"];

    store.addItem(storeItemMug);
    store.addItem(storeItemChair);
    store.addItem(storeItemTable);

    expect(store.getStoreItemPrices()).to.deep.equal(expectedReturn);
  });
});

describe("Premium Customer", function () {
  it("should start with $5 on creation", function () {
    let premiumCustomer = new PremiumCustomer("Kobe Bryant");

    expect(premiumCustomer.name).to.equal("Kobe Bryant");
    expect(premiumCustomer.money).to.equal(5);
  });

  it("should inherit from the base customer class", function () {
    let premiumCustomer = new PremiumCustomer("Kobe Bryant");

    expect(premiumCustomer instanceof Customer).to.be.true;
    expect(premiumCustomer instanceof PremiumCustomer).to.be.true;
  });
});

describe("Store purchase end-to-end test", function () {
  it("allows a customer to purchase items with sufficient funds", function () {
    let store = new Store();
    let customer = new Customer("Larry Bird");
    let storeItemMug = new StoreItem("Mug", 3);
    let storeItemChair = new StoreItem("Chair", 10);
    let storeItemTable = new StoreItem("Table", 20);

    store.addItem(storeItemMug);
    store.addItem(storeItemChair);
    store.addItem(storeItemTable);

    customer.addFunds(25);

    store.doTransaction(customer, "Chair");

    expect(customer.money).to.equal(15);
    expect(customer.purchases).to.deep.equal(["Chair"]);

    store.doTransaction(customer, "Mug");

    expect(customer.money).to.equal(12);
    expect(customer.purchases).to.deep.equal(["Chair", "Mug"]);

    expect(() => store.doTransaction.call(store, customer, "Table")).to.throw(
      Error
    );

    expect(customer.money).to.equal(12);
    expect(customer.purchases).to.deep.equal(["Chair", "Mug"]);

    expect(() =>
      store.doTransaction.call(store, customer, "Television")
    ).to.throw(Error);
    expect(customer.purchases).to.deep.equal(["Chair", "Mug"]);
  });

  it("gives premium customers a $1 discount on all purchases", function () {
    let store = new Store();
    let premiumCustomer = new PremiumCustomer("Michael Jordan");
    let storeItemMug = new StoreItem("Mug", 3);
    let storeItemChair = new StoreItem("Chair", 10);
    let storeItemTable = new StoreItem("Table", 20);

    store.addItem(storeItemMug);
    store.addItem(storeItemChair);
    store.addItem(storeItemTable);

    premiumCustomer.addFunds(25);

    store.doTransaction(premiumCustomer, "Chair");

    expect(premiumCustomer.money).to.equal(21);
    expect(premiumCustomer.purchases).to.deep.equal(["Chair"]);

    store.doTransaction(premiumCustomer, "Mug");

    expect(premiumCustomer.money).to.equal(19);
    expect(premiumCustomer.purchases).to.deep.equal(["Chair", "Mug"]);

    store.doTransaction(premiumCustomer, "Table");

    expect(premiumCustomer.money).to.equal(0);
    expect(premiumCustomer.purchases).to.deep.equal(["Chair", "Mug", "Table"]);
  });
});
