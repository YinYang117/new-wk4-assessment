class StoreItem {

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  isValid() {
    return (typeof this.name === 'string') && this.price > 0;
  }
}

module.exports = StoreItem;