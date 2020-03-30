import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductsStore from './ProductsStore';

configure({ adapter: new Adapter() });

describe('ProductsStore', () => {
	let store;

	beforeEach(() => {
		store = new ProductsStore();
	});

	it('Should create a new product with addProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		store.addProduct(object);
		expect(store.products.length).toBe(1);
		const [ first ] = store.products;
		expect(first.name).toBe(object.name);
		expect(first.description).toBe(object.description);
		expect(first.price).toBe(object.price);
		expect(first.stock).toBe(object.stock);
		expect(first.categoryId).toBe(object.categoryId);
	});

	it('Should delete a specific product with deleteProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		store.addProduct(object);
		expect(store.products.length).toBe(1);
		const [ first ] = store.products;
		store.deleteProduct([ first.id ]);
		expect(store.products.length).toBe(0);
	});

	it('Should update name to a specific product with updateProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		const objectUpdated = { name: 'Beans', description: 'test', price: 0, stock: 0, categoryId: 1 };
		store.addProduct(object);
		const [ first ] = store.products;
		store.updateProduct({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.products;
		expect(firstUpdated.name).toBe(objectUpdated.name);
	});

	it('Should update description to a specific product with updateProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		const objectUpdated = { name: 'Rice', description: 'new test', price: 0, stock: 0, categoryId: 1 };
		store.addProduct(object);
		const [ first ] = store.products;
		store.updateProduct({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.products;
		expect(firstUpdated.description).toBe(objectUpdated.description);
	});

	it('Should update price to a specific product with updateProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		const objectUpdated = { name: 'Rice', description: 'test', price: 5432, stock: 0, categoryId: 1 };
		store.addProduct(object);
		const [ first ] = store.products;
		store.updateProduct({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.products;
		expect(firstUpdated.price).toBe(objectUpdated.price);
	});

	it('Should update stock to a specific product with updateProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		const objectUpdated = { name: 'Rice', description: 'test', price: 0, stock: 7896, categoryId: 1 };
		store.addProduct(object);
		const [ first ] = store.products;
		store.updateProduct({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.products;
		expect(firstUpdated.stock).toBe(objectUpdated.stock);
	});

	it('Should update categoryId to a specific product with updateProduct action', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		const objectUpdated = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 2 };
		store.addProduct(object);
		const [ first ] = store.products;
		store.updateProduct({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.products;
		expect(firstUpdated.categoryId).toBe(objectUpdated.categoryId);
	});

	it('Should get products count with productsCount computed', () => {
		const object = { name: 'Rice', description: 'test', price: 0, stock: 0, categoryId: 1 };
		store.addProduct(object);
		const count = store.productsCount;
		expect(count).toBe(1);
	});
});
