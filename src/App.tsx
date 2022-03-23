import React, { useEffect, useState } from 'react';
import './App.css';
import Favorites from './Page/FavoritesPage';
import CardPage from './Page/CardsPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { fillingFlag } from './utils/fillingFlag';
import { CardType} from './utils/type';

function App() {
  localStorage.clear()
  const [repos, setRepos] = useState<CardType[]>([]);
  const [flag,setFlag] = useState<boolean[]>([]);
  console.log(flag)

  useEffect(() =>{
     getRes()
  }, []);

 async function getRes(){
     let res = await fetch('https://api.github.com/search/repositories?q=created:%3E2022-03-13&sort=stars&order=desc')
     let data = await res.json();
     setFlag(fillingFlag(data.items))
     setRepos(data.items)
  }

  return (
    <div className="App">
    <Router>
    <Routes>
      <Route index element={ <CardPage repoArr={repos} boolArray={flag} />} />
      <Route path='/favorites'  element={<Favorites/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
