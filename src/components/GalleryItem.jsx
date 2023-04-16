import { useState } from "react";
import { Link } from 'react-router-dom';

export default function GalleryItem({ item }) {
    let [view, setView] = useState(false)


    let { trackName,
        collectionName,
        primaryGenreName,
        releaseDate,
        artworkUrl100,
        artistId,
        artistName, collectionId } = item;

    const simpleView = () => {
        return (
            <div style={simpleStyle}>
                <h3>{trackName}</h3>
                <h4>{collectionName}</h4>
            </div>
        )
    }
    const simpleStyle = {
        'width': '25vw',
        'height': '20vh',
        'border': '1px solid black',
        'margin': '2px'
    }

    const detailStyle = {
        'width': '80vw',
        'height': '20vh',
        'border': '1px solid black',
        'margin': '2px',
        'backgroundImage': `url(${artworkUrl100})`,
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
        'color': 'yellow'
    }

    const detailView = () => {
        return (
            <div style={detailStyle}>
                <h2>{trackName}</h2>
                <h3>
                    <Link to={`/artist/${artistId}`}>
                        {artistName}
                    </Link></h3>
                <h3>
                    <Link to={`/album/${collectionId}`}>
                        {collectionName}
                    </Link>
                </h3>
                <h4>{primaryGenreName}</h4>
                <h4>{releaseDate}</h4>
            </div>
        )
    }
    return (
        <div
            onClick={() => setView(!view)}
            style={{ 'display': 'inline-block' }}
        >
            {
                view ? detailView() : simpleView()
            }
        </div>
    )
}