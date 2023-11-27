import { useState,useEffect } from "react";

const PREFIX="codewrite-"

export default function useLocalStorage(key,initialValue)
{
    const preFixedKey= PREFIX + key;

    //  By checking localStorage first and falling back to initialValue,
    //  you ensure that the component can be initialized with either persisted state
    //  from a previous session (if available in localStorage) or a 
    // predefined initial state.
    //  This approach is often used to create components that can remember 
    // their state between page reloads, making the user experience more seamless.

    const [value,setValue]=useState(()=>
    {
        const jsonValue=localStorage.getItem(preFixedKey);

        if(jsonValue!=null) return JSON.parse(jsonValue)

        if(typeof initialValue==='function')
        {
            return initialValue()
        }
        else{
            return initialValue
        }
    })


    useEffect(()=>{
        localStorage.setItem(preFixedKey,JSON.stringify(value))
    },[value,setValue]);

    return [value,setValue]
    
}
