'use client';
import styles from '../styles/movie-tab.module.css'
import { useState } from 'react';
import { Suspense } from 'react';
import MovieVideos from './movie-videos';
import MovieCredit from './movie-credits';
import MovieRelated from './movie-related';

//Tab 클릭 시 컴포넌트 변경
export default function MovieTab ({id}:{id:string}){
    const [activeTab, setActiveTab] = useState('Trailer');

    return(
            <div>
                <div className={styles.container}>
                    {['Trailer', 'Credits', 'Related'].map((tab) => (
                        <h2
                        // 3가지 탭 map으로 순회
                            key={tab}
                        // 클릭한 탭만 state 전송
                            onClick={()=> setActiveTab(tab)}
                        // 일반 탭은 .tab class 적용, state 전송 탭은 .active class 적용
                            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                        >
                            {tab}
                        </h2>
                    ))}
                </div>
                {activeTab === 'Trailer' && <MovieVideos id={id}/>}
                {activeTab === 'Credits' && <MovieCredit id={id}/>}
                {activeTab === 'Related' && <MovieRelated id={id}/>}
            </div>
    )
}