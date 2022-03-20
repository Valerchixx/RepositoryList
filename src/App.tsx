import React, { useEffect, useState } from 'react';
import './App.css';
import Favorites from './Components/Favorites';
import Card from './Components/Cards';
import Pagination from './Components/Pagination';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { fillingFlag } from './utils/fillingFlag';


function App() {
  localStorage.clear()
  const [data, setData] = useState<any[]>([]);
  const [flag,setFlag] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5)
  console.log(flag)

  useEffect(() =>{
     getRes()
  }, []);

 async function getRes(){
     let res = await fetch('https://api.github.com/search/repositories?q=created:%3E2022-03-13&sort=stars&order=desc')
     let data = await res.json();
     setFlag(fillingFlag(data.items))
     setData(data.items)
  }
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const curPage = data.slice(firstIndex, lastIndex);

  function paginate(pageNumber: number){
    setCurrentPage(pageNumber)

  }

  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path='/' element={ <Card cardsArr={curPage} boolArray={flag} />} />
      <Route path='/favorites'  element={<Favorites totalCards={data.length} />}/>
    </Routes>
    </Router>
    <Pagination totalCards={data.length} perPage={perPage} paginate={paginate} />
    </div>
  );
}

export default App;
