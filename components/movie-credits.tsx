
'use client';
import FetchingData from "./movie-fetching";
import { useState } from "react";
import styles from "../styles/movie-credits.module.css";

export default function MovieCredit({id}:{id:string}){
    const [credits, setCredits] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    return (
    <div className={styles.container}>
        <FetchingData 
            id={id}
            fallbackData = {credits}
            onSuccess={(data)=> setCredits(data)}
            onError={(err)=> setError(err)}
            channel = 'credits'
        />
        {/* style 별도로 class 없이 지정하고 싶을 때 사용 */}
        {error && <h1 style={{ width: "80%" }}>Failed to load credits</h1>}
        {/* credits에 아무 데이터도 없을 때 발동 */}
        {!error && credits.length === 0 && <h1>Loading movie credits</h1>}
        {credits.map((credit) => (
            // 같은 배우가 다른 배역시 id가 중복되는 경우 발견, 이에 캐릭터명까지 key에 넣어 중복으로 인식 방지
            <div key={`${credit.id}-${credit.character}`} >
                {/* 이미지 불러올 땐 public/ 경로는 빼야함. */}
                <img src={credit.profile_path ? credit.profile_path : "/images/blank_profile.png"}/>
                <p className={styles.role}>{credit.character}</p>
                <p className={styles.name}>{credit.name}</p>
            </div>
        ))}
    </div>
    )
}