module.exports = class Product {
    constructor(_id,name,codsku,category,stock) {
        this._id=_id;
        this.name=name;
        this.codsku=codsku;
        this.category=category;
        this.stock=stock;
    }
 }