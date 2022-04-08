import { NavLink } from "react-router-dom";

export default function UploadButton() {
    return (
        <NavLink to='/upload'>
            <p>
                <img id='upload-icon' src='https://cdn.iconscout.com/icon/free/png-256/cloud-upload-1912186-1617655.png' />
            </p>
        </NavLink>
    )
}