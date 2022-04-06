import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadPhoto } from "../../store/photo";

export default function UploadPage() {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState(''); //for this proj, synonymous w/ title
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const photo = await dispatch(uploadPhoto({ imageUrl, content }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        console.log('photo', photo)
        return history.push(`/photos/${photo.photo.id}`)
    }

    return (
        <div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>
                    Image URL:
                    <input
                        type='text'
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type='text'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    // required
                    />
                </label>
                <button type='submit'>Upload</button>
            </form>
        </div>
    )
}