import { useState } from 'react';
import './style.scss'


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const handleInput = (e) => {
        const element = e.target;
        if (element.value.trim().length < 1) {
            element.classList.add("invalid")
        }
        else {
            element.classList.remove("invalid")
        }
    }

    return (
        <form className="auth_form">
            <div className="auth_form-switch">
                <a className={"auth_form-switch_login " + (isLogin ? "active" : "")} onClick={() => setIsLogin(true)}>Sign in</a>
                <a className={"auth_form-switch_signup " + (!isLogin ? "active" : "")} onClick={() => setIsLogin(false)}>Sign up</a>
            </div>
            <div className="auth_form-container">
                <div className="auth_form-container_input">
                    Email
                    <input type="email" required onBlur={(e) => handleInput(e)} />
                </div>
                <div className="auth_form-container_input">
                    Password
                    <input type="password" required onBlur={(e) => handleInput(e)} />
                </div>
            </div>
            <input type="submit" className="auth_form-submit" value={isLogin? "Sign in" : "Sign up"} />
        </form>
    );
}

export default AuthPage;