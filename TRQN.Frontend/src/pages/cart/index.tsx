import './style.scss';
import Input from 'src/components/input';
import CartCard from 'src/components/cartCard';
import { useEffect, useState } from 'react';
import api from 'src/api/axiosConfig';

interface ICountries{
  id: number,
  name: string
}


const Cart = () => {
  const [activeCountry, setActiveCountry] = useState<number>(-1)

  const [countries, setCountries] = useState<ICountries[]>()

  useEffect(() => {
    api.get("/countries")
    .then((res) => {
      setCountries(res.data)
      setActiveCountry((res.data[0] as ICountries).id)
    })
    .catch((e) => {

    })
  }, [])



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
          <select onChange={(e) => setActiveCountry(+e.target.value)}>
            {
              countries?.map((e) => (
                <option value={e.id} key={e.id}>{e.name}</option>
              ))
            }
          </select>
        </div>
        <Input type='telephone' label='Telephone' pattern='^\+[1-9]{1}[0-9]{3,14}$' />
        <label className='label'>* Required</label>
      </div>
      <div className='right'>
        <h1 className='title summary'>order summary</h1>
        <CartCard id={activeCountry} />
      </div>
    </div>
  );
};

export default Cart;
