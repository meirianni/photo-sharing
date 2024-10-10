import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { useDispatch, useSelector } from 'react-redux';
import { postLoginUser } from '../../redux/slice/authSlice.js';
import { postData } from '../../redux/store/store.js';
import { ErrorAlert, SuccessAlert } from "@/utils/alert.jsx";
import { PostDataApi, PostDataLogin } from "@/utils/api.js";
import { getToken } from "@/utils/token.js";

import Cookies from 'js-cookie';

const SignIn = ()=> {
    const token = getToken()
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    const [datax, setData] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter(); // Use Next.js Router

    // const error = true
    const { data, loading, error} = useSelector((state) => state.storeAuth);
    // const dataAuth = useSelector((state) => state.storeAuth.data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value, // Set the value of the field that changed
        }));
      };
    
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(postLoginUser(formData, "post", 'login')).then((result) => {
    //         if (!result) { //klo ada eror !result.error
    //             console.log("meii");
                
    //         //   router.push('/home');
    //           setIsSuccess(true);
    //         } else {
    //         }
    //       });
    //   };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await PostDataLogin("post", "login", formData);
            setData(response)            
            setIsSuccess(true);
            const token = response.token;
            Cookies.set('token', token);
            const userId = response?.user.id
            Cookies.set('userId', userId);
            setTimeout(() => {
                setIsSuccess(false);
                router.push('/home'); // Redirect after success
            }, 2000);
        } catch (error) {            
            
            const message = error.response?.data?.message || "An error occurred, please try again!";

            setErrorMessage(message); // Set the custom error message
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        }
    };

    
    return (
        <>
        {errorMessage && <ErrorAlert message={typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)} />}
        <div className="flex justify-center font-inter "> 
            <div className="relative h-screen w-[375px]">
            <Image
                src="/img/background-protographer2.png"
                alt="Background"
                layout="fill" 
                objectFit="cover" 
            /> 
             <div className="absolute m-32 font-medium leading-7 text-white	tracking-wider text-5xl">
                Po
                <span className="relative inline-block">
                    <span className="underline text-white absolute left-0 -bottom-1 w-full"></span>
                    <span className="text-main underline">to</span>
                </span>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-center bg-white">
                <div className="absolute top-1/3">
                    <div className="flex flex-col text-white justify-center items-start mx-24 font-inter">
                            <label htmlFor="">Email</label>
                            <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-64 mt-2 p-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            >
                            </input>
                    </div>
                    <div className="flex flex-col text-white justify-center items-start mx-24 mt-3">
                            <label htmlFor="">Password</label>
                            <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-64 mt-2 p-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            >
                            </input>
                    </div>
                    <div  type="submit" className="flex justify-center items-start bg-main w-64 mx-24 mt-5 rounded-md hover:bg-hover hover:font-bold">
                        <button className="p-3 ">login</button>
                     </div>
                </div>
                <div className="absolute bottom-32">
                    <hr className="bg-white h-0" />
                    <h1 className="text-white mt-5 leading-3">new user ?
                        <Link href= '/register'>
                        <span className="text-main hover:text-white font-bold"> create an account</span>
                        </Link>
                    </h1>
                </div>
            </div> 
            </form>
            </div>
        </div>
        

        </>
    )
}

export default SignIn