import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; 
import { useDispatch, useSelector } from 'react-redux';
import { postLoginUser } from '../../redux/slice/authSlice.js';
import { postData } from '../../redux/store/store.js';

const SignIn = ()=> {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    const dispatch = useDispatch();
    const router = useRouter(); // Use Next.js Router

    const error = true
    // const { data, loading, error, token } = useSelector((state) => state.storeAuth);
    const dataAuth= useSelector((state) => state.storeAuth.data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value, // Set the value of the field that changed
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLoginUser(formData, "post", 'api/v1/login')).then((result) => {
            if (!result) { //klo ada eror !result.error
                console.log("berhasill");
            //   router.push('/dashboard');
            } else {
            //   console.log('Login failed:', result.payload.message);
            }
          });
      };

    // useEffect(() => {
    //     dispatch(postLoginUser(data, "post", 'api/v1/login'));
    //   }, [dispatch]);

      
    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p>Error: {error}</p>;
    return (
        <>
        <div className="flex justify-center font-inter "> 
            <div className="relative h-screen w-[375px]">
            <Image
                src="/img/background-protographer2.png"
                alt="Background"
                layout="fill" 
                objectFit="cover" 
            /> 
             <div className="absolute m-32 font-inter font-medium leading-7	tracking-wider text-5xl">
                Po
                <span className="relative inline-block">
                    <span className="underline text-main absolute left-0 -bottom-1 w-full"></span>
                    <span className="text-black underline">to</span>
                </span>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-center bg-white">
                <div className="absolute top-1/3">
                    <p className="text-red-500 flex flex-col justify-center items-start mx-20 mb-5">{error ? error : ''}</p>
                    <div className="flex flex-col text-white justify-center items-start mx-24">
                            <label htmlFor="">Email</label>
                            <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-white focus:outline-none focus:border-black-500 text-white w-64 mt-4"
                            >
                            </input>
                    </div>
                    <div className="flex flex-col text-white justify-center items-start mx-24">
                            <label htmlFor="">Password</label>
                            <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent border-b-2 border-white focus:outline-none focus:border-black-500 text-white w-64 mt-4"
                            >
                            </input>
                    </div>
                    <div className="flex justify-center items-start bg-main w-64 mx-24 mt-5 rounded-md hover:bg-hover">
                        <button type="submit" className="p-3">login</button>
                     </div>
                </div>
                <div className="absolute bottom-32">
                    <hr className="bg-white h-0" />
                    <h1 className="text-white mt-5 leading-3">new user ? <span className="text-main">create an account</span></h1>
                </div>
            </div> 
            </form>
            </div>
        </div>
        </>
    )
}

export default SignIn