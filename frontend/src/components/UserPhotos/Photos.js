import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserPhotos } from "../../store/photo";
import { Link } from "react-router-dom";

export default function Photos() {
    const dispatch = useDispatch();
    const photos = useSelector(state => Object.values(state.photos))

    useEffect(() => {
        dispatch(getUserPhotos())
    }, [dispatch])

    return (
        <>
            {photos.length > 0 && (
                <ul>
                    {photos.map(photo => (
                        <li key={photo.id}>
                            <Link to={`/photos/${photo.id}`}>
                                <img src={photo.imageUrl} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}