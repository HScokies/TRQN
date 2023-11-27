import './style.scss'
import { useEffect, useState } from 'react';
import api from 'src/api/axiosConfig';
import Input from 'src/components/input';
import Mock from './mock.json'

const ProfilePage = () => {
    const [activeCountry, setActiveCountry] = useState<number>(-1)

    const [countries, setCountries] = useState<ICountries[]>()

    useEffect(() => {
        api.get("/countries")
            .then((res) => {
                setCountries(res.data)
                //setActiveCountry((res.data[0] as ICountries).id) // get user data
                setActiveCountry(Mock.country.id)
            })
            .catch((e) => {

            })
    }, [])

    return (
        <div className='profile-page'>
            <div className='profile-page_image-container'>
                <div>
                    <img src={Mock.image} alt={Mock.image} />
                    <svg fill='graysmoke' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M18.148,7.188c-.441-.099-.807-.379-1.001-.767-1.614-3.223-5.101-4.948-8.675-4.278-3.135,.581-5.669,3.079-6.306,6.217-.19,.933-.218,1.873-.083,2.796,.083,.567-.058,1.073-.386,1.388C.604,13.587,.001,14.99,0,16.495c0,3.136,2.364,5.5,5.5,5.5h10.736c4.131,0,7.611-3.234,7.759-7.211,.134-3.612-2.325-6.807-5.847-7.597Zm-1.912,13.808H5.5c-2.607,0-4.5-1.893-4.5-4.499,.001-1.229,.494-2.376,1.389-3.23,.565-.541,.815-1.362,.685-2.255-.118-.808-.093-1.633,.074-2.452,.556-2.742,2.77-4.926,5.508-5.434,.448-.083,.895-.123,1.335-.123,2.637,0,5.053,1.45,6.263,3.866,.33,.658,.94,1.13,1.677,1.296,3.052,.684,5.182,3.452,5.065,6.583-.127,3.445-3.159,6.248-6.759,6.248Zm-.969-8.849c.195,.195,.195,.512,0,.707-.098,.098-.226,.146-.354,.146s-.256-.049-.354-.146l-2.561-2.561v7.207c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-7.207l-2.561,2.561c-.195,.195-.512,.195-.707,0s-.195-.512,0-.707l2.707-2.707c.243-.242,.552-.359,.868-.401,.059-.025,.124-.039,.192-.039s.133,.014,.192,.039c.317,.041,.626,.158,.869,.401l2.707,2.707Z" /></svg>
                </div>
            </div>
            <Input type='text' label='* Full Name' defaultValue={Mock.fullName} />
            <Input type='text' label='* Street Address' defaultValue={Mock.street} />
            <Input type='text' label='Apartment, Suite, Unit, Building, Floor, etc.' pattern='[a-zA-Z0-9, ]+' defaultValue={Mock.apartment} />
            <Input type='text' label='* City' defaultValue={Mock.city} />
            <Input type='text' label='* Zip / Postal code' pattern='[0-9]{5,6}' defaultValue={Mock.zip} />
            <div className='select_container'>
                <label className='label'>
                    * Country or Region
                </label>
                <select onChange={(e) => setActiveCountry(+e.target.value)} value={activeCountry}>
                    {
                        countries?.map((e) => (
                            <option value={e.id} key={e.id}>{e.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

export default ProfilePage