'use client';
import { useState, useEffect } from "react";
import { API_URL } from "../lib/constants";
import useSWR from "swr";

//crdetid fetching하기
const fetcher = (url : string) => fetch(url, { cache: "force-cache" }).then(res => res.json());

interface Props {
    id:string,
    onSuccess: (data:any[])=>void;
    onError?: (error:any)=>void;
    fallbackData? : any[];
    channel:string,
}

export default function FetchingData({id, onSuccess, onError, fallbackData = [], channel}:Props){

    const {data, error} = useSWR(`${API_URL}/${id}/${channel}`, fetcher, {
            //이미 받아온 데이터로 초기화
            fallbackData,
            //2분동안 중복 요청을 막고 캐시된 데이터 사용
            dedupingInterval: 120000,
            //탭이 포커스를 다시 얻었을 때 자동으로 데이터를 재요청하지 않음.
            revalidateOnFocus: false
            });

    useEffect(()=>{
        if(data){
            onSuccess(data);
        }
    },[data, onSuccess]);

    useEffect(()=>{
        if(error&&onError){
            onError(error);
        }
    },[error, onError]);    

    return null;
};