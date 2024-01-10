// Characters.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import {fetchCharacter} from "../../store/actions";
import ErrorMessage from "../../components/ErrorMessage";
import CharacterDetails from "../../components/CharacterDetails";

const Characters = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { people, films, loading, error } = useSelector((state) => state.character);

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, [dispatch, id]);

  const renderDetails = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage />;
    }

    return (
        <CharacterDetails
            name={people.name}
            gender={people.gender}
            hair={people.hair_color}
            skin={people.skin_color}
            mass={people.mass}
            height={people.height}
            eye={people.eye_color}
            id={id}
            films={films}
        />
    );
  };

  return (
      <div>
        <Navbar/>
        <div className="container">
          <div className="row">{renderDetails()}</div>
        </div>
      </div>
  );
};

export default Characters;
