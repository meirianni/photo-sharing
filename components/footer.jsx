import Link from "next/link"
import Search from "./search"


const Footer = () => {

    const datax = [{
        id:1,
        data : "Home",
        image : "/img/home.png"
    },
    {
        id:2,
        data : "Search",
        image : "/img/search.png"
    }
    ]

    return( <>
    <div className="flex flex-row w-1/6 h-lvh">
        <div className="w-96 mt-5 ml-4">
             <p className="text-3xl">Potos</p>
                <div className="mt-20">
             {/* {datax.map((item) => ( */}
                <div className="flex mt-4 flex-row items-center mr-4 hover:bg-grey hover:rounded-lg ">
                    <img src="/img/home.png" className="ml-3 w-7" alt="" />
                    <p className="p-2 text-xl font-bold">Home</p>
                </div>
                
                <div 
                onClick={Search}
                className="flex mt-4 flex-row items-center mr-4 hover:bg-grey hover:rounded-lg">
                    <img src="/img/search.png" className="ml-3 w-7" alt="" />
                    <p className="p-2 text-xl font-bold">Search</p>
                </div>
            {/* ))} */}
                </div>
            
        </div>
        <div className="bg-gray-100 w-1">
        </div>
            
    </div>
    {/* <div class="flex items-center">
    <div class="h-32 w-1 bg-gray-400"></div> 
    <div class="ml-4">Content next to the line</div>
</div> */}

    </>)
}


export default Footer