import React from 'react';
import './index.scss';

interface ISizeButton {
  id: number,
  size: number;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>,
  setSize: React.Dispatch<React.SetStateAction<number>>, 
}

const SizeButton = ({ id, size, price, setPrice, setSize }: ISizeButton) => {
  const handleClick = () => {
    setPrice(price);
    setSize(id)
  };

  return (
    <button className="size-button" onClick={handleClick}>
      {size}
    </button>
  );
};

export default SizeButton;

