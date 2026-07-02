
import HeroSlider from "./website/components/HeroSlider";
import Header from "./website/components/Header";
import Featured from "@/app/Featured"
import Footer from "@/app/website/components/Footer"

export default function Home() {
  return (
    <>
     
      <Header/>
      <HeroSlider/>
      
      <Featured/>
      <Footer/>
    </>
  );
}