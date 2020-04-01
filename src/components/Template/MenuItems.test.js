import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuItems from './MenuItems';
import { ListItem } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

const mountComponent = () =>
	mount(
		<BrowserRouter>
			<MenuItems />
		</BrowserRouter>
	);

describe('MenuItems', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mountComponent();
	});

	it('Should render the MenuItems component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render the MenuItems options', () => {
		expect(wrapper.find(ListItem)).toHaveLength(4);
	});
});
