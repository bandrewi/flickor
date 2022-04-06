import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deletePhoto, editPhoto, getPhoto } from "../../store/photo";

import './SinglePhoto.css'

export default function Photo() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos)
    const sessionUserId = useSelector(state => state.session.user.id)
    const [editClicked, setEditClicked] = useState(false)
    const [content, setContent] = useState('')
    const { id } = useParams()
    const history = useHistory()
    const photo = photos[id]

    //using another useEffect is redundant when refactoring try passing photos in as a prop
    useEffect(() => {
        dispatch(getPhoto(id))
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

    return (
        <>
            {photo && (
                <div id='single-photo-container'>
                    <img id='single-photo' src={photo.imageUrl} />
                    <div>
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
                        {sessionUserId === photo.userId && (
                            <div>
                                <button id='edit' onClick={handleEdit}>Edit</button>
                                <button id='delete' onClick={handleDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}