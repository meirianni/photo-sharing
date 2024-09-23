import Image from "next/image"
import Link from "next/link"
//import {photo} from "../img/background-protographer.png"
// /Users/meirianni/Documents/Ughtea/batch/final-project/pages/img/background-protographer.png
const SignIn = ()=>{
    return (
        // sm:w-full sm:h-lvh
        <>
        <div className="flex  justify-center font-inter "> {/* Container with responsive height */}
            <div className="relative h-screen w-[375px]">
            <Image
                src="/img/background-protographer2.png" // Path to your image in the public folder
                alt="Background"
                layout="fill" // Make the image fill the container
                objectFit="cover" // Cover the entire area
                // className="rounded-lg " // Add Tailwind classes
            /> 
             <div className="absolute m-32 font-inter font-medium leading-7	tracking-wider text-5xl">
                Po
                <span className="relative inline-block">
                    <span className="underline text-main absolute left-0 -bottom-1 w-full"></span>
                    <span className="text-black underline">to</span>
                </span>
            </div>
            <div className="flex justify-center bg-white">
                <div className="absolute top-1/3">
                    <div className="flex flex-col text-white justify-center items-start mx-24">
                            <label htmlFor="">Email</label>
                            <input 
                            type="email"
                            className="bg-transparent border-b-2 border-white focus:outline-none focus:border-black-500 text-white w-64 mt-4"
                            >
                            </input>
                    </div>
                    <div className="flex flex-col text-white justify-center items-start mx-24">
                            <label htmlFor="">Password</label>
                            <input 
                            type="password"
                            className="bg-transparent border-b-2 border-white focus:outline-none focus:border-black-500 text-white w-64 mt-4"
                            >
                            </input>
                    </div>
                    <div className="flex justify-center items-start bg-main w-64 mx-24 mt-5">
                <p>Login</p>
                </div>
                </div>
                
            </div>
            {/* <div className="absolute top-1/3 w-[250px] h-[400px] bg-main">
                <div className="flex flex-col text-white justify-center items-start mx-24">
                        <label htmlFor="">Email</label>
                        <input 
                        type="email"
                        className="bg-transparent border-b-2 border-white focus:outline-none focus:border-black-500 text-white"
                        >
                        </input>
                    </div>
            </div> */}
            <div className="absolute">
                <div className=" top-1/2 left-1/2">
                    {/* <div className="flex flex-col justify-center items-center">
                        <label htmlFor="">Email</label>
                        <input 
                        type="email"
                        className="bg-transparent border-b-2 border-black focus:outline-none focus:border-black-500 text-white"
                        >
                        </input>
                    </div> */}
                    {/* <label htmlFor="">Password</label>
                    <input 
                    type="password"
                     className="bg-transparent border-b-2 border-black focus:outline-none focus:border-black-500 text-white"
                    >
                    </input> */}
                </div>

            </div>
            <div className="absolute bottom-52 left-5">
                <h1 className="text-white text-3xl font-inter tracking-wide leading-8 font-medium		">Explore your <br /> 
                captures.</h1>
            </div>
            <div className="absolute bottom-40 left-5">
                <h1 
                className="text-white text-base font-inter tracking-wide leading-8 font-normal">
                Share your captures with <span className="text-main font-bold">Poto</span></h1>
            </div>
            <Link href="/sign-in" >
                <div className="absolute bottom-20 bg-main p-3 left-3 right-3 rounded-lg hover:bg-hover">
                    <h1 className="text-center text-white">Get </h1>
                </div>
            </Link>
            
            </div>
             
            
            
        </div>
            
       
        
        </>
    )
}

export default SignIn