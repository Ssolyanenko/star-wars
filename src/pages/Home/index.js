import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchQuery,
    setCharacters,
    setLoading,
    setError,
} from '../../store/actions'
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import CharacterCards from "../../components/CharacterCards";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import {enhancedFetch} from "../../services/Http";
import {BASE_API_URL} from "../../store/actions";

const Home = () => {
    const dispatch = useDispatch();
    const {people, search, loading, error} = useSelector((state) => state.home);
    const [page, setPage] = useState(1)
    const [selectedFilm, setSelectedFilm] = useState('');
    const [gender, setGender] = useState('');
    const [localFilms, setLocalFilms]=useState([])
    const [minMass, setMinMass] = useState('');
    const [maxMass, setMaxMass] = useState('');

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await enhancedFetch('https://swapi.dev/api/films/');
                setLocalFilms(response.results)
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchFilms();
    }, []);

    const handleFilmChange = (e) => {
        setSelectedFilm(e.target.value);
    };

    const handleResetFilters = () => {
        setGender('');
        setSelectedFilm('');
        setMinMass('');
        setMaxMass('');
        dispatch(setSearchQuery(''))
    };

    const renderFilms = () => {
        return (
            <select value={selectedFilm} onChange={handleFilmChange} className='form-select border-0 shadow me-md-8'>
                <option value="">Filter by films</option>
                {localFilms.map((film) => (
                    <option key={film.url} value={film.url}>
                        {film.title}
                    </option>
                ))}
            </select>
        );
    };

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                dispatch(setLoading(true));
                const response = await enhancedFetch(BASE_API_URL + `/people/?page=${page}`);
                dispatch(setCharacters(response.results));
            } catch {
                dispatch(setError(true));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchPeople();
    }, [dispatch, page]);

    const handleSearch = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleMinMassChange = (e) => {
        setMinMass(e.target.value);
    };

    const handleMaxMassChange = (e) => {
        setMaxMass(e.target.value);
    };
    const renderCharacter = () => {
        if (loading) {
            return <Loading/>;
        }

        if (error) {
            return <ErrorMessage/>;
        }

        const filteredPeople = people.filter((item) =>
            (gender ? item.gender === gender : true) &&
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            (selectedFilm ? item.films.includes(selectedFilm) : true) &&
            (minMass !== '' ? parseFloat(item.mass) >= parseFloat(minMass) : true) &&
            (maxMass !== '' ? parseFloat(item.mass) <= parseFloat(maxMass) : true)
        );

        return filteredPeople.map((person) => (
            <CharacterCards key={person.url} id={person.url.split('/').at(-2)} name={person.name}/>
        ));
    };

    return (
        <div className="Home">
            <Navbar/>
            <div className="container">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Filter by Gender:</h3>
                            <div className='d-flex flex-column'>
                                <label className="radio-label me-md-2">
                                    <input
                                        type="radio"
                                        value=""
                                        checked={gender === ''}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    All
                                </label>
                                <label className="radio-label me-md-2">
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Male
                                </label>
                                <label className="radio-label me-md-2">
                                    <input
                                        type="radio"
                                        value="female"
                                        className="mr-2"
                                        checked={gender === 'female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Female
                                </label>
                                <label className="radio-label me-md-2">
                                    <input
                                        type="radio"
                                        value="n/a"
                                        checked={gender === 'n/a'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Others
                                </label>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <h3 className='pb-4'>Filter by Film:</h3>
                            {renderFilms()}
                        </div>

                        <div className="col-md-4">
                            <h3>Filter by Mass:</h3>
                            <div className="form-group">
                                <label htmlFor="minMass">Min Mass:</label>
                                <input
                                    type="text"
                                    className="form-control border-0 shadow"
                                    id="minMass"
                                    value={minMass}
                                    onChange={handleMinMassChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="maxMass">Max Mass:</label>
                                <input
                                    type="text"
                                    className="form-control border-0 shadow"
                                    id="maxMass"
                                    value={maxMass}
                                    onChange={handleMaxMassChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 m-auto pb-5 pt-3">
                    <form role="search">
                        <input
                            className="form-control form-control-lg border-0 shadow"
                            type="search"
                            placeholder="Search Character..."
                            aria-label="Search"
                            value={search}
                            onChange={handleSearch}
                        />
                    </form>
                    <div className='d-flex justify-content-center mt-4'>
                        <button className='btn btn-primary' type="reset" onClick={handleResetFilters}>Reset All Filters</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-12 col-12">
                        <div className="row">
                            {renderCharacter()}
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                pageNumber={page}
                updatePageNumber={setPage}
            />
        </div>
    );
}

export default Home;
