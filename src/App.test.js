import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('Should render the App component', () => {
    const wrapper = shallow(<App />);
  });
});
