import './style.scss'

import { Link } from "react-router-dom";
import { ICardProps } from 'src/interfaces';

const Card = ({ SKU, isBig = false, title, descr, price, image }: ICardProps) => {

    return (
        <Link to={`/product/${SKU}`} className={"card" + (isBig ? " big" : "")}>
            <div className="card-info">
                <span className="card-info_title">{title}</span>
                <span className="card-info_descr">{descr}</span>
                <span className="card-info_price">{`$${price}+`}</span>
            </div>
            <img src={image} alt={image} className="card-info_image" draggable="false" />
        </Link>

    );
}
export default Card