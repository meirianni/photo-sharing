// import Navbar from "@/components/Navbar"
import ListFollowing from "@/components/listFollowing"
import Story from "@/components/story"
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../../components/navbar'), { ssr: false });


const Home = () => {
    return (
        <>
        <div className="flex">
        <Navbar/>
        <Story />
        {/* <ListFollowing />
        <Story /> */}
        </div>
        </>
    )
}

export default Home

