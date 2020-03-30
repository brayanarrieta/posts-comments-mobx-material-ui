import { observable, action, computed } from 'mobx';
import defaultData from '../constants';

class ProductsStore {
  @observable products = defaultData.products;

  @action
  addProduct = (product) => {
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 0;
    this.products.push({ ...product, id });
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

const singleton = new ProductsStore();

export default singleton;
