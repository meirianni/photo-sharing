import { getToken } from "@/utils/token";
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../redux/slice/authSlice.js';
import { useEffect, useState } from 'react';

const ListFollowers = () => {

    const token = getToken()
    // console.log(token, "ini listfollowing");
    const dispatch = useDispatch();
    const { data, loading, error , id} = useSelector((state) => state.storeAuth);

     useEffect(() => {
        dispatch(getData("get", 'my-following?size=10&page=1', token));
      }, [dispatch]);
      
    return( <>
    
    <div className="flex flex-col items-start w-4/6">
    <div className=" flex w- h-28 flex-nowrap">
        {data.map((item) => (
        <div className="flex justify-start p-2 flex-col items-center mt-2">
            <img src={item.profilePictureUrl} alt="" 
            className="h-16 rounded-full w-16"/>
            <p className="p-1 text-sm font-medium">{item.username}</p>
        </div>
        ))}
    </div>

    

    

     
    </div>
    </>)
}


export default ListFollowers