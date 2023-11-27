
import './style.scss';
import { useEffect, useState } from 'react';
import api, { BASE_URL } from 'src/api/axiosConfig';
import { submitUserData } from 'src/pages/cart';

export interface ICountryData {
    tax: number,
    shipping: number
}

interface Product {
    id: number,
    title: string,
    size: number,
    colorWay: string,
    image: string,
    price: number
}

interface CartData {
    subtotal: number;
    items: Product[];
}

interface Props {
    id: number
}



const cartCard = ({ id }: Props) => {
    const [data, setData] = useState<CartData>()
    const [countryData, setCountryData] = useState<ICountryData>({ tax: 0, shipping: 0 })
    const [total, setTotal] = useState(0)

    const getCartData = () => {
        api.get("/users/cart")
            .then((res) => {
                setData(res.data)
                setTotal(res.data.subtotal)
            })
    }
    useEffect(() => {
        getCartData()
    }, [])

    useEffect(() => {
        const getData = () => {
            api.get(`/countries/${id}`)
                .then((res) => {
                    const cData: ICountryData = res.data;
                    console.log(cData, data)
                    if (!data) return
                    setTotal(data?.subtotal * cData.tax + cData.shipping)
                    setCountryData({ tax: data?.subtotal * (cData.tax - 1), shipping: cData.shipping })
                })
        }
        if (id != -1) getData()
    }, [id, data])

    const removeItem = (id: number) => {
        api.delete(`/users/cart/${id}`)
            .then(() => {
                getCartData()
            })
    }

    const handleSubmit = () => {
        if (confirm("Save shipping address?"))
            submitUserData()
    }

    const OutputItems = () => (
        <>{
            data?.items.map((item) => (
                <div key={item.id} className="basket-card">
                    <div>
                        <img className='basket_img' src={BASE_URL + "/files/images/" + item.image} alt={item.title} />
                    </div>
                    <div>
                        <h3>{item.title}</h3>
                        <p>US Size {item.size}</p>
                        <p>{item.colorWay}</p>
                    </div>
                    <div className='basket_price'><span className='delete' onClick={() => removeItem(item.id)}>X</span><span>${item.price.toFixed(2)}</span></div>
                </div>
            ))}
            <div className="orderPrice-container">
                <div className='orderPrice'>
                    <h2>Subtotal</h2>
                    ${data?.subtotal.toFixed(2)}
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
            <button onClick={() => handleSubmit()} className='buy_button'>Place Order</button>
        </>
    )


    return (
        <>
            <div className='product_container'>
                {data != undefined && data.items.length > 0 ? OutputItems() : "Your cart is empty! for now."}
            </div>

        </>
    );
};

export default cartCard;

