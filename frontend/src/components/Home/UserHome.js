import { Link } from 'react-router-dom'

import Photo from '../Photo'
import './UserHome.css'

export default function UserHome({ photos }) {

    return (
        <div>
            <ul id='userhome-photo-container'>
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Link to={`/photos/${photo.id}`}>
                            <Photo photo={photo} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}