import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getUserPhotos } from "../../store/photo";

export default function UserPhotos() {
    const dispatch = useDispatch();
    const photosArr = useSelector(state => Object.values(state.photos))

    useEffect(() => {
        dispatch(getUserPhotos())
    }, [dispatch])

    return (
        <div>
            {photosArr.length > 0 && (
                <ul>
                    {photosArr.map(photo =>
                    (
                        <li key={photo.id}>
                            <Link to={`/photos/${photo.id}`}>
                                <img src={photo.imageUrl} />
                            </Link>
                        </li>
                    )
                    )}
                </ul>
            )}
        </div>
    )
}