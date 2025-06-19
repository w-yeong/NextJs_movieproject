
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
        {error && <h1>Failed to load credits</h1>}
        {/* credits에 아무 데이터도 없을 때 발동 */}
        {!error && credits.length === 0 && <h1>Loading movie credits</h1>}
        {credits.map((credit) => (
            <div key={credit.id} >
                {/* 이미지 불러올 땐 public/ 경로는 빼야함. */}
                <img src={credit.profile_path ? credit.profile_path : "/images/blank_profile.png"}/>
                <p>{credit.name}</p>
            </div>
        ))}
    </div>
    )
}