import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoriesTable from './CategoriesTable';
import { Grid as TableGrid } from '@devexpress/dx-react-grid-material-ui';
import { observable } from 'mobx';

configure({ adapter: new Adapter() });

const mountWrapperWithStore = (store) => mount(<CategoriesTable.wrappedComponent CategoriesStore={store} />);

describe('CategoriesTable', () => {
	let wrapper;

	beforeEach(() => {
		const mockStore = observable({
			categories: [],
			addCategory: (category) => {},
			updateCategory: (changes) => {},
			deleteCategory: (deleted) => {}
		});

		wrapper = mountWrapperWithStore(mockStore);
	});

	it('Should render the CategoriesTable component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render a title in CategoriesTable component', () => {
		const text = wrapper.find('h4.MuiTypography-h4').text();
		expect(text).toEqual('Categories');
	});

	it('Should render a Grid in CategoriesTable component', () => {
		expect(wrapper.find(TableGrid)).toHaveLength(1);
	});
});
