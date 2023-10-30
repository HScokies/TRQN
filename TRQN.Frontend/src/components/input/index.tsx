import { useState } from 'react'
import './style.scss'



const Input = ({ title, isRequired, onchange, onblur, value, showError, errorMessage = undefined }) => {

    return (
        <div className={errorMessage==undefined ? "input" : "input error"}>
            <div className="input_info">
                <span className="input_info-title">{isRequired?"*":""}{title}</span>
                <span className="input_info-error">{errorMessage}</span>
            </div>
            <input type='text' onChange={(e) => {onchange(e.target.value)}} value={value} onBlur={() => onblur(value)} />
        </div>
    );
}
export default Input
interface Props {
    title: string,
    isRequired: boolean,
    onchange: React.Dispatch<React.SetStateAction<string>>,
    onblur: (value: any) => void,
    value: string,
    errorMessage: string
}