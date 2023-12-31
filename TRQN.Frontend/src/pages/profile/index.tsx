import './style.scss'
import { useEffect, useState, useContext } from 'react';
import api, { BASE_URL } from 'src/api/axiosConfig';
import Input from 'src/components/input';
import { logout } from 'src/components/header';
import { ICountries } from '../cart';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/AuthContext';

export interface IProfile{
	email: string
	fullName: string,
	street: string,
	apartment: string,
	city: string,
	zip: string,
	country: ICountries,
	telephone: string,
	image: string
}
const ProfilePage = () => {
    const { setIsAdmin } = useContext(AuthContext)
    const [activeCountry, setActiveCountry] = useState<number>(-1)
    const navigate = useNavigate()
    const [countries, setCountries] = useState<ICountries[]>()
    const [profile, setProfile] = useState<IProfile | null>(null)
    const [avatar, setAvatar] = useState<string>()

    useEffect(() => {
        const getCountries = () => {
            api.get("/countries")
            .then((res) => {
                setCountries(res.data)
            })
            .catch((e) => {

            })
        }
        const getProfile = () => {
            api.get("/users/profile")
            .then((res)=>{
                setProfile(res.data)
                setAvatar(BASE_URL+"/files/images/"+((res.data as unknown) as IProfile).image)
                setActiveCountry(((res.data as unknown) as IProfile).country.id)
            }).catch((e) => {

            })
        }

        getCountries()
        getProfile()

    }, [])
    
    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        api.post("/users/profile", data)
        .then(() => alert("Updated successfully"))
        .catch((e : AxiosError) => {
            alert(e.response?.statusText)
        })
    }

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return

        const file = files[0]
        var reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target?.result as string)
        }
        reader.readAsDataURL(file);
    }
    return (
        <div className='profile-page'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='profile-page_image-container'>
                    <div>
                        <img src={avatar} alt={avatar} />
                        <svg fill='graysmoke' xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M18.148,7.188c-.441-.099-.807-.379-1.001-.767-1.614-3.223-5.101-4.948-8.675-4.278-3.135,.581-5.669,3.079-6.306,6.217-.19,.933-.218,1.873-.083,2.796,.083,.567-.058,1.073-.386,1.388C.604,13.587,.001,14.99,0,16.495c0,3.136,2.364,5.5,5.5,5.5h10.736c4.131,0,7.611-3.234,7.759-7.211,.134-3.612-2.325-6.807-5.847-7.597Zm-1.912,13.808H5.5c-2.607,0-4.5-1.893-4.5-4.499,.001-1.229,.494-2.376,1.389-3.23,.565-.541,.815-1.362,.685-2.255-.118-.808-.093-1.633,.074-2.452,.556-2.742,2.77-4.926,5.508-5.434,.448-.083,.895-.123,1.335-.123,2.637,0,5.053,1.45,6.263,3.866,.33,.658,.94,1.13,1.677,1.296,3.052,.684,5.182,3.452,5.065,6.583-.127,3.445-3.159,6.248-6.759,6.248Zm-.969-8.849c.195,.195,.195,.512,0,.707-.098,.098-.226,.146-.354,.146s-.256-.049-.354-.146l-2.561-2.561v7.207c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-7.207l-2.561,2.561c-.195,.195-.512,.195-.707,0s-.195-.512,0-.707l2.707-2.707c.243-.242,.552-.359,.868-.401,.059-.025,.124-.039,.192-.039s.133,.014,.192,.039c.317,.041,.626,.158,.869,.401l2.707,2.707Z" /></svg>
                        <input onChange={(e) => handleAvatar(e)} type="file" accept="image/png, image/jpeg" name='image'/>
                    </div>
                </div>
                <Input type='text' name='fullName' label='* Full Name' defaultValue={profile?.fullName} />
                <Input type='text' name='street' label='* Street Address' defaultValue={profile?.street} />
                <Input type='text' name='apartment' label='Apartment, Suite, Unit, Building, Floor, etc.' pattern='[a-zA-Z0-9, ]+' defaultValue={profile?.apartment} />
                <Input type='text' name='city' label='* City' defaultValue={profile?.city} />
                <Input type='text' name='zip' label='* Zip / Postal code' pattern='[0-9]{5,6}' defaultValue={profile?.zip} />
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
                <Input name='telephone' type='telephone' label='Telephone' defaultValue={profile?.telephone} pattern='^\+[1-9]{1}[0-9]{3,14}$' />
                <button  type="submit" className='profile-page-button save'>Save</button>
            </form>
            <button className='profile-page-button exit' onClick={() => logout(navigate, setIsAdmin)}>Log out</button>
        </div>
    );
}

export default ProfilePage