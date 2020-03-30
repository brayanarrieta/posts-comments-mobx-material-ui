import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoriesStore from './CategoriesStore';

configure({ adapter: new Adapter() });

describe('CategoriesStore', () => {
	let store;

	beforeEach(() => {
		store = new CategoriesStore();
	});

	describe('addCategory action', () => {});

	describe('addCategory action', () => {
		it('Should create a new category', () => {
			const object = { name: 'Food', description: 'Test' };
			store.addCategory(object);
			expect(store.categories.length).toBe(1);
			const [ first ] = store.categories;
			expect(first.name).toBe(object.name);
			expect(first.description).toBe(object.description);
		});
	});

	describe('deleteCategory action', () => {
		it('Should delete a specific category', () => {
			const object = { name: 'Food', description: 'Test' };
			store.addCategory(object);
			expect(store.categories.length).toBe(1);
			const [ first ] = store.categories;
			store.deleteCategory([ first.id ]);
			expect(store.categories.length).toBe(0);
		});
	});

	describe('updateCategory action', () => {
		it('Should update category when just update the category name', () => {
			const object = { name: 'Food', description: 'Test' };
			const objectUpdated = { name: 'New food', description: 'Test' };
			store.addCategory(object);
			const [ first ] = store.categories;
			store.updateCategory({ [first.id]: objectUpdated });
			const [ firstUpdated ] = store.categories;
			expect(firstUpdated.name).toBe(objectUpdated.name);
		});

		it('Should update category when just update the description name', () => {
			const object = { name: 'Food', description: 'Test' };
			const objectUpdated = { name: 'Food', description: 'New test' };
			store.addCategory(object);
			const [ first ] = store.categories;
			store.updateCategory({ [first.id]: objectUpdated });
			const [ firstUpdated ] = store.categories;
			expect(firstUpdated.description).toBe(objectUpdated.description);
		});
	});

	describe('getNameByCategoryId computed', () => {
		it('Should get category name by id param', () => {
			const object = { name: 'Food', description: 'Test' };
			store.addCategory(object);
			const [ first ] = store.categories;
			const name = store.getNameByCategoryId(first.id);
			expect(name).toBe(object.name);
		});
	});
});
