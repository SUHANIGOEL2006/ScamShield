import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

function Home(){
    return(
        <div className="min-h-screen bg-[#08111F] text-white">
            <Navbar/>
            <Hero/>
            <About/>
            <Footer/>
        </div>
    );
}
export default Home;