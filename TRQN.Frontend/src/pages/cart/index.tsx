import './style.scss';
import Input from 'src/components/input';
import CartCard from 'src/components/cartCard';
import { useEffect, useState } from 'react';
import api from 'src/api/axiosConfig';
import { IProfile } from '../profile';
import { AxiosError } from 'axios';

export interface ICountries {
  id: number,
  name: string
}

export const submitUserData = () => {
  const form = document.getElementById('userData-form') as HTMLFormElement;
  let data = new FormData(form)
  api.post("/users/profile", data)
    .then(() => alert("Updated successfully"))
    .catch((e: AxiosError) => {
      alert(e.response?.statusText)
    })
}

const Cart = () => {
  const [activeCountry, setActiveCountry] = useState<number>(-1)

  const [countries, setCountries] = useState<ICountries[]>()
  const [shippingData, setShippingData] = useState<IProfile>()

  useEffect(() => {
    const getCountries = () => {
      api.get("/countries")
        .then((res) => {
          setCountries(res.data)
          setActiveCountry((res.data[0] as ICountries).id) // get user data
        })
        .catch((e) => {

        })
    }
    const getShippingData = () => {
      api.get("/users/profile")
        .then((res) => {
          setShippingData(res.data)
          setActiveCountry(((res.data as unknown) as IProfile).country.id)
        }).catch((e) => {

        })
    }
    getCountries()
    getShippingData()
  }, [])

  return (
    <div className='basket_container'>
      <div className='left'>
        <h1 className='title'>Shipping address</h1>
        <span className='line'></span>
        <form id='userData-form'>
          <Input name='fullName' type='text' label='* Full Name' defaultValue={shippingData?.fullName} />
          <Input name='street' type='text' label='* Street Address' defaultValue={shippingData?.street} />
          <Input name='apartment' type='text' label='Apartment, Suite, Unit, Building, Floor, etc.' pattern='[a-zA-Z0-9, ]+' defaultValue={shippingData?.apartment} />
          <Input name='city' type='text' label='* City' defaultValue={shippingData?.city} />
          <Input name='zip' type='text' label='* Zip / Postal code' pattern='[0-9]{5,6}' defaultValue={shippingData?.zip} />
          <div className='select_container'>
            <label className='label'>
              * Country or Region
            </label>
            <select name='countryId' onChange={(e) => setActiveCountry(+e.target.value)} value={activeCountry}>
              {
                countries?.map((e) => (
                  <option value={e.id} key={e.id}>{e.name}</option>
                ))
              }
            </select>
          </div>
          <Input name='telephone' type='telephone' label='Telephone' pattern='^\+[1-9]{1}[0-9]{3,14}$' defaultValue={shippingData?.telephone} />
        </form>
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
