import './Photo.css'

export default function Photo({ photo }) {
    return (
        <figure className='grid-figure'>
            <img id={`photo-${photo.id}`} className='photo' src={photo.imageUrl} />
            <figcaption className='photo-content'>{photo.content} </figcaption>
        </figure>
    )
}