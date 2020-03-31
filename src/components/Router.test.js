import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Router from './Router';
import ProductsTable from './ProductsTable';
import ProductsStore from '../stores/ProductsStore';
import CategoriesTable from './CategoriesTable';
import CategoriesStore from '../stores/CategoriesStore';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

configure({ adapter: new Adapter() });

const mountComponent = (initialEntries) =>
	mount(
		<Provider ProductsStore={new ProductsStore()} CategoriesStore={new CategoriesStore()}>
			<MemoryRouter {...(initialEntries ? { initialEntries } : {})}>
				<Router />
			</MemoryRouter>
		</Provider>
	);

describe('Router', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mountComponent();
	});

	it('Should render the Router component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render the CategoriesTable component when path is /categories', () => {
		wrapper = mountComponent([ { pathname: '/categories' } ]);
		expect(wrapper.find(CategoriesTable)).toHaveLength(1);
		expect(wrapper.find(ProductsTable)).toHaveLength(0);
	});

	it('Should render the ProductsTable component when path is /products', () => {
		wrapper = mountComponent([ { pathname: '/products' } ]);
		expect(wrapper.find(ProductsTable)).toHaveLength(1);
		expect(wrapper.find(CategoriesTable)).toHaveLength(0);
	});
});
