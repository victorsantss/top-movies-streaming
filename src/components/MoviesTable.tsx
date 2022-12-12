import { useEffect, useState } from "react";
import { getMovieProviders } from "../services/getMovieProviders";
import { getMoviesList } from "../services/getMoviesList";

interface Movie {
  position: number;
  title: string;
  rating: number;
  imdb_id: string;
  providers: any;
}

export default function MoviesTable() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const getMovieListData = async () => {
    const data = await getMoviesList();
    setMovieList(data);
    getMovieProviderDetails(data);
  };

  const getMovieProviderDetails = async (list: []) => {
    const providers = await Promise.all(
      list.map((movie: Movie) => {
        return getMovieProviders(movie.imdb_id);
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
    <table>
      <thead>
        <tr>
          <th className="position-box">Position</th>
          <th className="title-box">Title</th>
          <th className="rating-box">Rating</th>
          <th className="providers-box">Streaming Services</th>
        </tr>
      </thead>
      <tbody>
        {movieList?.map((movie) => (
          <tr key={movie.position}>
            <td title="Position">{movie.position}</td>
            <td title="Title">{movie.title}</td>
            <td title="Rating">{movie.rating}</td>
            <td title="Streaming Providers">{movie.providers ? movie.providers.join(", ")
              : <p className="no-streaming-msg">No streaming providers</p>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}