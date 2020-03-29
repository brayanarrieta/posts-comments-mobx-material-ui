import { observable, action } from 'mobx';

class CategoriesStore {
  @observable categories = [];

  @action
  addCategory = (category) => {
    this.categories.push(category);
  };

  @action
  deleteCategory = (category) => {
    this.categories.splice(this.categories.indexOf(category), 1);
  };

  @action
  updateCategory = (newData, oldData) => {
    if (oldData) {
      this.categories[this.categories.indexOf(oldData)] = newData;
    }
  }
}

const singleton = new CategoriesStore();

export default singleton;
