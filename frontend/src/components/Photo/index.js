import './Photo.css'

export default function Photo({ photo }) {
    return (
        <img id='photo' src={photo.imageUrl} />
    )
}