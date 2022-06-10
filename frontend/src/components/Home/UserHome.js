import { Link } from 'react-router-dom'

import Photo from '../Photo'
import './UserHome.css'

export default function UserHome({ photos }) {

    return (
        <div id='userhome-photo-container-outer'>
            <div id='ppl-to-follow'>
                <div>People to follow</div>
            </div>
            <ul id='userhome-photo-container'>
                {photos.map(photo => (
                    <li key={photo.id} className='photo-container'>
                        <Link to={`/photos/${photo.id}`} className='photo'>
                            <Photo photo={photo} />
                        </Link>
                        {/* <div className='photo-content'>{photo.content} </div> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}