import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { addFavorite, getFavorites, removeFavorite } from "../../store/favorite";
import { deletePhoto, editPhoto, getPhoto, getUserPhotos } from "../../store/photo";

import './SinglePhoto.css'

export default function SinglePhoto() {
    const dispatch = useDispatch();
    const photos = useSelector(state => Object.values(state.photos))
    const sessionUserId = useSelector(state => state.session.user.id)
    const favorites = useSelector(state => Object.values(state.favorites))
    const [editClicked, setEditClicked] = useState(false)
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    const history = useHistory()
    const photo = photos.find(photo => photo.id === +id)
    const favorite = favorites.find(favorite => favorite.photoId === +id)
    const photoIdx = photos.indexOf(photo)

    //using another useEffect is redundant when refactoring try passing photos in as a prop
    // useEffect(() => {
    //     dispatch(getPhoto(id))
    // }, [dispatch])


    let nextPhotoId
    let prevPhotoId
    if (photos.length > 0) {
        if (photoIdx === photos.length - 1) {
            nextPhotoId = photos.at(0).id
        } else {
            nextPhotoId = photos.at(photoIdx + 1).id
        }

        if (photoIdx === 0) {
            prevPhotoId = photos.at(photos.length - 1).id
        } else {
            prevPhotoId = photos.at(photoIdx - 1).id
        }
    }

    useEffect(() => {
        dispatch(getUserPhotos())
    }, [dispatch])

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    useEffect(() => {
        if (photo) setContent(photo.content)
    }, [])

    const handleDelete = () => {
        dispatch(deletePhoto(id))
        history.push('/photos')
    }

    const handleEdit = () => {
        setEditClicked(!editClicked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await dispatch(editPhoto({ id, content }))
            setErrors([])
            setEditClicked(!editClicked)
        } catch (err) {
            const data = await err.json()
            if (data && data.errors) setErrors(data.errors);
        }
    }


    const handleFavorite = async () => {
        if (favorite) {
            await dispatch(removeFavorite(favorite.id))
        } else {
            await dispatch(addFavorite(photo.id))
        }
    }

    return (
        <>
            {photos.length > 0 && (
                <>
                    <div id='single-photo-container'>
                        <img id='single-photo' src={photo.imageUrl} />
                        <Link className="prev" to={`/photos/${prevPhotoId}`}>❮</Link>
                        <Link className="next" to={`/photos/${nextPhotoId}`}>❯</Link>
                        <div id='btn-container'>
                            {/* {!editClicked && <div id="content">{photo.content}</div>}
                        {editClicked && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                                <button type='submit'>Submit Changes</button>
                            </form>
                        )} */}
                            {!favorite &&
                                <img id='fav-image-off' className='fav-image' onClick={handleFavorite} src="https://img.icons8.com/ios/344/ffffff/star--v1.png" />}
                            {favorite &&
                                <img id='fav-image-on' className='fav-image' onClick={handleFavorite} src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGlkPSJvcmlnaW5hbC1pY29uIiBmaWxsPSIjZjFjNDBmIj48cGF0aCBkPSJNMzUuMDg4LDE2Ny4xODRjLTAuNjg4LDAgLTEuMzc2LC0wLjM0NCAtMi4wNjQsLTAuNjg4Yy0xLjAzMiwtMC42ODggLTEuNzIsLTIuNDA4IC0xLjM3NiwtMy43ODRsMTUuMTM2LC01Ni40MTZsLTQ1LjQwOCwtMzYuODA4Yy0xLjM3NiwtMC42ODggLTEuNzIsLTIuNDA4IC0xLjM3NiwtMy43ODRjMC4zNDQsLTEuMzc2IDEuNzIsLTIuNDA4IDMuMDk2LC0yLjQwOGw1OC40OCwtMy4wOTZsMjAuOTg0LC01NC42OTZjMC42ODgsLTEuMDMyIDIuMDY0LC0yLjA2NCAzLjQ0LC0yLjA2NGMxLjM3NiwwIDIuNzUyLDEuMDMyIDMuMDk2LDIuMDY0bDIwLjk4NCw1NC42OTZsNTguNDgsMy4wOTZjMS4zNzYsMCAyLjc1MiwxLjAzMiAzLjA5NiwyLjQwOGMwLjM0NCwxLjM3NiAwLDIuNzUyIC0xLjAzMiwzLjc4NGwtNDUuNDA4LDM2LjgwOGwxNS4xMzYsNTYuNDE2YzAuMzQ0LDEuMzc2IDAsMi43NTIgLTEuMzc2LDMuNzg0Yy0xLjAzMiwwLjY4OCAtMi43NTIsMS4wMzIgLTMuNzg0LDBsLTQ5LjE5MiwtMzEuNjQ4bC00OS4xOTIsMzEuNjQ4Yy0wLjY4OCwwLjY4OCAtMS4wMzIsMC42ODggLTEuNzIsMC42ODh6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" />}

                            {sessionUserId === photo.userId && (
                                <>
                                    {/* <button id='edit' onClick={handleEdit}>Edit</button> */}
                                    {/* <p id='delete' onClick={handleDelete}>
                                    <img src="https://img.icons8.com/windows/344/ffffff/trash.png" /> */}
                                    <img id='delete' onClick={handleDelete} src="https://img.icons8.com/windows/344/ffffff/trash.png" />
                                    {/* </p> */}
                                </>
                            )}
                        </div>
                    </div>
                    <div id="content-container">
                        {!editClicked && (
                            <>
                                <div id="content" onClick={handleEdit}>{photo.content}</div>
                                <img id='edit' src="https://img.icons8.com/material-outlined/344/edit--v1.png" />
                            </>
                        )}
                        {editClicked && (
                            <form id='edit-form' onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                                {errors && <div id='edit-error'>{errors[0]}</div>}
                                <div id="edit-btn-container">
                                    <button id='edit-btn' type='submit'>Submit Changes</button>
                                </div>
                            </form>
                        )}
                    </div>
                </>
            )}
        </>
    )
}