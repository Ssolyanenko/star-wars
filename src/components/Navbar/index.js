import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
    return (
        <div className="nav-bar navbar navbar-expand-lg navbar-dark mb-4 d-flex justify-content-between px-3">
            <header className="d-flex">
                <img src="//cssanimation.rocks/demo/starwars/images/star.svg" alt="Star" className="nav-bar__img" />
                <img src="//cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars" className="nav-bar__img" />
            </header>
            <ul className="nav-bar__list nav justify-content-end">
                <li className="nav-item">
                    <Link className="nav-bar__link" to="/">
                        <button className="nav-link fw-semibold fs-5" aria-current="page">Characters</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar