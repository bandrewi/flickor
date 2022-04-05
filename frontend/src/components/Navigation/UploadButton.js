import { NavLink } from "react-router-dom";

export default function UploadButton() {
    return (
        <NavLink to='/upload'>
            <button>
                <i className="fa-solid fa-cloud-arrow-up" />
            </button>
        </NavLink>
    )
}