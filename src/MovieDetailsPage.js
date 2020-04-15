import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./MovieDetailsPage.css";
export default function MovieDetailsPage(props) {
  //   console.log("props", props);

  const [movie, setmovie] = useState(null);

  useEffect(() => {
    // console.log(props.match.params.id);
    const { id } = props.match.params;
    Axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a708a3fa64db6e6c5873d74cb5d71a8b`
    )
      .then((res) => {
        console.log(res.data);
        setmovie(res.data);
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.response.data.status_message);
      });
  }, []);
  if (!movie) return <div>Loading</div>;
  return (
    <div className="movie-root">
      <div className="left">
        <div className="header">
          <h2>{movie.title}</h2> ({movie.release_date})
        </div>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />

        <div className="tagline">{movie.tagline}</div>
      </div>

      <div className="right">
        <div className="tell">
          <span className="des-title">Overview</span>
          <span className="description">
            {": "} {movie.overview}
          </span>
        </div>
        <div className="tell">
          <span className="des-title">Rating</span>
          <span className="description">
            {": "}
            {movie.vote_average}/10 ({movie.vote_count} votes)
          </span>
        </div>
        <div className="tell">
          <span className="des-title">Language</span>
          <span className="description">
            {": "}
            {movie.spoken_languages[0].name}
          </span>
        </div>
        <div className="tell">
          <span className="des-title">Genres</span>
          <span className="genre">
            {": "}
            {movie.genres.map((genere) => (
              <span key={genere.id}>{genere.name}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
