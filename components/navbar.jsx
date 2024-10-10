import Link from "next/link"
import Search from "./search"
import { useState , useEffect, useRef} from "react";
import { getToken } from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataUser } from "@/redux/slice/authSlice";
import Cookies from 'js-cookie';
import { getDataApi } from "@/utils/api";


const Navbar = () => {
    const [isClient, setIsClient] = useState(false);
    const token = getToken()
    const dispatch = useDispatch()
    const { data, loading, error} = useSelector((state) => state.storeAuth);
    const [isOpen, setIsOpen] = useState(false);
    const userId = Cookies.get('userId'); 
    
    const popupRef = useRef(null);
    useEffect(() => {
            setIsClient(true);
            dispatch(getData("get", `user/${userId}`, token));
    },[dispatch, userId, token]);
console.log(data, "data");

   
    useEffect(() => {
        const handleClickOutside = (event) => {
          // Check if the click is outside of the popupRef element
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        // Add event listener for clicks
        document.addEventListener('mousedown', handleClickOutside);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [popupRef]);

    if (!isClient) {
        return null; 
    }
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () =>  {
        await getDataApi("get", "logout", token)
    }
    
    return( <>
    {/* default */}
    <div className="fixed bottom-0 left-0 right-0 h-14 border border-gray-300 block sm:hidden md:hidden bg-white z-100">
        <div className="navbar flex justify-around items-center p-2">
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7 m-1"
                        src="/img/home.png" alt=""/>
                        <p className="text-xl ml-3 hidden md:block sm:hidden">Home</p>
                    </div>
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <img className="rounded-full w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7 m-1"
                        src={data.profilePictureUrl} alt="Profil" />
                        {/* <p className="text-xl ml-3">Profil</p> */}
                    </div>
                </div>
    </div>
    <div className="fixed top-0 left-0 right-0 h-14 border border-gray-300 block sm:hidden md:hidden bg-white z-100">
        <div className="navbar flex justify-between items-center p-3">
                    <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg">
                        <p className="font-bounce text-3xl font-bold ">Pototok</p>
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
    <div className="hidden sm:block md:block" >
    <div className="flex flex-row  bottom-0 items-center  ">
        {/* <p>mei</p> */}
        <div className="md:w-64 h-lvh  md:ml-9 p-2">
            <div className="flex mt-8">
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3">
                    <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7"
                    src="img/logo.png" alt="" />
                    <p className=" font-bounce text-3xl font-bold ml-3 hidden md:block sm:hidden">Pototok</p>
                </div>
            </div>
            <div className="navbar mt-10">
                
                <Link href="/home">
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3">
                    <img className="w-8 h-8 md:w-7 md:h-7 sm:h-7 sm:w-7"
                    src="img/home.png" alt="" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Home</p>
                </div>
                </Link>
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3 mt-3">
                    <img className="w-7 h-7"
                    src="img/search.png" alt="" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Search</p>
                </div>
                <Link href={`/profile/${userId}`}>
                <div className="flex flex-row items-center hover:bg-grey hover:rounded-lg p-2 mr-3 mt-3">
                    <img className="rounded-full w-7 h-7"
                    src={data.profilePictureUrl}  alt="Profil" />
                    <p className="text-xl ml-3 hidden md:block sm:hidden">Profil</p>
                </div>
                </Link>
            </div>

            <div className="flex mt-52 items-center hover:bg-grey relative inline-block" onClick={togglePopup}>
                <p className="rotate-90 p-2 mr-3 font-bold text-xl	">|||</p>
                <p className="text-xl ml-3 hidden md:block sm:hidden">Lainnya</p>
            </div>
            {isOpen && (
                <div className="absolute left-16 bottom-72 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"  ref={popupRef}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link href="/">
                    <p className="p-2" onClick={handleLogout}>Log Out</p>
                    </Link>
                </div>
                </div>
                )}
        </div>
        
        <div className="bg-gray-50 w-1 h-lvh">
        </div>
       
            
    </div>

    </div>

    
    </>)
}


export default Navbar