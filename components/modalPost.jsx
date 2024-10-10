import { ErrorAlert, SuccessAlert } from "@/utils/alert";
import { PostDataApi } from "@/utils/api";
import { getToken } from "@/utils/token";
import { useState ,useRef, useEffect} from "react";

const ModalPost = ({isVisible, onClose, post }) => {
    if (!isVisible) return null;
    const popupRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = getToken()
    const [formData, setFormData] = useState({
        postId : post?.id,
        comment : ""
    })
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is outside of the popup content
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          onClose(); 
        }
      };
      
      // Add event listener for clicks outside
      document.addEventListener('mousedown', handleClickOutside);
      
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [popupRef]);

    const handleInputClick = (e) => {
      e.stopPropagation();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value, // Set the value of the field that changed
        }));
      };

      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          await PostDataApi("post", "create-comment",formData, token )
          setIsSuccess(true);
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
      };

      console.log(errorMessage, "errorMessage", isSuccess);
      
    return (  
      <>
              {/* {isSuccess &&   <p>mooooooo</p>} */}
              {/* {errorMessage && <ErrorAlert message={typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)} />} */}
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
          
          <div ref={popupRef} className="relative bg-main p-8 rounded-lg shadow-lg w-5/6 mx-auto  ">
            <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
              X
            </button>
           <div className="grid grid-cols-2">
            <div className="w-full h-full">
                <img src={post.imageUrl} 
                 onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = 'https://images.unsplash.com/photo-1695669882447-1de80022ff21?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8anVzdGluJTIwYmllYmVyfGVufDB8fDB8fHww'; // Set a fallback image
                }}
                className="w-full h-full bg-cover" alt="" srcset="" />
            </div>
            <div className="bg-white w-5/6">
                <div className="m-2">
                    <div className="flex flex-row items-center">
                    <img src={post?.user?.profilePictureUrl} className="h-10 w-10 rounded-full" alt="" />
                    <p className="ml-2 font-bold">{post?.user?.username}</p>
                    </div>
                    <hr className="mt-2 mb-2"/>
                    <div className="flex flex-row items-center">
                    <img src={post?.user?.profilePictureUrl} className="h-9 w-9 rounded-full" alt="" />
                    <p className="ml-2"><span className="font-bold">{post?.user?.username}</span> {post.caption}</p>
                    </div>
                </div>
               <form onSubmit={handleSubmit}>
                <div className=" w-full ml-2 mr-2  ">
                <hr className="mb-5"/>
                <div className="flex justify-round p-2 justify-between">
                     <img className="" src="/img/coments.png" alt="" />
                       <input type="text"
                        name="comment"
                        value={formData.comment}
                        onClick={handleInputClick}
                        onChange={handleChange} placeholder="Create Comments"
                       className="text-black w-5/6 ml-6" />
                     <button type="submit" className="bg-main p-2 right-0 rounded-sm hover:bg-hover">create</button>
                 </div>
                        <hr />        
                </div>
               </form>
            </div>
                <button className="absolute top-2 right-2" onClick={onClose}>X</button>
        </div>
          </div>
          </div>
      </>
      
    );
  };
  
  export default ModalPost;
  