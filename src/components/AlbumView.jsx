
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setAlbumData(resData.results);
        }
        fetchData({});
    }, [id]);

    const navButtons = () => {
        return (
            <div>
                <button type="button" onClick={ () => navigate(-1)}>Back</button>
                <button type="button" onClick={ () => navigate('/')}>Home</button>
            </div>
        )
    }

        const justSongs = albumData.filter(entry => entry.wrapperType === 'track');
        const renderSongs = justSongs.map((song,index) => {
            return (
                <div key={index}>
                    <p>{song.trackName}</p>
                </div>
            )
        })
    return (
        <div>
            {navButtons()} 
            {renderSongs}
        </div>
    )
}

export default AlbumView
