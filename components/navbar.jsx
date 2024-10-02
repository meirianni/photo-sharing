import Link from "next/link"
import Search from "./search"
import { useState , useEffect} from "react";
import { getToken } from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataUser } from "@/redux/slice/authSlice";
import Cookies from 'js-cookie';


const Navbar = () => {
    const [isClient, setIsClient] = useState(false);
    const token = getToken()
    const dispatch = useDispatch()
    const { data, loading, error} = useSelector((state) => state.storeAuth);

    useEffect(() => {
            const userId = Cookies.get('userId'); 
            setIsClient(true);
            dispatch(getData("get", `user/${userId}`, token));
    },[dispatch]);

   
    if (!isClient) {
        return null; 
    }
    
    return( <>
    {/* default */}
    <div className="fixed bottom-0 left-0 right-0 h-14 border border-gray-300 block sm:hidden md:hidden">
        <div className="navbar flex justify-around items-center p-2">
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7 m-1"
                        src="img/home.png" alt="" />
                        <p className="text-xl ml-3 hidden md:block sm:hidden">Home</p>
                    </div>
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <img className="rounded-full w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7 m-1"
                        src={data.profilePictureUrl} alt="Profil" />
                        {/* <p className="text-xl ml-3">Profil</p> */}
                    </div>
                </div>
    </div>
    <div className="fixed top-0 left-0 right-0 h-14 border border-gray-300 block sm:hidden md:hidden">
        <div className="navbar flex justify-between items-center p-3">
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <p className="text-xl">Pototok</p>
                    </div>
                    <label htmlFor="input"></label>
                    <input
                        type="text"
                        id="input"
                        className="border border-gray-200 p-1 rounded w-64" // Add these classes for styling
                        placeholder="Search..." // Optionally add a placeholder
                    />
         </div>
    </div>

    {/* sm md */}
    <div className="hidden sm:block md:block">
    <div className="flex flex-row text-inter bottom-0 items-center  ">
        {/* <p>mei</p> */}
        <div className="md:w-64 h-lvh  md:ml-9 p-2">
            <div className="flex mt-8">
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3">
                    <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7"
                    src="img/logo.png" alt="" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Pototok</p>
                </div>
            </div>
            <div className="navbar mt-10">
                
                
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3">
                    <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7"
                    src="img/home.png" alt="" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Home</p>
                </div>
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3 mt-3">
                    <img className="w-7 h-7"
                    src="img/search.png" alt="" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Search</p>
                </div>
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3 mt-3">
                    <img className="rounded-full w-7 h-7"
                    src={data.profilePictureUrl}  alt="Profil" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Profil</p>
                </div>
            </div>

            <div className="flex mt-64 items-center ">
                <p className="rotate-90 p-2 mr-3 font-bold text-xl	">|||</p>
                <p className="text-xl ml-3 hidden md:block sm:hidden">Lainnya</p>
            </div>
        </div>
        
        <div className="bg-gray-50 w-1 h-lvh">
        </div>
            
    </div>

    </div>

    
    </>)
}


export default Navbar