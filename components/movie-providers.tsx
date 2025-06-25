import { API_URL } from "../lib/constants";
import styles from "../styles/movie-related.module.css";

export async function getProviders(id:string){
    const response = await fetch(`${API_URL}/${id}/providers`,{
        cache: "force-cache",
    })
    return response.json();
};

const ott = <img src="/images/ott.png" alt="ott"/>

interface providerProps {
    id : string;
    className : string;
}

export default async function Providers ({id, className}:providerProps) {
    const provider = await getProviders(id);
    console.log("Provider 데이터:", provider);
    const countryCodes = Object.keys(provider);
    console.log("Country Codes:", countryCodes);
    const firstCountry = countryCodes[0];


    // 만약 provider API에 아무 내용도 없을 경우 방지
    if(!firstCountry){
        return null;
    }

    const link = provider[firstCountry]?.link;

    // 만약 provider API에 아무 내용도 없을 경우 방지
    if(!link){
        return null;
    }

    return(
        <>
            <a className={className}
                href={link}
                target={"_blank"}
                rel="noopener noreferrer"
            >

            </a>
        </>
    )
}