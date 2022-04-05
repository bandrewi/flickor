import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto } from "../../store/photo";

export default function UploadPage() {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id)
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState(''); //for this proj, synonymous w/ title
    const [errors, setErrors] = useState([]);

    console.log('render userId', sessionUserId)

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('handlesubmit userId', sessionUserId)
        if (sessionUserId) {

            return dispatch(uploadPhoto({ sessionUserId, imageUrl, content }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
    }

    return (
        <div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                {/* <input hidden value={sessionUserId} /> */}
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