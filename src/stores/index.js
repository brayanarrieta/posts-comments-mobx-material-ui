import CategoriesStore from './CategoriesStore';
import ProductsStore from './ProductsStore';


const singletonCategoriesStore = new CategoriesStore();
const singletonProductsStore = new ProductsStore();

const stores = {
  categories: singletonCategoriesStore,
  products: singletonProductsStore,
};

export default stores;
