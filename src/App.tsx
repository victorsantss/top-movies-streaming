import { useContext, useMemo, useState } from "react";
import "./App.css";
import MoviesTable from "./components/MoviesTable";
import WatchProvidersFilter from "./components/WatchProvidersFilter";
import { FilterByProviderContext } from "./context/FilterByProviderContext";

function App() {
  const [providerState, setProviderState] = useState(null);

  const providerValue = useMemo(() => ({
    providerState, setProviderState
  }), [providerState, setProviderState]);

  return (
    <div className="App">
      <FilterByProviderContext.Provider value={providerValue}>
        <h1>IMDB TOP 250 ON STREAMING</h1>
        <WatchProvidersFilter />
        <MoviesTable />
      </FilterByProviderContext.Provider>
    </div>
  );
}

export default App;
