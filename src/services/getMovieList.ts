export async function getMovieList() {
  const response = await fetch("./src/api/movies.json");
  const movieList = await response.json();
  return movieList;
}
