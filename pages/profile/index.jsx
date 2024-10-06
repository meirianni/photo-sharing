import ListFollowing from "@/components/listFollowing"
import Story from "@/components/story"
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../../components/navbar'), { ssr: false });


const Profile = () => {
    return (
        <>
        <div className="flex">
        <Navbar />
        {/* <ExplorePost />s */}
        {/* <ListFollowing />
        <Story /> */}
        </div>
        </>
    )
}

export default Profile