import { Link } from "react-router-dom";
import "./style.css";

const CharacterCards = ({ id, name }) => {

    return (
        <div key={id} className="col-lg-3 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
            <div className="character-card d-flex flex-column justify-content-center align-item-center shadow" >
                <img
                    className="character-card__img img-fluid"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                    alt="Star Wars Character"
                />
                <Link className="character-card__link" to={`/characters/${id}`} key={id} >
                    <div className="character-card__content">
                        <h1 className="fs-5 fw-bolder my-3 text-center">{name}</h1>
                    </div>
                </Link>
            </div>
        </div >
    )

}

export default CharacterCards