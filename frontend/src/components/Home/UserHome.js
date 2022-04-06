import { Link } from 'react-router-dom'

import Photo from '../Photo'

export default function UserHome({ photos }) {
    //dont want photos from user may have to make another get router
    return (
        <div>
            <ul>
                {photos.map(photo => (
                    <li key={photo.id}>
                        <Link to={`/photos/${photo.id}`}>
                            <Photo photo={photo} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        // <>
        //     {photos.length > 0 && (
        //     )
        //     }
        // </>
    )
}