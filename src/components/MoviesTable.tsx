import { useContext, useEffect, useState } from "react";
import { FilterByProviderContext } from "../context/FilterByProviderContext";
import { getMovieProviders } from "../services/getMovieProviders";
import { getMoviesList } from "../services/getMoviesList";

interface Movie {
  position: number;
  title: string;
  rating: number;
  imdb_id: string;
  providers: [string];
}

export default function MoviesTable() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const { providerState }: any = useContext(FilterByProviderContext);
  const providerStateArray = providerState?.split(",");

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
        {movieList
          .filter((movie) => {
            if (providerState) {
              return providerStateArray.some((provider: string) =>
                movie.providers?.includes(provider)
              );
            }
            return movie;
          })
          .map((movie) => (
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