import { useEffect, useState } from 'react'
import './App.css'
import { getMovieDetail } from './services/getMovieDetail'
import { getMovieList } from './services/getMovieList'

interface Movie {
  position: number,
  title: string,
  rating: number,
  imdb_id: string,
  providers: any;
}

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [movieListUpdated, setMovieListUpdated] = useState<Movie[]>([])

  const getMovieListData = async () => {
    const response = await getMovieList()
    setMovieList(response)
  }

  const updateMovieListData = async () => {
    await getMovieListData();
    const updatedMovieList = await Promise.all(movieList.map(movie => {
      return (({ ...movie, providers: getMovieDetail(movie.imdb_id) }))
    }))
    setMovieListUpdated(updatedMovieList)
  }

  const execute = async () => {
    updateMovieListData();
  }

  useEffect(() => {
    execute();
  }, [])

  console.log(movieListUpdated)

  return (
    <div className="App">
      <h1>TOP 250 ON STREAMING</h1>
      {movieListUpdated?.map(movie => (
        <table key={movie.position}>
          <thead>
            <tr>
              <th>Position</th>
              <th className='title-box'>Title</th>
              <th>Rating</th>
              <th>Streaming Services</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{movie.position}</td>
              <td>{movie.title}</td>
              <td>{movie.rating}</td>
              <td>{movie.providers[0]}</td>
            </tr>
          </tbody>
        </table>
      ))}

    </div>
  )
}

export default App
