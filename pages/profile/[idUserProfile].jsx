import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import { useState , useEffect} from "react";
import { getToken } from "@/utils/token";
import { getDataApi, PostDataApi } from '@/utils/api';
import Image from 'next/image'; 
import love from "../../public/img/love.png"
import ModalPost from '@/components/modalPost';
import Cookies from 'js-cookie';
import { ErrorAlert } from '@/utils/alert';
import { getCookie } from 'cookies-next';

export const getServerSideProps = ({ req, res }) => {
  const token = getCookie('token', { req, res });

  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // pass any required props here
  };
};
const UserProfile = () => {
  const router = useRouter();
  const token = getToken()
  const [loading, setLoading] = useState(false); // State for loading status
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const { idUserProfile } = router.query; 
  const [dataUser, setDataUser] = useState("")
  const [follow, setFollow] = useState('')
  const [isFollowed, setIsFollowed] = useState({})
  const [getPostId, setGetPostId] = useState([])
  const [selectedPost, setSelectedPost] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const userId = Cookies.get('userId'); 
  const getDataUser = async () => {
    const data = await getDataApi("get", `user/${idUserProfile}`,token)
    setDataUser(data)
  }
  const getDataPostById = async () => {
    try {
        const data = await getDataApi("get", `users-post/${idUserProfile}?size=${size}&page=${page}`,token)
        if (Array.isArray(data?.posts)) {
            setGetPostId((prevPosts) => [...prevPosts, ...data.posts]);
        } else {
            console.error("Expected an array for posts, but got:", data?.posts);
        }
    } catch (error) {
        setLoading(false);
    }finally{
        setLoading(false); 
    }


  }
  const bodyFollow = {
    "userIdFollow" : idUserProfile
  }

  const handleFollow = () => {
    // if ()
    postFollowUser()
  }
  const postFollowUser = async () => {
    try {
      const data = await PostDataApi("post", `follow`,bodyFollow,token)
      setIsFollowed(data)
      setIsSuccess(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
         setIsSuccess(false);
       }, 3000);
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred, please try again!";

            setErrorMessage(message); // Set the custom error message
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
    }
   
    
  }


  useEffect(() => {
    getDataUser()
    getDataPostById()
}, [idUserProfile])


useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Current scroll position
      const windowHeight = window.innerHeight; // Height of the viewport
      const documentHeight = document.documentElement.scrollHeight; // Total height of the document

      if (scrollY + windowHeight >= documentHeight - 100 && !loading ){// Load more data when near bottom
        setPage((prevPage) => prevPage + 1); // Increment page number
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, idUserProfile]);

  const openModal = (post) => {
    setSelectedPost(post); // Set the selected post data
    setIsModalVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPost(null); // Clear the selected post data
  };

  return (

    
    <div className='flex flex-row'>
      {errorMessage && <ErrorAlert message={typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)} />}
      <Navbar />
      <div className='flex flex-col w-full ml-20 mr-20'>
      <div className='w-full flex flex-col '>
      <div className='mt-10 flex justify-start'>
        <div className="relative w-36 h-36 mr-20 rounded-full overflow-hidden border-4 border-gray-200">
        <img src={dataUser?.profilePictureUrl} alt="" />
        </div>
        <div className="md:mt-0 md:ml-10 text-center md:text-left">
        <div className='relative flex flex-row'>
            <div className=''>
            <h1 className="text-2xl font-semibold">{dataUser?.username}</h1>
            <p className="text-sm">{dataUser?.name}</p>
            </div>
            <div className='ml-14 mt-2'>
            <button className={`${isFollowed && userId == idUserProfile ? 'bg-main hidden' : 'bg-blue-500'} p-3 rounded-sm h-8 text-sm w-16 flex items-center hover:bg-hover `}
            onClick={handleFollow} >Follow</button>
            </div>
        </div>
       
        
        {/* Stats */}
        <div className="flex mt-4 space-x-8">
            <div>
            <span className="font-semibold">14.245</span>
            <p>Kiriman</p>
            </div>
            <div className='text-center'>
            <span className="font-semibold">{dataUser?.totalFollowers}</span>
            <p>Followers</p>
            </div>
            <div className='text-center'>
            <span className="font-semibold">{dataUser?.totalFollowing}</span>
            <p>Following</p>
            </div>
        </div>

        {/* Description */}
        <div className="mt-4">
            <p className="text-gray-700">
            Bio : {dataUser?.bio} 
            </p>
            <p className="text-gray-700">
            Website : {dataUser?.website} 
            </p>
        </div>
        </div>
        </div>
      </div>
        <div className='grid grid-cols-3 gap-1 mt-2'>
            {getPostId.map((item, index) => (
                <div key={item.id} className='bg-white bg-cover relative hover:grayscale'
                onClick={() => openModal(item)}>
                    <img src={item?.imageUrl} 
                     onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = 'https://images.unsplash.com/photo-1695669882447-1de80022ff21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8anVzdGluJTIwYmllYmVyfGVufDB8fDB8fHww'; // Set a fallback image
                    }}
                     alt="" />
                     <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                        <img src="/img/love.png" alt="okk" />
                        <p>{item?.totalLikes}</p>
                    </div>
                    
                </div>
                
            ))}
        </div>
        <ModalPost 
            isVisible={isModalVisible} 
            onClose={closeModal} 
            post={selectedPost} // Pass selected post data to the modal
        />
      </div>
    
    </div>
  );
};

export default UserProfile;
