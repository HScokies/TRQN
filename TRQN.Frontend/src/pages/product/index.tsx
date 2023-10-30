import './style.scss';
import { useState } from 'react';
import productData from './placeholder.json';
import { SizeButton } from 'src/components';

const ProductPage = (SKU: string) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [price, setPrice] = useState(0);

    const handleSizeChange = (event: { target: { value: any; }; }) => {
        const selectedSizeValue = event.target.value;
        setSelectedSize(selectedSizeValue);
        const selectedSizeObject = productData.sizes.find(size => Object.keys(size)[0] === selectedSizeValue);
        if (selectedSizeObject) {
            setPrice(Object.values(selectedSizeObject)[0]);
        } else {
            setPrice(0);
        }
    };

    return (
        <div className="app-container">
            <div className="product-image">
                <img src={productData.image} alt={productData.name} />
            </div>
            <div className="product-details">
                <h1>{productData.name}</h1>
                <span className='product-details_size'>Select US men's Size</span>
                <div className="size-buttons">
                    {productData.sizes.map((e, i) => (
                        <SizeButton key={i} size={Object.keys(e)[0]} price={Object.values(e)[0]} setPrice={setPrice} />
                    ))}
                </div>
                <select value={selectedSize} onChange={handleSizeChange}>
                    {productData.sizes.map((e, i) => (
                        <option key={i} value={Object.keys(e)[0]}>{Object.keys(e)[0]}</option>
                    ))}
                </select>
                <button className="buy-button">${price}</button>
                <span className='line'></span>
                <span className='about-title'>About this product</span>
                <p>{productData.description}</p>
                <div className='about-container'>
                    <span className='about-info'>SKU: {productData.SKU}</span>
                    <span className='about-info'>Colorway: {productData.colorway}</span>
                    <span className='about-info'>Release Date: {productData.releaseDate}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
