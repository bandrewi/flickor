import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../store/session";

import './NonUserHome.css'

export default function NonUserHome({ photos }) {
    const dispatch = useDispatch();
    const [photoNum, setPhotoNum] = useState(0);


    // const bgImg = photos[photoNum].imageUrl
    // document.body.style.backgroundImage = `url(${bgImg})`;
    // function changeImage() {
    //     document.getElementById('nonuserhome-photo-container').style.backgroundImage = `url(${bgImg})`
    // }

    useEffect(() => {
        const photoInterval = setInterval(() => {
            setPhotoNum(prevNum => ++prevNum % photos.length);
        }, 5000);
        // changeImage()
        return () => clearInterval(photoInterval);
    }, []);
    //with changeimage add photoNum to dependency

    const handleClick = () => {
        const credential = 'demo@user.io'
        const password = 'password'
        dispatch(login({ credential, password }))
    }

    return (
        <>
            {
                photos.length > 0 && (
                    <>
                        {/* <div id='bg-img' style={{ backgroundImage: `url(${bgImg})` }} /> */}
                        <div id='nonuserhome-photo-container'>
                            <img id='nonuserhome-photo' src={photos[photoNum].imageUrl} />
                            <h1 id='heading'>Find your inspiration.</h1>
                            {/* <h2>Join the Flickor community, home to some photos and a couple of users</h2> */}
                            <div>
                                <button id='demo-btn' onClick={handleClick}>Demo Login</button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}