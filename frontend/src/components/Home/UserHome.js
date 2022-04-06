

export default function UserHome({ photos }) {
    //dont want photos from user may have to make another get router
    return (
        <div>
            <ul>
                {photos.map(photo => (
                    <li key={photo.id}>
                        <img src={photo.imageUrl} />
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