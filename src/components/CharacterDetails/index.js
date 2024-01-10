import "./style.css";
import Films from "../Films";

const CharacterDetails = ({ name, hair, skin, mass, height, eye, id, gender, films }) => {
    console.log(gender)
    return (
        <div className="col-md-12 col-lg-12 mt-5">
            <div className="row g-0 border rounded-4 overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="pb-2 border-bottom fw-bolder">{name}</h3>
                    <div className='content mt-2'>
                        <div className="row mb-3">
                            <div className="col-lg-6 col-md-6 themed-grid-col">
                                <div className="mt-1">
                                    <span className="fw-bold pe-1">Gender:</span>
                                    <span className="">{gender}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="fw-bold pe-1">Hair Color:</span>
                                    <span className="">{hair}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="fw-bold">Skin Color: </span>
                                    <span>{skin}</span>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 themed-grid-col">
                                <div className="mt-1">
                                    <span className="fw-bold">Eye Color: </span>
                                    <span>{eye}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="fw-bold">Height: </span>
                                    <span>{height}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="fw-bold">Mass: </span>
                                    <span>{mass}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="pb-2 mt-3 border-bottom fw-bolder">Films</h3>
                    <div className='content mt-2'>
                        <div className="row mb-3 mx-2">
                            <Films films={films} />
                        </div>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img
                        className="img-fluid"
                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                        alt="Star Wars Character"
                    />
                </div>
            </div>
        </div>




    )
}

export default CharacterDetails