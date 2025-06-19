import { useRef } from "react";
import styles from "../styles/movie-related.module.css";

export default function RelatedSlider({related}){
        const scrollRef = useRef(null);
    
        const scrollLeft = () => {
            // scrollBy: 현재 위치 기준으로 스크롤 이동
            // useRef를 사용하는 이유 : 스크롤 위치가 계속 변동되기 때문에 '현재 위치'를 이어나가기 위해서
                if(scrollRef.current){
                scrollRef.current.scrollBy({left: -200, behavior: 'smooth'})};
        };
    
            const scrollRight = () => {
                //if를 쓰는이유 : scrollRef가 null 상태일 때 scrollBy를 호출하려 하면 error
                if(scrollRef.current){
                    scrollRef.current.scrollBy({left: +200, behavior: 'smooth'})};
        };

        const leftArrow = <img src="/images/arrow_left.png" alt="왼쪽화살표" />
        const rightArrow = <img src="/images/arrow_right.png" alt="오른쪽화살표" />

        return (
            <div className={styles.sliderWrapper}>
                <button onClick={scrollLeft} className={styles.arrowLeft}
                >{leftArrow}</button>

                <div ref={scrollRef} className={styles.container}>

                    {related.map((relate)=>(
                        // poster_path가 있을 경우에만 아래 코드 작동
                        relate.poster_path && (
                        <div key={relate.id} className={styles.card}>
                            <div className={styles.img_wrapper}>
                                <img src={relate.poster_path}/>
                            </div>
                            <p>{relate.title}</p>
                        </div>
                        )
                    ))}
                </div>
                
                <button onClick={scrollRight} className={styles.arrowRight}
                >{rightArrow}</button>
            </div>
        )}