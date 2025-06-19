
'use client';
import FetchingData from "./movie-fetching";
import { useState } from "react";
import styles from "../styles/movie-related.module.css";
import RelatedSlider from "./related-slider";

export default function MovieRelated ({id}:{id:string}){
    const [related, setRelated] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    return (
        <div className={styles.entire}>
            <h2>Similar customers also watched</h2>
            {/* 화살표로 좌우 스크롤 */}
                <FetchingData
                    id={id}
                    fallbackData={related}
                    onSuccess={(data)=> setRelated(data)}
                    onError={(err)=> setError(err)}
                    channel="similar"
                />
                {error && <h1>Failed to load Related</h1>}
                {!error && related.length === 0 && <h1>Loading movie Related</h1>}
            
                <RelatedSlider related={related}/>
            </div>
        
    )
}