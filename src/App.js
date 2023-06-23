import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';

import CharacterDetails from './components/CharacterDetails';
// import AboutPage from './pages/AboutPage';

function App() {
  const [charactersArr, setCharactersArr] = useState(null);
  // const baseURL = 'https://ih-crud-api.herokuapp.com';

  //List from API
  useEffect(() => {
    getCharactersFromApi();
  }, []);

  //Get list from API - BE CAREFULL you were using a function before declaring it, in the above code
  const getCharactersFromApi = () => {
    console.log('sending request to get the list of characters....');

    axios
      .get(`${process.env.REACT_APP_API_URL}/characters`)
      .then((response) => {
        console.log('number of characters in the api...', response.data.length);
        setCharactersArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  //To Render the list of characters
  const renderListOfCharacters = () => {
    if (charactersArr === null) {
      return <p>loading....</p>;
    } else {
      return charactersArr.map((characterObj) => {
        return (
          <div key={characterObj.id} className="character box">
            Name: {characterObj.name} <br />
            Weapon: {characterObj.weapon} <br />
            <Link to={`/characters/${characterObj.id}`}>More details</Link>
          </div>
        );
      });
    }
  };

  //delete
  // useEffect(() => {
  //   axios
  //     .delete(`${baseURL}/characters/33`)
  //     .then((response) => {
  //       console.log('delete of character ', response.data);
  //     })
  //     .catch((e) => console.log(e));
  // })

  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/about">About</NavLink> |
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={renderListOfCharacters()} />
        <Route path="/about" element={<p>This is the about page</p>} />
        <Route path="/contact" element={<p>This is the contact page</p>} />
        <Route
          path="/characters/:characterId"
          element={
            <CharacterDetails callbackToGetListFromApi={getCharactersFromApi} />
          }
        />
        <Route path="*" element={<p>This page doesnt exist</p>} />
      </Routes>

      {/* {charactersArr === null ? (
        'loading....'
      ) : (
        <h2>Number of characters in the API: {charactersArr.length}</h2>
      )}
      <section className="characters-list">
        {charactersArr &&
          charactersArr.map((character) => {
            return (
              <div key={Date.now()} className="character box">
                <h2>{character.name}</h2>
                <p>Weapon: {character.weapon}</p>
                <button onClick={() => {}}>Delete</button>
              </div>
            );
          })}
      </section> */}
    </div>
  );
}

export default App;
