import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoriesStore from './CategoriesStore';

configure({ adapter: new Adapter() });

describe('CategoriesStore', () => {
	let store;

	beforeEach(() => {
		store = new CategoriesStore();
	});

	it('Should create a new category with addCategory action', () => {
		const object = { name: 'Food', description: 'Test' };
		store.addCategory(object);
		expect(store.categories.length).toBe(1);
		const [ first ] = store.categories;
		expect(first.name).toBe(object.name);
		expect(first.description).toBe(object.description);
	});

	it('Should delete a specific category with deleteCategory action', () => {
		const object = { name: 'Food', description: 'Test' };
		store.addCategory(object);
		expect(store.categories.length).toBe(1);
		const [ first ] = store.categories;
		store.deleteCategory([ first.id ]);
		expect(store.categories.length).toBe(0);
	});

	it('Should update name to a specific category with updateCategory action', () => {
		const object = { name: 'Food', description: 'Test' };
		const objectUpdated = { name: 'New food', description: 'Test' };
		store.addCategory(object);
		const [ first ] = store.categories;
		store.updateCategory({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.categories;
		expect(firstUpdated.name).toBe(objectUpdated.name);
	});

	it('Should update description to a specific category with updateCategory action', () => {
		const object = { name: 'Food', description: 'Test' };
		const objectUpdated = { name: 'Food', description: 'New test' };
		store.addCategory(object);
		const [ first ] = store.categories;
		store.updateCategory({ [first.id]: objectUpdated });
		const [ firstUpdated ] = store.categories;
		expect(firstUpdated.description).toBe(objectUpdated.description);
	});

	it('Should get category name by id param with getNameByCategoryId computed', () => {
		const object = { name: 'Food', description: 'Test' };
		store.addCategory(object);
		const [ first ] = store.categories;
		const name = store.getNameByCategoryId(first.id);
		expect(name).toBe(object.name);
	});
});
