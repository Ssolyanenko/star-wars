import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchQuery,
    setCharacters,
    setLoading,
    setError, setDispatchFilms,
} from '../../store/actions'
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import CharacterCards from "../../components/CharacterCards";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import {enhancedFetch} from "../../services/Http";
import {BASE_API_URL} from "../../store/actions";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const {people, search, loading, error} = useSelector((state) => state.home);
    const [page, setPage] = useState(1)
    const [selectedFilm, setSelectedFilm] = useState('');
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [localFilms, setLocalFilms]=useState([])
    const {  films } = useSelector((state) => state.character);
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
    console.log(films)
    const handleFilmChange = (e) => {
        setSelectedFilm(e.target.value);
    };
    const filtered = gender ? people.filter((d) => d.gender === gender) : people
    const renderFilms = () => {
        return (
            <select value={selectedFilm} onChange={handleFilmChange}>
                <option value="">All Films</option>
                {films.map((film) => (
                    <option key={film.url} value={film.url}>
                        {film.title}
                    </option>
                ))}
            </select>
        );
    };

    const handleFilmClick = async (e) => {
       setLocalFilms(e.target.value)
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

    const filteredPeople = people.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderCharacter = () => {
        if (loading) {
            return <Loading/>;
        }

        if (error) {
            return <ErrorMessage/>;
        }

        return filtered.map((person) => (
            <CharacterCards key={person.url} id={person.url.split('/').at(-2)} name={person.name}/>
        ));
    };

    return (
        <div className="Home">
            <Navbar/>
            <div className="container">
                <div>
                    <h3>Filter by Gender:</h3>
                    <label>
                        <input
                            type="radio"
                            value=""
                            checked={gender === ''}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="n/a"
                            checked={gender === 'n/a'}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Others
                    </label>
                </div>
                <div>
                    <h3>Filter by Film:</h3>
                    {renderFilms()}
                    <button onClick={handleFilmClick}>View Film Details</button>
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
