import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState("AIzaSyA1Maop5HcVjA_sgl5jfQmbxaeJSqdJmzA");

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey  + "&maxResults=30" 
      )
      .then(data => {
        console.log(data.data.items);
        setResult(data.data.items)
      });
 
  }

  return (
    <div class="container">
      <h1>Busque um Livro</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Faça sua busca"
            EventHandler
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Search
        </button>
      </form>

      {result.map(book => (
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
