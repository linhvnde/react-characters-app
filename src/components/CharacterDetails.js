import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function CharacterDetails(props) {
  const { characterId } = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  //

  const deleteCharacter = () => {
    //dont need to put in the useEffect
    // get info from an api when a component is mounted --> useEffect
    // send request to an api upon user interaction (ex click on button, submit ect...) ---> no need to useEffect

    axios
      .delete(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
      .then((res) => {
        console.log('our character was successfully deleted...');
        console.log(res);
        props.callbackToGetListFromApi(); // update list of characters
        navigate('/'); // redirect to homepage
      })
      .catch((e) => console.log('Error deleting character from the API...', e));
  };

  return (
    <div className="box">
      <h1>{details.name}</h1>
      Occupation: {details.occupation} <br />
      Weapon: {details.weapon} <br />
      Debt: {details.debt ? 'Yes' : 'No'} <br />
      <p>
        <button onClick={deleteCharacter}>Delete this character</button>
      </p>
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
}

export default CharacterDetails;
