import { useState, useRef, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createResource as fetchData } from './helper';

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

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }


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
    useEffect(() => {
      if (searchTerms) {
        setData(fetchData(searchTerm))
      }
    }, [searchTerm])

    let [data, setData] = useState(null)

  }


  return (
    <div className="App">
      {message}
      {renderGallery()}
      <Router>

        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={{ term: searchInput, handleSearch }}>
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={{ data }}>

                <Suspense fallback={<h1>Loading...Please wait...</h1>}>
                  <Gallery />
                </Suspense>

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
