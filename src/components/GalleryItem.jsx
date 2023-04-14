import { useState } from "react";

export default function GalleryItem({ item }) {
    let [view, setView] = useState(false)


    let { trackName, collectionName, primaryGenreName, releaseDate} = item;

    const simpleView = () => {
        return (
            <div>
                <h3>{ trackName }</h3>
                <h4>{ collectionName}</h4>
            </div>
        )
    }

    const detailView = () => {
        return (
            <div>
                <h2>{trackName}</h2>
                <h3>{collectionName}</h3>
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