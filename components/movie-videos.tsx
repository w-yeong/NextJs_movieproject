import { API_URL } from "../lib/constants";
import styles from "../styles/movie-videos.module.css";

//영화 예고편, 티저 fetching하기
async function getVideos(id:string){
    console.log(`Fetching videos:${Date.now()}`)
    //await new Promise((resolve)=> setTimeout(resolve, 3000));
    const response = await fetch(`${API_URL}/${id}/videos`,{
        cache: "force-cache",
    })
    return response.json();
}

export default async function MovieVideos({id} : {id:string}) {
    const videos = await getVideos(id);
    return (
        <div className={styles.container}>
            {videos.map((video) => 
                // iframe : 다른 웹페이지, 영상, 문서 등을 삽입할 수 있는 태그
                // embed : 웹사이트에 삽입가능한 전용 플레이어 형식의 URL
                <iframe key={video.id} 
                src={`https://www.youtube.com/embed/${video.key}`}
                //iframe 내부에서 허용할 기능 지정(기울기감지,자동재생,클립보드 기능, 저작권보호콘텐츠 미디어 재생허용, 기기회전감지허용, pip모드)
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                //전체화면모드 허용
                allowFullScreen
                title={video.name}
                />)}
        </div>
    )};