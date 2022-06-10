import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../store/session";
import { Link } from 'react-router-dom';

import './NonUserHome.css'

export default function NonUserHome({ photos }) {
    const dispatch = useDispatch();
    const [photoNum, setPhotoNum] = useState(0);
    const images = [
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/If_Only_We_Could_Turn_Back_Time_Anna_Kwa.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Frosch_Bokeh_2_Axel_F.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Dawn_of_Another_Day_Sky_Matthews.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Fantasy_Island_Daniel_Cheong.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Desert_Beauty_Christoph_Fischer.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/sunset_1663_Junji_Aoyama.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Cool_Power_commended-LPOTY_UK_Steve_Cole.jpg',
        'https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Mists_of_renfrew_Adam_Gibbs.jpg',
    ]

    // const bgImg = photos[photoNum].imageUrl
    // document.body.style.backgroundImage = `url(${bgImg})`;
    // function changeImage() {
    //     document.getElementById('nonuserhome-photo-container').style.backgroundImage = `url(${bgImg})`
    // }

    useEffect(() => {
        const photoInterval = setInterval(() => {
            setPhotoNum(prevNum => ++prevNum % images.length);
        }, 5000);
        return () => clearInterval(photoInterval);
    }, []);
    //with changeimage add photoNum to dependency

    // const handleClick = () => {
    //     const credential = 'demo@user.io'
    //     const password = 'password'
    //     dispatch(login({ credential, password }))
    // }

    return (
        <>
            {
                images.length > 0 && (
                    <>
                        <div>
                            {/* <div id='bg-img' style={{ backgroundImage: `url(${bgImg})` }} /> */}
                            {/* <div id='nonuserhome-photo-container-outer' class='' style={{ backgroundImage: `url(${images[photoNum + 1]})` }} /> */}
                            {/* {images.forEach(image => (
                            <div className={ } />
                        ))} */}
                            <div id='nonuserhome-photo-container-inner' style={{ backgroundImage: `url(${images[photoNum]})` }}>
                                {/* <img id='nonuserhome-photo' src={photos[photoNum].imageUrl} /> */}
                                <h1 id='heading'>Find your inspiration.</h1>
                                <h2 id="heading-2">Join the Flickor community, home to some photos and a couple users.</h2>
                                <div>
                                    <Link to='/signup'>
                                        <button id='demo-btn'>Start for free</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <footer className="flex-row">
                            {/* <span>Connect with the developer :</span> */}
                            <div id="footer-inner" className="flex-row">
                                <div id="technologies" className="flex-row">
                                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="" />
                                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="" />
                                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="" />
                                    <img src="https://i.imgur.com/MoFw3WD.png" alt="" />
                                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="" />
                                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="" />
                                    <img src="https://i.imgur.com/E8GbqHf.png" alt="" />
                                    <img id='last-tech' src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="" />
                                    {/* <img src="" /> */}
                                </div>
                                <div id='about' className="flex-row">
                                    <a href="https://github.com/bandrewi" target='_blank'>
                                        <img className="about-image" src="https://i.imgur.com/lkKyqhT.png" alt="" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/andrew-bui-26b718237/" target='_blank'>
                                        <img className="about-image" src="https://i.imgur.com/hLlhx14.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </>
                )
            }
        </>
    )
}