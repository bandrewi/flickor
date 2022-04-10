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
        await dispatch(editPhoto({ id, content }))
        setEditClicked(false)
    }


    let favoritedColor = 'white'
    if (favorite) favoritedColor = 'red'

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
                <div id='single-photo-container'>
                    <img id='single-photo' src={photo.imageUrl} />
                    <Link class="prev" to={`/photos/${prevPhotoId}`}>❮</Link>
                    <Link class="next" to={`/photos/${nextPhotoId}`}>❯</Link>
                    {/* <div>
                        {!editClicked && <div id="content">{photo.content}</div>}
                        {editClicked && (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                                <button type='submit'>Submit Changes</button>
                            </form>
                        )}
                        <button onClick={handleFavorite} style={{ color: favoritedColor }}>Favorite</button>
                        {sessionUserId === photo.userId && (
                            <div>
                                <button id='edit' onClick={handleEdit}>Edit</button>
                                <button id='delete' onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div> */}
                </div>
            )}
        </>
    )
}