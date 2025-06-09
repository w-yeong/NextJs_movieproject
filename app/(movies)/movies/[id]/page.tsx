import { Suspense } from "react";
import { API_URL } from "../../../../lib/constants";
import MovieInfo, { getMovies } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

interface IParams {
    params:{id:string};
}

//generateMetadata 함수는 NextJS 내장 함수로, 동적메타데이터를 반환할 때 사용
export async function generateMetadata({params : {id}}:IParams){
    // getMovies라는 fetch데이터 생성하는 함수를 호출하여 사용
    const movie = await getMovies(id);
    return {
        title : movie.title,
    };
}

export default async function MovieDetail({
    params:{id},
    }:IParams) {
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