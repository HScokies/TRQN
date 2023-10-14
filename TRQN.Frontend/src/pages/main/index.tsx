import './styles.scss'
import { Header, Hero, Footer } from "src/components";



const MainPage = () => (
    <>
        <Header isAdmin={true}/>
        <Hero/>
        <Footer/>
    </>

)
export default MainPage