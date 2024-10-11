// import Navbar from "@/components/Navbar"
import ExplorePost from "@/components/explorePost";
import ListFollowing from "@/components/listFollowing"
import Story from "@/components/story"
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('../../components/navbar'), { ssr: false });
import { getCookie } from 'cookies-next';
export const getServerSideProps = ({ req, res }) => {
    const token = getCookie('token', { req, res });

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    return {
      props: {}, // pass any required props here
    };
  };
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

