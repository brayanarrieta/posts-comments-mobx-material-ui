import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddProductDialog from './index';
import { observable } from 'mobx';
import { DialogTitle, DialogContent, TextField, MenuItem, Input, Select } from '@material-ui/core';

configure({ adapter: new Adapter() });

const mountComponent = (mockStores, props) =>
	mount(<AddProductDialog.wrappedComponent {...{ ...mockStores, ...props }} />);

const generateMockStores = (stores = {}) => ({
	CategoriesStore: {
		categories: []
	},
	ProductsStore: {
		addProduct: (product) => {}
	},
	...stores
});

const generateMockProps = (props = {}) => ({
	handleChangeIsModalOpen: (isModalOpen) => {},
	isModalOpen: true,
	...props
});

describe('AddProductDialog', () => {
	let wrapper;
	let mockStores;
	let props;

	beforeEach(() => {
		jest.resetModules();
		mockStores = generateMockStores();
		props = generateMockProps();
		wrapper = mountComponent(mockStores, props);
	});

	it('Should render the AddProductDialog component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render a title in AddProductDialog component', () => {
		const expected = 'Add Product';
		const text = wrapper.find(DialogTitle).text();
		expect(text).toEqual(expected);
	});

	it('Should render 5 TextField in form component', () => {
		const expected = 5;
		const dialogContent = wrapper.find(DialogContent);
		const textFields = dialogContent.find(TextField);
		expect(textFields).toHaveLength(expected);
	});

	it('Should be called handleChangeIsModalOpen prop when click the Cancel button', () => {
		const handleChangeIsModalOpenSpy = jest.spyOn(props, 'handleChangeIsModalOpen');
		wrapper = mountComponent(mockStores, props);
		const button = wrapper.find({ children: 'Cancel' }).first();
		button.simulate('click');
		expect(handleChangeIsModalOpenSpy).toHaveBeenCalled();
	});
});
