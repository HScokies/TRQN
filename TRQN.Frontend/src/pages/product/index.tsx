import './style.scss';
import { useState, useEffect } from 'react';
import { SizeButton } from 'src/components';
import { useNavigate, useParams } from 'react-router-dom';
import { IProductProps, ISizeToPrice } from 'src/interfaces/index';
import api, { BASE_URL } from 'src/api/axiosConfig';
import { AxiosError } from 'axios';



const ProductPage = () => {
    const {SKU} = useParams()
    const [productData, setProductData] = useState<IProductProps>()
    const [price, setPrice] = useState(0);
    const [sizeId, setSizeId] = useState(-1)
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`products/${SKU}`)
        .then((res) => {
           setProductData(res.data)
           setPrice(res.data.sizes[0].price)
           setSizeId(res.data.size[0].id)
        })
        .catch((e) => {
        })
    }, [SKU])

    const addToCart = () => {
        api.post(`/users/cart/${sizeId}`)
        .then((res) => console.log(res.data))
        .catch((e : AxiosError) => {
            if (e.response?.status == 401){
                navigate("/auth")  
            }
        })
    }

    return (
        <div className="app-container">
            <div className="product-image">
                <img src={BASE_URL+"/files/images/"+productData?.image} alt={productData?.image} />
            </div>
            <div className="product-details">
                <h1>{productData?.name}</h1>
                <span className='product-details_size'>Select US men's Size</span>
                <div className="size-buttons">
                    {productData?.sizes.map((e, i) => (
                        <SizeButton key={i} id={e.id} size={e.size} price={e.price} setPrice={setPrice} setSize={setSizeId} />
                    ))}
                </div>
                <select onChange={(e) => {
                    let sizeData: ISizeToPrice = JSON.parse(e.target.value)
                    console.log(sizeData)
                    setPrice(sizeData.price)
                    setSizeId(sizeData.id)
                }}>
                    {productData?.sizes.map((e, i) => (
                        <option key={i} value={
                            `{"id": ${e.id}, "price": ${price}}
                            `
                        }>{e.size}</option>
                    ))}
                </select>
                <button className="buy-button" onClick={() => addToCart()}>${price}</button>
                <span className='line'></span>
                <span className='about-title'>About this product</span>
                <p>{productData?.description}</p>
                <div className='about-container'>
                    <span className='about-info'>SKU: {productData?.sku}</span>
                    <span className='about-info'>Colorway: {productData?.colorway}</span>
                    <span className='about-info'>Release Date: {productData?.releaseDate}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
