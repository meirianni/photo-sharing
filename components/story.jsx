import Link from "next/link"
import Search from "./search"
import { useState , useEffect} from "react";
import { getToken } from "@/utils/token";
import { useDispatch, useSelector } from "react-redux";
import { getData, getDataUser } from "@/redux/slice/authSlice";
import Cookies from 'js-cookie';
import Image from "next/image";
import ModalImage from "./modalImage";
import { postStory } from "@/redux/slice/storySlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getDataApi } from "@/utils/api";
import ExplorePost from "./explorePost";

const Story = () => {
    // toast.configure();
    const [isClient, setIsClient] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState(false);
    const [users, setUsers] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);


    const token = getToken()
    // console.log(token, "tokennn inii");
    
    const dispatch = useDispatch()
    const { data : storyData, loading: storyLoading, error: storyError } = useSelector((state) => state.story);
    const { data : userData, loading: userLoading, error: userError} = useSelector((state) => state.storeAuth);

    
    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    useEffect(()=> {
        const fetchStoryFollowing = async () => {
            try {
                const userId = Cookies.get('userId');
                setIsClient(true);
                await dispatch(getData('get', `following-story?size=10&page=1`, token));    
            } catch (error) {
                console.log(error, "error");
                
            }
          };
        const getUsers = async () => {
            try {
                const userId = Cookies.get('userId');
                // console.log(userId, "userId");
                
                setIsClient(true);
                const dataa = await getDataApi('get', `user/${userId}`, token)
                setUsers(dataa)

            } catch (error) {
            }
          };
          fetchStoryFollowing();
          getUsers()
          
    },[dispatch]);

    const handleImageUpload = async (formData) => {

        try {

            await dispatch(postStory('post', 'create-story', formData, token));

        // await dispatch(postStory('post', 'create-story', formData, token));
        console.log(response, "response");
        
        toast.success("success");
 
        } catch (error) {
            
        }
      };

    //   console.log(user, "user");
      
    return (
        <>
        <div className="flex flex-col w-3/6 mt-5">
            <div className="flex flex-row justify-start items-center 
            mt-16 sm:mt-2">
                <div className="relative  flex-col items-center ml-5 z-5">
                    <img src={users.profilePictureUrl} alt="" 
                    className="h-16 rounded-full w-16"/>

                    <div className="absolute bottom-5 right-1"v>

                    <button className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center" onClick={openModal}>
                    
                            <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                        />
                    </svg>
                
                    </button>

                    <div className="flex flex-wrap mt-4">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="m-2">
                            <img src={image.url} alt={image.caption} className="h-32 w-32 object-cover rounded" />
                            <p>{image.caption}</p>
                            </div>
                        ))}
                    </div>
                    <ModalImage isVisible={isModalVisible} onClose={closeModal} onSubmit={handleImageUpload} />

                    </div>
                    <div className="items-start mt-1">
                        <p className=" text-xs font-medium">{users.name}</p>
                    </div>

                </div>

                <div className="items-center ml-2">
                    <img src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D" alt="" 
                    className="h-16 rounded-full w-16"/>
                    <div className="items-start mt-1">
                        <p className=" text-xs font-medium">Chdcdarlie</p>
                    </div>
                </div>  
            </div>
            <hr className ="w-full"/>

            <div className="mt-2  h-full">
                    <ExplorePost />
            </div> 
        </div>
        </>
    )
}

export default Story