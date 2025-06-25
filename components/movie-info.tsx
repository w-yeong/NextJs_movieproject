import { API_URL } from "../lib/constants";
import styles from "../styles/movie-info.module.css";
import Providers from "./movie-providers";

export async function getMovies(id:string){
    console.log(`Fetching movies:${Date.now()}`)
    //await new Promise((resolve)=> setTimeout(resolve, 5000));
    const response = await fetch(`${API_URL}/${id}`,{
        cache: "force-cache",
    })
    return response.json();
};

// const house = <img src="/images/house.png" alt="house"/>

export default async function MovieInfo ({id} : {id:string}) {
    const movie = await getMovies(id);
    return (
    <div className={styles.container}>
        <img src={movie.poster_path} className={styles.poster} alt={movie.title}/>
        <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.add}>
                <div className={styles.h3}>
                    <h3>⭐{movie.vote_average.toFixed(1)}</h3>
                    {/* &nbsp;은 non-breaking space로 원하는만큼 띄어쓰기 가능 */}
                    <h3>🕐{movie.runtime} min&nbsp; &nbsp;| </h3>
                </div>
                <div className={styles.genre}>
                    {/* map을 통해 genre.name으로 묶인 새로운 배열 생성["Drama","History"] */}
                    {/* Array.prototype.join()메서드를 통해 합치고 싶은 배열의 각 요소 사이 넣을 문자열을 설정, 그리고 문자화 */}
                    {/* "\u00A0\u00A0•\u00A0\u00A0"는 유니코드로 "  •  " 와 같다. */}
                    <p>{movie.genres.map((genre)=>genre.name).join("\u00A0\u00A0•\u00A0\u00A0")}</p>
                </div>
            </div>
            <p className={styles.p1}>{movie.overview}</p>

            <div className={styles.RoundTab}>
                <a 
                    href={movie.homepage}
                    className={styles.home}
                    // 새 창을 통해 영화 홈페이지로 이동
                    target={"_blank"}
                >
                </a>
                {/* 만약 className을 props로 전달하지 않으면 css구조가 이상해짐. 기존 경로대로는 적용이 안됨. */}
                <Providers id={id} className={styles.ott}/>
            </div>
        </div>
    </div>)
};