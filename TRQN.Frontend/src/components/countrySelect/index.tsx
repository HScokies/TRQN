import { useState, useEffect } from 'react';
import data from './data.json';
import './style.scss';

interface Country {
    id: number;
    name: string;
}

const SelectComponent = () => {
    const [countries, setCountries] = useState<Country[]>([]);

        useEffect(() => {
            setCountries(data);
        }, []);

    return (
        <div className='select_container'>
            <label className='label'>* Country or Region</label>
            <select className='select'>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectComponent;
