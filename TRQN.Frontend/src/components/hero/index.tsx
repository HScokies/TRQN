import './style.scss'
import HeroImage from 'images/MainPageProduct_placement.webp'
import HeroLogo from 'images/MainPageProduct_placement-logo.svg'
const Hero = () => {
    return (
        <div className="hero">
            <img src={HeroImage} id="background" />
            <img src={HeroLogo} id="logo" />
        </div>
    );
}
export default Hero