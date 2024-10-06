import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import { useState , useEffect} from "react";

import { getToken } from "@/utils/token";
import { getDataApi, PostDataApi } from '@/utils/api';
import Image from 'next/image'; 

const UserProfile = () => {
  const router = useRouter();
  const token = getToken()
  const { idUserProfile } = router.query; 
  const [dataUser, setDataUser] = useState("")
  const [follow, setFollow] = useState('')
  const [isFollowed, setIsFollowed] = useState({})
  const getDataUser = async () => {
    const data = await getDataApi("get", `user/${idUserProfile}`,token)
    setDataUser(data)
  }
  const bodyFollow = {
    "userIdFollow" : idUserProfile
  }

  const handleFollow = () => {
    postFollowUser()
  }
  const postFollowUser = async () => {
    const data = await PostDataApi("post", `follow`,bodyFollow,token)
    setIsFollowed(data)
    if(followUser) {
        setFollow(true) 
    }
  }


  useEffect(() => {
    getDataUser()
}, [idUserProfile])

// console.log(followUser, "dataUser");


  return (
    <div className='flex flex-row'>
      <Navbar />
      <div className='w-full flex flex-col ml-20 mr-20'>
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
            <button className={`${isFollowed ? 'bg-main' : 'bg-blue-500'} p-3 rounded-sm h-8 text-sm w-16 flex items-center hover:bg-hover `}
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
     
    </div>
  );
};

export default UserProfile;
