import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';

configure({ adapter: new Adapter() });

import CategoriesStore from './stores/CategoriesStore';
import ProductsStore from './stores/ProductsStore';

describe('index.js', () => {
	const originalRender = ReactDOM.render;
	const originalGetElement = global.document.getElementById;

	let categories;
	let products;

	beforeEach(() => {
		categories = new CategoriesStore();
		products = new ProductsStore();
		global.document.getElementById = () => true;
		ReactDOM.render = jest.fn();
	});

	afterAll(() => {
		global.document.getElementById = originalGetElement;
		ReactDOM.render = originalRender;
	});

	it('should render index.js without crashing', () => {
		require('./index.js');
		expect(ReactDOM.render).toHaveBeenCalled();
	});
});
