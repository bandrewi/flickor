import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../store/session";

export default function NonUserHome({ photos }) {
    const dispatch = useDispatch();
    const [photoNum, setPhotoNum] = useState(0);

    useEffect(() => {
        const photoInterval = setInterval(() => {
            setPhotoNum(prevNum => ++prevNum % photos.length);
        }, 5000);

        return () => clearInterval(photoInterval);
    }, []);

    const handleClick = () => {
        const credential = 'demo@user.io'
        const password = 'password'
        dispatch(login({ credential, password }))
    }

    return (
        <>
            {
                photos.length > 0 && (
                    <div>
                        <img id='bg' src={photos[photoNum].imageUrl} />
                        <div>Find your inspiration.</div>
                        <div>Join the Flickor community, home to some photos and a couple of users</div>
                        <div>
                            <button onClick={handleClick}>Demo Login</button>
                        </div>
                    </div>

                )
            }
        </>
    )
}