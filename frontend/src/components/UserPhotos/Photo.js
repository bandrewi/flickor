import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPhoto } from "../../store/photo";

export default function Photo() {
    const dispatch = useDispatch();
    const { id } = useParams()
    const photos = useSelector(state => state.photos)
    const photo = photos[id]

    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch])

    return (
        <div>
            {photo && (
                <img src={photo.imageUrl} />
            )}
        </div>
    )
}