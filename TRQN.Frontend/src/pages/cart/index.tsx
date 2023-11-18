import './style.scss';
import Input from 'src/components/input';
import CartCard from 'src/components/cartCard';
import { useState } from 'react';

const Cart = () => {
  const [countryData, setCountryData] = useState<string>(`
  {
    "tax": 1.35,
    "shipping": 2500.0000
  }
  `)

  return (
    <div className='basket_container'>
      <div className='left'>
        <h1 className='title'>Shipping address</h1>
        <span className='line'></span>
        <Input type='text' label='* Full Name' />
        <Input type='text' label='* Street Address' />
        <Input type='text' label='Apartment, Suite, Unit, Building, Floor, etc.' pattern='[a-zA-Z0-9, ]+' />
        <Input type='text' label='* City' />
        <Input type='text' label='* Zip / Postal code' pattern='[0-9]{5,6}' />
        <div className='select_container'>
          <label className='label'>
            * Country or Region
          </label>
          <select onChange={(e) => setCountryData(e.target.value)}>
            <option value={`
              {
                "tax": 1.35,
                "shipping": 2500.0000
              }
              `}>Russia</option>
            <option value={`
              {
                "tax": 2,
                "shipping": 500.0000
              }
              `}>United States</option>
          </select>
        </div>
        <Input type='telephone' label='Telephone' pattern='^\+[1-9]{1}[0-9]{3,14}$' />
        <label className='label'>* Required</label>
      </div>
      <div className='right'>
        <h1 className='title'>order summary</h1>
        <CartCard country={countryData} />
        <button className='buy_button'>Place Order</button>
      </div>
    </div>
  );
};

export default Cart;
