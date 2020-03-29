import { observable, action } from 'mobx';

class CategoriesStore {
  @observable categories = [];

  @action
  addCategory = (added) => {
    const id = this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1 : 0;
    this.categories.push({ id, ...added });
  };

  @action
  deleteCategory = (deleted) => {
    const deletedSet = new Set(deleted);
    this.categories = this.categories.filter((row) => !deletedSet.has(row.id));
  };

  @action
  updateCategory = (changed) => {
    this.categories.map((row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
  }
}

const singleton = new CategoriesStore();

export default singleton;
