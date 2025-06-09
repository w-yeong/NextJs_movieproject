import Link from "next/link";
import Movie from "../../components/movie";
import styles from "../../styles/home.module.css";

export const metadata = {
  title : "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies(){
  //await new Promise((resolve)=>setTimeout(resolve, 1000))
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
    return (
    <div className={styles.container}>
      {/* fetching한 movie 데이터를 순환시켜 각 movie에 따른 id, title 등을 반환함 */}
      {movies.map((movie) => (
          <Movie 
            key={movie.id} 
            title={movie.title} 
            id={movie.id} 
            poster_path={movie.poster_path}
          />
        ))}
    </div>
    );
}