import React from 'react';
import './index.scss';

interface ISizeButton {
  size: string;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const SizeButton = ({ size, price, setPrice }: ISizeButton) => {
  const handleClick = () => {
    setPrice(price);
  };

  return (
    <button className="size-button" onClick={handleClick}>
      {size}
    </button>
  );
};

export default SizeButton;

