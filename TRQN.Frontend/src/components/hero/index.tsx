import './style.scss'
import HeroImage from 'images/MainPageProduct_placement.webp'
import HeroLogo from 'images/MainPageProduct_placement-logo.svg'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <Link to={`/product/MSCHF009SE`} className="hero">
                <img src={HeroImage} id="background" />
                <img src={HeroLogo} id="logo" />
       </Link>
    );
}
export default Hero