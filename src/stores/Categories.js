import { observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';
import defaultData from '../constants';

class CategoriesStore {
  @observable categories = defaultData.categories;

  @action
  addCategory = (added) => {
    const id = this.categories.length > 0 ? this.categories[this.categories.length - 1].id + 1 : 1;
    this.categories = [...this.categories, { ...added, id }];
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
    const row = this.categories.find((category) => category.id === id);
    return row.name;
  })
}

const singleton = new CategoriesStore();

export default singleton;
