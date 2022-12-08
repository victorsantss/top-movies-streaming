export async function getMovieProviders(imdb_id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${imdb_id}/watch/providers?api_key=817bc93f0361c0bdcb9ae9a48e053d3a&language=en-US&watch_region=BR`
    );
    const movieDetails = await response.json();

    return movieDetails.results.BR?.flatrate
      ?.map((item: any) => item.provider_name)
  } catch (e) {
    console.log(e);
  }
}
