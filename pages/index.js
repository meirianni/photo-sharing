import Image from "next/image";
import localFont from "next/font/local";
// import Index from "./home";
import Index from "./login";
import ListFollowing from "@/components/listFollowing";
// import Footer from "@/components/footer";
import Story from "@/components/story";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
    {/* <Image src="/img/background-protographer.png"
        alt="Next.js logo"
        width={180}
        height={38}
        priority>

        </Image> */}
        <Index />
        {/* <Footer />
        <Story /> */}
        {/* <Index /> */}
    </>
  );
}
