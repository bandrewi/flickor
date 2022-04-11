import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUserPhotos } from "../../store/photo";
import Photo from "../Photo";
import './UserPhotos.css'

export default function UserPhotos() {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id)
    const photosArr = useSelector(state => Object.values(state.photos))

    //not efficient making multiple fetch calls when only have to make one and pass down as props
    //when refactoring solve this issue

    useEffect(() => {
        if (sessionUserId) dispatch(getUserPhotos(sessionUserId))
    }, [dispatch])

    return (
        <div>
            {photosArr.length > 0 && sessionUserId && (
                <ul id='userphotos-container'>
                    {photosArr.map(photo =>
                    (
                        <li key={photo.id}>
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