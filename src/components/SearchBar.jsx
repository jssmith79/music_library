
import { useState } from 'react';

export default function SearchBar({ setSearch }) {
    let [searchTerm, setSearchTerm] = useState('');
    let onSearchSubmit = e => {
        e.preventDefault()
        setSearch(searchTerm)

    }
    return (
        <form onSubmit={ onSearchSubmit }>
            <input type="text" 
            placeholder="Enter a search term here"
            onChange={e => setSearchTerm(e.target.value)}
            />
            <input type="submit" />
        </form>
    )
}


