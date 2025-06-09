import { Suspense } from "react";
import { API_URL } from "../../../../lib/constants";
import MovieInfo, { getMovies } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

//Next.js 데이터 페칭 관련 함수는 async 함수여야 하고,그 파라미터인 params, searchParams도 비동기 처리 흐름에 맞게 받게 바뀜
//Promise를 반환하는 타입으로 변경된 경우 존재
//본래 params는 동기적인 객체였으나, Nextjs15부터 비동기로 바뀌며 Promise가 필요하게 됨.
interface IParams {
    params: Promise<{id:string}>;
}

//generateMetadata 함수는 NextJS 내장 함수로, 동적메타데이터를 반환할 때 사용
export async function generateMetadata({params}:IParams){
    // params가 Promise일 수도 있으니 await 처리
    const {id} = await params;
    // getMovies라는 fetch데이터 생성하는 함수를 호출하여 사용
    const movie = await getMovies(id);
    return {
        title : movie.title,
    };
}

export default async function MovieDetail({params}:IParams) {
    const {id} = await params;
    return <div>
        {/* Suspense : await 될 동안은 fallback을 return, await 끝나면 바로 데이터 반환 */}
        <Suspense fallback={<h1>Loading movie info</h1>}>
            <MovieInfo id={id}/>
        </Suspense>
        <Suspense fallback={<h1>Loading movie videos</h1>}>
            <MovieVideos id={id}/>
        </Suspense>
    </div>
}