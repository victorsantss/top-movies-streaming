export async function getMoviesList() {
  const response = await fetch("./movies.json");
  const movieList = await response.json();
  return movieList;
}
