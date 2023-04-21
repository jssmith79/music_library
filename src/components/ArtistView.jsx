// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/album/${id}`;
            const response = await fetch(API_URL);
            const resData = await response.json();
            setArtistData(resData.results);

        }
        fetchData();
    }, [id]);

    const navButtons = () => {
        return (
            <div>
                <button type="button" onClick={ () => navigate(-1)}>Back</button>

                <button type="button" onClick={ () => navigate('/')}>Home</button>
            </div>
        )
    }
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const renderAlbums = justAlbums.map((album, index) => {
        return (
            <div key={index}>
                <Link to={`/album/${album.collectionId}`}>
                    <p> {album.collectionName}</p>
                </Link>

            </div>
        )
    });
    return (
        <div>
            { artistData[0]?.artistName }
            {navButtons ()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView
