import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function NonUserHome({ photos }) {
    const [photoNum, setPhotoNum] = useState(0);

    useEffect(() => {
        const photoInterval = setInterval(() => {
            setPhotoNum(prevNum => ++prevNum % photos.length);
        }, 5000);

        return () => clearInterval(photoInterval);
    }, []);

    return (
        <>
            {
                photos.length > 0 && (
                    <div>
                        <img src={photos[photoNum].imageUrl} />
                    </div>
                )
            }
        </>
    )
}