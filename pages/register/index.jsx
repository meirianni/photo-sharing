import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { uploadImage } from "@/redux/slice/uploadImageSlice";
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/router";

const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const token = getToken();
    const [file, setFile] = useState(null);
    const [formData,setFormData] = useState({
            name: '',
            username: '',
            email: '',
            // password: '',
            passwordRepeat: '',
            profilePictureUrl: '',
            phoneNumber: '',
            bio: '',
            website: ''
    })
    // const { loading, error, uploadResponse } = useSelector((state) => state.upload);
    const { data, loading, error } = useSelector((state) => state.storeAuth);
    console.log(data, "data", error, "error");
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    // const submitFile = async(e) => {
    //     e.preventDefault();
    //     if (file) {
    //         try {
    //             await dispatch(uploadImage(file, 'upload-image', token))
                
    //             // setFormData((prev) => ({
    //             //     ...prev,
    //             //     profilePictureUrl : coba
    //             // }))
    //         } catch (error) {
    //             console.error('Upload failed:', error);
    //         }
            
    //     }
    //   };
      
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value,
            // profilePictureUrl: uploadResponse,
        }))
     }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(postRegisterUser(formData, "post",'register')).then((result) => {
                if (!result) {
                  router.push('/home');
                } else if (result.payload && result.payload.message) {
                    router.push('/');
                }
            })  
            
        } catch (error) {
            console.log(result.payload && result.payload.message, "meii");
        }
        
    }
 
    

    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div className="bg-black w-5/12 h-lvh text-white">
                <div className="flex justify-center items-center mt-10 ">
                    <h1 className="m-5 font-base leading-relaxed text-3xl ">Create Account</h1>
                    <div className="bg-white w-4 h-4 rounded-full flex items-center justify-center">
                        <img className="w-3 h-3" src="/img/logo.png" alt="" />
                        </div>
                </div>
                <div className="flex justify-around mt-18">
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Name</label>
                        <input type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Username</label>
                        <input type="text" 
                         name="username"
                         value={formData.username}
                         onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Email</label>
                        <input type="email"
                        name ="email"
                         value={formData.email}
                         onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Phone number</label>
                        <input type="number" 
                         name = "phoneNumber"
                         value={formData.phoneNumber}
                         onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Password</label>
                        <input type="password" 
                        name="password"
                         value={formData.password}
                         onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Repeat Password</label>
                        <input type="password" 
                           name="passwordRepeat"
                           value={formData.passwordRepeat}
                           onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Bio</label>
                        <input type="text" 
                         name="bio"
                         value={formData.bio}
                         onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-3">
                        <label htmlFor="">Website</label>
                        <input type="text" 
                           name="website"
                           value={formData.website}
                           onChange={handleChange}
                        className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                    {/* <div className="flex justify-around m-8">
                        <div className="flex flex-col">
                            <label htmlFor="">Image</label>
                            <input type="file"
                            name="profilePictureUrl"
                            onChange={handleFileChange}
                            className="mt-3 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                        </div>
                        <button type="submit" onClick={submitFile}className="bg-main text-white rounded-lg h-12 hover:bg-hover p-3">upload image
                        </button>
                    </div> */}
                <div className="flex items-center justify-center bg-main hover:bg-hover p-3 mt-12">
                    <button type="submit" className="text-2xl">submit</button>
                </div>
                </div>
            </div>
            
        </form>
        </>
    )
}


export default Register;