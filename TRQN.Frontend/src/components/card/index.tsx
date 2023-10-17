import './style.scss'
import { ICardProps } from 'src/interfaces';

const Card = ({ isBig = false, title, descr, price, image }: ICardProps) => {

    return (
        <div className={"card" + (isBig ? " big" : "")}>
            <div className="card-info">
                <span className="card-info_title">{title}</span>
                <span className="card-info_descr">{descr}</span>
                <span className="card-info_price">{`$${price}+`}</span>
            </div>
            <img src={image} alt={image} className="card-info_image" draggable="false" />
        </div>
    );
}
export default Card