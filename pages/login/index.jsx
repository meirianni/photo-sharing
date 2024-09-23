import Image from "next/image"
import Link from "next/link"
//import {photo} from "../img/background-protographer.png"
// /Users/meirianni/Documents/Ughtea/batch/final-project/pages/img/background-protographer.png
const Index = ()=>{
    return (
        // sm:w-full sm:h-lvh
        <>
        <div className="flex  justify-center font-inter "> {/* Container with responsive height */}
            <div className="relative w-[375px] h-lvh">
            <Image
                src="/img/background-protographer.png" // Path to your image in the public folder
                alt="Background"
                layout="fill" // Make the image fill the container
                objectFit="cover" // Cover the entire area
                // className="rounded-lg " // Add Tailwind classes
            /> 
             <div className="absolute m-10 font-inter font-medium leading-7	tracking-wider text-5xl">
                Po
                <span className="relative inline-block">
                    <span className="underline text-main absolute left-0 -bottom-1 w-full"></span>
                    <span className="text-black underline">to</span>
                </span>
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
                    <h1 className="text-center text-white">Get Started</h1>
                </div>
            </Link>
            
            </div>
             
            
            
        </div>
            
       
        
        </>
    )
}

export default Index