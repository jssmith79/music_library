import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';

import './App.css';

function App() {
  let [search, setSearch] = useState('');
  let [message, setMessage] = useState('Search for Music');
  let [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!search) return
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`);
      const resData = await response.json();
      if (resData.results.length) {
        setData(resData.results)
      } else {
        setData([]);
        setMessage('Not Found')
      }
      console.log(resData)

    }
    fetchData();
  }, [search]);
  return (
    <div className="App">

      <SearchBar setSearch={setSearch} />
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
