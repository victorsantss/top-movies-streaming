import "./App.css";
import MoviesTable from "./components/MoviesTable";
import WatchProvidersFilter from "./components/WatchProvidersFilter";

function App() {
  return (
    <div className="App">
      <h1>IMDB TOP 250 ON STREAMING</h1>
      <WatchProvidersFilter />
      <MoviesTable />
    </div>
  );
}

export default App;
