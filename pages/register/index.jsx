import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { uploadImage } from "@/redux/slice/uploadImageSlice";
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterUser } from "@/redux/slice/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const token = getToken();
    const [file, setFile] = useState(null);
    const [formData,setFormData] = useState({
            name: '',
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            profilePictureUrl: '',
            phoneNumber: '',
            bio: '',
            website: ''
    })
    const { loading, error, uploadResponse } = useSelector((state) => state.upload);
    
   
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

   
    const submitFile = async(e) => {
        e.preventDefault();
        if (file) {
            try {
                await dispatch(uploadImage(file, 'upload-image', token))
                
                // setFormData((prev) => ({
                //     ...prev,
                //     profilePictureUrl : coba
                // }))
            } catch (error) {
                console.error('Upload failed:', error);
            }
            
        }
      };
      
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name] : value,
            profilePictureUrl: uploadResponse,
        }))
     }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData, "formm");
        dispatch(postRegisterUser(formData, "post",'register')).then((result) => {
            if (!result) { //klo ada eror !result.error
                console.log("berhasill");
            //   router.push('/dashboard');
            } else {
            //   console.log('Login failed:', result.payload.message);
            }
        })
        
        
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div className="bg-black w-5/12 h-lvh text-white font-inter">
                <div className="flex justify-center">
                    <h1 className="m-5 font-medium leading-relaxed text-lg	">Create Account</h1>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Name</label>
                        <input type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Username</label>
                        <input type="text" 
                         name="username"
                         value={formData.username}
                         onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Email</label>
                        <input type="email"
                        name ="email"
                         value={formData.email}
                         onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Phone number</label>
                        <input type="number" 
                         name = "phoneNumber"
                         value={formData.phoneNumber}
                         onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Password</label>
                        <input type="text" 
                        name="password"
                         value={formData.password}
                         onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Repeat Password</label>
                        <input type="text" 
                           name="passwordRepeat"
                           value={formData.passwordRepeat}
                           onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Bio</label>
                        <input type="text" 
                         name="bio"
                         value={formData.bio}
                         onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                    <div className="flex flex-col m-8">
                        <label htmlFor="">Website</label>
                        <input type="text" 
                           name="website"
                           value={formData.website}
                           onChange={handleChange}
                        className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                    </div>
                </div>
                    <div className="flex">
                        <div className="flex flex-col m-8">
                            <label htmlFor="">Image</label>
                            <input type="file"
                            name="profilePictureUrl"
                            onChange={handleFileChange}
                            className="mt-5 bg-transparent text-white  border-white focus:outline-none border-b-2"/>
                        </div>
                        
                        <button type="submit" onClick={submitFile}className="bg-main text-white">upload
                        </button>
                    </div>
                <div className="flex items-center justify-center bg-main p-5 mt-5 hover:hover">
                    <button type="submit">submit</button>
                </div>
                </div>
            </div>
            
        </form>
        </>
    )
}


export default Register;