import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductsTable from './ProductsTable';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';
import { TablePagination, TableBody, TableRow, TableCell } from '@material-ui/core';

configure({ adapter: new Adapter() });

const mountWrapperWithStore = (mockStores) =>
	mount(
		<Provider {...mockStores}>
			<ProductsTable.wrappedComponent {...mockStores} />
		</Provider>
	);

const generateMockStores = (categories, products) =>
	observable({
		CategoriesStore: {
			categories,
			getNameByCategoryId: (id) => {}
		},
		ProductsStore: {
			products,
			addProduct: (product) => {},
			productsCount: products.length
		}
	});

describe('ProductsTable', () => {
	let wrapper;
	let mockStores;

	beforeEach(() => {
		mockStores = generateMockStores([], []);
		wrapper = mountWrapperWithStore(mockStores);
	});

	it('Should render the ProductsTable component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render a title in ProductsTable component', () => {
		const text = wrapper.find('h4.MuiTypography-h4').text();
		expect(text).toEqual('Products');
	});

	it('Should render a button to open AddProductDialog component', () => {
		const text = wrapper.find({ children: 'Add new product' }).first().text();
		expect(text).toEqual('Add new product');
	});
	
	it('Should render a TablePagination component', () => {
		expect(wrapper.find(TablePagination)).toHaveLength(1);
	});

	it('Should not render TableRows in the TableBody component', () => {
		const tableBody = wrapper.find(TableBody);
		const tableRows = tableBody.find(TableRow);
		expect(tableRows).toHaveLength(0);
	});

	it('Should render TableRows in the TableBody component', () => {
		mockStores = generateMockStores(
			[ { id: 1, name: 'Food', description: 'Test' } ],
			[
				{ id: 1, name: 'test name 1', description: 'test', price: 0, stock: 0, categoryId: 1 },
				{ id: 2, name: 'test name 2', description: 'test', price: 0, stock: 0, categoryId: 1 }
			]
		);
		wrapper = mountWrapperWithStore(mockStores);
		const tableBody = wrapper.find(TableBody);
		const tableRows = tableBody.find(TableRow);
		expect(tableRows).toHaveLength(2);
	});

	it('Should render 5 TableCell in every TableRow component', () => {
		mockStores = generateMockStores(
			[ { id: 1, name: 'Food', description: 'Test' } ],
			[ { id: 1, name: 'test name 1', description: 'test', price: 0, stock: 0, categoryId: 1 } ]
		);
		wrapper = mountWrapperWithStore(mockStores);
		const tableBody = wrapper.find(TableBody);
		const tableRow = tableBody.find(TableRow).first();
		const tableCells = tableRow.find(TableCell);
		expect(tableCells).toHaveLength(5);
	});
});
