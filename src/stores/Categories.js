import { observable, action } from 'mobx';

class CategoriesStore {
  @observable categories = [];

  @action
  add = (category) => {
    this.categories.push(category);
  };

  @action
  delete = (category) => {
    this.categories.splice(this.categories.indexOf(category), 1);
  };

  @action
  update = (newData, oldData) => {
    if (oldData) {
      this.categories[this.categories.indexOf(oldData)] = newData;
    }
  }
}

const singleton = new CategoriesStore();

export default singleton;
