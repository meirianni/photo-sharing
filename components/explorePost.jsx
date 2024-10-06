
import { getDataApi } from "@/utils/api";
import { getToken } from "@/utils/token";
import Link from "next/link";
import { useState , useEffect} from "react";



const ExplorePost = () => {
    const [isClient, setIsClient] = useState(false);
    const token = getToken()
    const [size, setSize] = useState("10")
    const [page, setPage] = useState(1)
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(false); // State for loading status


    const getDataPost = async () => {
        setLoading(true);
        try {
            setIsClient(true);
           const dataPost =  await getDataApi("get",`explore-post?size=${size}&page=${page}`, token)
        //    setPost(dataPost?.posts)
        if (dataPost?.posts) {
            setPost((prevPosts) => [...prevPosts, ...dataPost.posts]);
          }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
            
      };
    useEffect(() => {
        getDataPost()
    }, [page])

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
      }, [loading]);

      
    
    return (
        <>
        {post.map((item, key) => (
            <div key= {key} className="mt-2 ml-9 mr-9">
            <div className="max-w-fullh-[625px] mt-5">
                <div className="">
                    <Link href={`/profile/${item?.user?.id}`}>
                    <div className="flex flex-row items-center">
                        <img src={item?.user?.profilePictureUrl}alt="" 
                        className="h-12 rounded-full w-12"
                        onError={(e) => {
                            e.target.onerror = null; // Prevents looping
                            e.target.src = 'https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFufGVufDB8fDB8fHww'; // Set a fallback image
                        }}/>
                        <p className="ml-2">{item?.user?.username == null ? 'Afk Dummy' : item?.user?.username}</p>
                    </div>
                    </Link>
                    <div className="mt-2 h-full">
                    <div className="h-full w-full">
                    <img
                        src={item?.imageUrl}
                        alt=""
                        className="w-full h-full"
                        onError={(e) => {
                            e.target.onerror = null; // Prevents looping
                            e.target.src = 'https://images.unsplash.com/photo-1695669882447-1de80022ff21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8anVzdGluJTIwYmllYmVyfGVufDB8fDB8fHww'; // Set a fallback image
                        }}
                    />
                    </div>
                </div>
                <div className="mt-2 ">
                    <div className="flex flex-row">
                        <img src="img/love.png" alt=""  className="w-7 h-7"></img>
                        <p className="ml-1">{item?.totalLikes}</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="font-bold">
                        {item?.user?.username == null ? 'Afk Dummy' : item?.user?.username}</p>
                       <p className="ml-1">{item?.caption}</p> 
                    </div>
                </div>

                </div>
            </div>
        </div>
        ))}
       
        </>
    )
}

export default ExplorePost