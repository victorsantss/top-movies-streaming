interface MovieProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export async function getMovieProviders(imdb_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${imdb_id}/watch/providers?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&watch_region=BR`
    );
    const movieDetails = await response.json();
    return movieDetails.results.BR?.flatrate
      ?.map((item: MovieProvider) => item.provider_name)
  } catch (e) {
    console.log(e);
  }
}
