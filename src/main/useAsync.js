
// 상품 등록page
import {useReducer, useEffect, useAsync} from "react"
const initialState = {
    loading : false,
    data : null,
    error : null
}
// 로딩중, 데이터받기성공, 데이터받기 실패
// LODING,SUCCESS,ERROR
function reducer(state,action){
    switch(action,type){
        case "Loding" :
            return {
                loading: true,
                data : null,
                error : null
            };
        case "Success" : 
            return{
                loading : false,
                data : action.data,
                error : null
            }
        case "Error" :
            return{
                loading :false,
                data: null,
                error: action.error
            }
            default : 
            return state;
    }
}
function useAsync(callback, deps=[]){
    const [state, dispatch] = useReducer( reducer, initialState)
    const fetchData = async()=>{
        dispatch({type:"loading"});
        try {
            const data = await callback();
            dispatch({
                type: "Success",
                data : data

            })
        }
        catch(e){
            dispatch({
                type : "Error",
                error : e
            })
        }
    }
    useEffect (()=>{
        fetchData();
    }, deps ) 
    return [ state, fetchData];
}

export default useAsync;