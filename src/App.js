import { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';

import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';

import './App.css';

function App() {

  let [message, setMessage] = useState('Search for Music');
  let [data, setData] = useState([]);
  let searchInput = useRef('')



  const handleSearch = async searchTerms => {
    if (!searchTerms) return
    document.title = `${searchTerms} Music`;
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerms}`);
    const resData = await response.json();
    if (resData.results.length) {
      setData(resData.results)
    } else {
      setData([]);
      setMessage('Not Found')
    }
    console.log(resData)


  }


  return (
    <div className="App">
      {message}
      <Router>

        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={{ term: searchInput, handleSearch }}>
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={{ data }}>


                <Gallery />

              </DataContext.Provider>
            </>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>

      </Router>

    </div>
  );

}
export default App;
