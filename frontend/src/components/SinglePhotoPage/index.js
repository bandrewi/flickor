import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deletePhoto, editPhoto, getPhoto } from "../../store/photo";


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
                <div>
                    <img src={photo.imageUrl} />
                    {!editClicked && <div>{photo.content}</div>}
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
                        <>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={handleEdit}>Edit</button>
                        </>
                    )}
                </div>

            )}
        </>
    )
}