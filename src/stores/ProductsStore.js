import { observable, action, computed } from 'mobx';

class ProductsStore {
  @observable products = [];

  generateId=() => {
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    return id;
  }

  @action
  addProduct = (product) => {
    this.products.push({ ...product, id: this.generateId() });
  };

  @action
  deleteProduct = (deleted) => {
    const deletedSet = new Set(deleted);
    this.products = this.products.filter((row) => !deletedSet.has(row.id));
  };

  @action
  updateProduct = (changed) => {
    this.products = this.products.map(
      (row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row),
    );
  }

  @computed
  get productsCount() {
    return this.products.length;
  }
}

export default ProductsStore;
