// import Navbar from "@/components/Navbar"
import ExplorePost from "@/components/explorePost";
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
        {/* <ExplorePost />s */}
        {/* <ListFollowing />
        <Story /> */}
        </div>
        </>
    )
}

export default Home

