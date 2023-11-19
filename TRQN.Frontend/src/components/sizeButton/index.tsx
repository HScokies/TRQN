import React from 'react';
import './index.scss';

interface ISizeButton {
  id: number,
  size: number;
  price: number;
  setSizeData: ({id, price} : ISizeData) => void
}

interface ISizeData{
  id: number,
  price: number
}

const SizeButton = ({ id, size, price, setSizeData }: ISizeButton) => {
  const handleClick = () => {
    setSizeData({id: id, price: price})
  };

  return (
    <button className="size-button" onClick={handleClick}>
      {size}
    </button>
  );
};

export default SizeButton;

