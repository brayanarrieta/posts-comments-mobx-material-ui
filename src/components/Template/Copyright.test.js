import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Copyright from './Copyright';
import { Typography } from '@material-ui/core';

configure({ adapter: new Adapter() });

const mountComponent = (store) => mount(<Copyright />);

describe('Copyright', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mountComponent();
	});

	it('Should render the Copyright component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('Should render the copyright content', () => {
		const expected = `Copyright © Shop ${new Date().getFullYear()}.`;
		const text = wrapper.find(Typography).first().text();
		expect(text).toEqual(expected);
	});
});
