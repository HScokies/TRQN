
import './style.scss';
import { useEffect, useState } from 'react';
import data from './data.json'

interface Product {
    id: number;
    title: string;
    size: number;
    colorWay: string;
    image: string;
    price: number;
}

interface CartData {
    subtotal: number;
    items: Product[];
}

interface CountryData{
    tax: number,
    shipping : number
}

interface Props{
    country : string
}

const cartCard = ({country} : Props) => {
    const [items, setItems] = useState<Product[]>([])
    const [subtotal, setSubtotal] = useState(0)
    const [countryData, setCountryData] = useState<CountryData>()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const Calculate = (cData : CountryData) => {
            setTotal(data.subtotal * cData.tax)
            let tax = data.subtotal * (cData.tax-1);
            setCountryData({tax: tax, shipping: cData.shipping})
        }       
        setItems(data.items)
        setSubtotal(data.subtotal)
        Calculate(JSON.parse(country))
    }, [country])
    return (
        <>
            <div className='product_container'>
                {items.map((item) => (
                    <div key={item.id} className="basket-card">
                        <div>
                            <img className='basket_img' src={item.image} alt={item.title} />
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                            <p>US Size {item.size}</p>
                            <p>{item.colorWay}</p>
                        </div>
                        <div className='basket_price'>${item.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <div className="orderPrice-container">
                <div className='orderPrice'>
                    <h2>Subtotal</h2>
                    ${subtotal.toFixed(2)}
                </div>
                <div className='orderPrice'>
                    <h2>Shipping</h2>
                    ${countryData?.shipping.toFixed(2)}
                </div>
                <div className='orderPrice'>
                    <h2>Tax</h2>
                    ${countryData?.tax.toFixed(2)}
                </div>
            </div>
            <div className='orderPrice total'>
                    <h2>Order total</h2>
                    <span>${total.toFixed(2)}</span>
            </div>
        </>
    );
};

export default cartCard;

