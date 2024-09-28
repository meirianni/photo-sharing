import Footer from "@/components/footer"
import ListFollowers from "@/components/listFollowers"
import Story from "@/components/story"



const Home = () => {
    return (
        <>
        <div className="flex ">
        <Footer/>
        <ListFollowers />
        <Story />
        </div>
        </>
    )
}

export default Home