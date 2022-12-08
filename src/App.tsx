import { useEffect, useState } from "react";
import "./App.css";
import { getMovieDetail } from "./services/getMovieDetail";
import { getMovieList } from "./services/getMovieList";

interface Movie {
  position: number;
  title: string;
  rating: number;
  imdb_id: string;
  providers: any;
}

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const getMovieListData = async () => {
    const data = await getMovieList();
    setMovieList(data);
    updateMovieListData(data);
  };

  const updateMovieListData = async (list: []) => {
    const providers = await Promise.all(
      list.map((movie: Movie) => {
        return getMovieDetail(movie.imdb_id);
      })
    );

    setMovieList((movies) => {
      return movies.map((movie, index) => {
        return { ...movie, providers: providers[index] };
      });
    });
  };

  useEffect(() => {
    getMovieListData();
  }, []);

  return (
    <div className="App">
      <h1>TOP 250 ON STREAMING</h1>
      {movieList?.map((movie) => (
        <table key={movie.position}>
          <thead>
            <tr>
              <th>Position</th>
              <th className="title-box">Title</th>
              <th>Rating</th>
              <th>Streaming Services</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{movie.position}</td>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
              <td>{movie.providers ? movie.providers[0] : "No streaming."}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default App;
