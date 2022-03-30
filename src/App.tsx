import React from 'react';
import './App.css';
import Favorites from './Page/FavoritesPage';
import CardPage from './Page/CardsPage';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route index element={ <CardPage/>} />
					<Route path="/favorites" element={<Favorites/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
