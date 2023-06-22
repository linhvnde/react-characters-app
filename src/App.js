import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [charactersArr, setCharactersArr] = useState(null);
  const baseURL = 'https://ih-crud-api.herokuapp.com';
  useEffect(() => {
    axios.get(baseURL + '/characters').then((res) => {
      setCharactersArr(res.data.slice(0, 5));
    });
  }, []);
  return (
    <div className="App">
      {charactersArr === null ? (
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
                <button>Delete</button>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default App;
