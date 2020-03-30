import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

class CategoriesStore {
  @observable categories = [];

  generateId=() => {
    const id = this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1 : 1;
    return id;
  }

  @action
  addCategory = (added) => {
    this.categories = [...this.categories, { ...added, id: this.generateId() }];
  };

  @action
  deleteCategory = (deleted) => {
    const deletedSet = new Set(deleted);
    this.categories = this.categories.filter((row) => !deletedSet.has(row.id));
  };

  @action
  updateCategory = (changed) => {
    this.categories = this.categories.map(
      (row) => (changed[row.id] ? { ...row, ...changed[row.id] } : row),
    );
  }

  getNameByCategoryId = computedFn((id) => {
    const { name = '' } = this.categories.find((category) => category.id === id) || {};
    return name;
  })
}

export default CategoriesStore;
