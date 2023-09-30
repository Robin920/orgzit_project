import axios from 'axios';
import {useState} from 'react';
import '../Components/SearchBar.css'

const SearchBar = () => {
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([{}]);
  const [detail, setDetail] = useState("");
  const [show, setShow] = useState(false);
  const [cindex, setCindex] = useState("");

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };

  const dataFetch = () => {
    message.length && axios.get(`https://www.omdbapi.com/?s=${message}&apikey=982ff953`).then(
      (response) => {setResults(response.data.Search); 
      console.log(response.data.Search)}
    )
  }

  const details = (imdb) => {
    setCindex(imdb);
    axios.get(`https://www.omdbapi.com/?i=${imdb}&apikey=982ff953`).then(
      (response) => {setDetail(response.data.Plot)
        setShow((prev) => !prev);
      }
    )
  }

  return (
    <div className='bodyy'>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
        className='searchBox'
      />
      <button onClick={dataFetch}>Search</button>

      <h2>Results: </h2>
      <div >
      {results.length !== 0 && (
        <div className="grid">
          {results.map((movie, index) => {
          return <div className='mobi' id={movie.imdbID} onClick={() =>details(movie.imdbID)}>
            <img src={movie.Poster} alt="poster" />
            <h3>{movie.Title}</h3>
            <h3>Realease year: {movie.Year}</h3>
            <p>{show &&(movie.imdbID === cindex)&&detail}</p>
            </div>
      })}
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchBar;
