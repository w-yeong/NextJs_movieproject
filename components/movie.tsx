//home에 각 영화포스터 및 이름이 반환되게

//useRouter사용시 use client 필수 필요
"use client";

import Link from "next/link";
import styles from "../styles/movie.module.css";
//useRouter 사용시 next/navigation으로 바꿔야 함.
import { useRouter } from "next/navigation";

interface IMovieProps {
    title : string,
    id : string,
    poster_path : string,
}

export default function Movie({title, id, poster_path} : IMovieProps){
    //페이지이동 위한 hooks
    const router = useRouter();
    //해당 경로로 무조건 이동함.
    const onClick = () => {
        router.push(`/movies/${id}`)
    }
    return (
    <div className={styles.movie}>
        <img src={poster_path} alt={title} onClick={onClick}/>
        {/* prefetch 추가 : 클릭 전 미리 fetch하는 것, 로딩을 매우 줄임 */}
        <Link prefetch href={`/movies/${id}`}>{title}</Link>
    </div>)
}