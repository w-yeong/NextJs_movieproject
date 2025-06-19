'use client';
import FetchingData from "./movie-fetching"
import styles from "../styles/movie-videos.module.css"
import { useState } from "react";

//영화 예고편, 티저 fetching하기
const fetcher = (url : string) => fetch(url, { cache: "force-cache" }).then(res => res.json());

//기존엔 서버컴포넌트였으나, movie-tab(반응형 탭, 클라이언트 컴포) 내 import로 인해 movie-videos도 클라이언트 컴포넌트 형태로 수정
export default function MovieVideos({id} : {id:string}) {
    // 기존엔 async - await 형식이였는데, 현재는 useEffect와 state로 관리
    const [videos, setvideos] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    return (
        <div className={styles.container}>
            <FetchingData 
                id={id}
                fallbackData = {videos}
                onSuccess={(data)=> setvideos(data)}
                onError={(err)=> setError(err)}
                channel = 'videos'
            />
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