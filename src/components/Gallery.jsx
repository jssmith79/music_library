import GalleryItem from './GalleryItem'


export default function Gallery({data}){
    
    const galleryItems = data.map((item, index ) => {
        return <GalleryItem item={item} key={ index }/>
    });
    return (
        <div>
            {galleryItems}
        </div>
    )
}


