import { useState } from 'react';
import Input from 'src/components/input/index';
import './style.scss'

const CartPage = () => {
    const handleSubmit = () => {
        if (email.length == 0){
            setEmailError("Email address is a required field.")
        }
    }

    const[email, setEmail] = useState('')
    const[emailError, setEmailError] = useState<string | undefined>(undefined)
    const validateEmail = (value : string) => {
        if (value.length == 0) return;
        let isValid = String(value).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(isValid == null){
            setEmailError("Email address is not valid.")
        }
        else{
            setEmailError(undefined)
        }
    }

    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
        <Input title="Email" isRequired={true} errorMessage={emailError} value={email} onchange={setEmail} onblur={validateEmail} />
        <input type="submit" value="send"/>
        </form>
    );
}

export default CartPage