import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import Header from './components/Header';

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				<Header />
			</Container>
		</React.Fragment>
	);
}

export default App;
