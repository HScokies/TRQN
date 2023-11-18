import './style.scss'

import { Link } from "react-router-dom";
import { ICardProps } from 'src/interfaces';
import { BASE_URL } from 'src/api/axiosConfig';

const Card = ({ sku, isBig = false, name, descriptionShort, price, image }: ICardProps) => {
    return (
        <Link to={`/product/${sku}`} className={"card" + (isBig ? " big" : "")}>
            <div className="card-info">
                <span className="card-info_title">{name}</span>
                {/* <span className="card-info_descr">{descriptionShort}</span> */}
                <span className="card-info_price">{`$${price}+`}</span>
            </div>
            <img src={BASE_URL+"/files/images/"+image} alt={image} className="card-info_image" draggable="false" />
        </Link>

    );
}
export default Card