import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getUserPhotos } from "../../store/photo";
import Photo from "../Photo";
import './UserPhotos.css'

export default function UserPhotos() {
    const dispatch = useDispatch();
    const photosArr = useSelector(state => Object.values(state.photos))

    useEffect(() => {
        dispatch(getUserPhotos())
    }, [dispatch])

    return (
        <div>
            {photosArr.length > 0 && (
                <ul id='photos-container'>
                    {photosArr.map(photo =>
                    (
                        <li id={`image-${photo.id}`} className='photos' key={photo.id}>
                            <Link to={`/photos/${photo.id}`}>
                                <Photo photo={photo} />
                            </Link>
                        </li>
                    )
                    )}
                </ul>
            )}
        </div>
    )
}