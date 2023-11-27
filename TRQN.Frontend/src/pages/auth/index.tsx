import { useContext, useState } from 'react';
import './style.scss'
import { AxiosError } from 'axios';
import api from 'src/api/axiosConfig';
import { IResponse } from 'src/interfaces';
import { AuthContext } from 'src/AuthContext';


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    const { setIsAdmin } = useContext(AuthContext)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const data = new FormData(e.target as HTMLFormElement)
        isLogin ? PostData("users/login", data) : PostData("users/create", data);
    }

    const PostData = (url: string, data: FormData) => {
        api.post(url, data).then((res) => { console.debug(url, res.status); CheckIfAdmin()}).catch((e: AxiosError) => alert((e.response?.data as IResponse).message))
    }

    const CheckIfAdmin = () => {
        api.get("/users/displayDashboard")
        .then((res) => {
            setIsAdmin(res.data)
        })
        .catch((e: AxiosError) => {
        })
    }

    return (
        <form className="auth_form" onSubmit={(e) => handleSubmit(e)}>
            <div className="auth_form-switch">
                <a className={"auth_form-switch_login " + (isLogin ? "active" : "")} onClick={() => setIsLogin(true)}>Sign in</a>
                <a className={"auth_form-switch_signup " + (!isLogin ? "active" : "")} onClick={() => setIsLogin(false)}>Sign up</a>
            </div>
            <div className="auth_form-container">
                <div className="auth_form-container_input">
                    Email
                    <input type="email" name='email' required />
                </div>
                <div className="auth_form-container_input">
                    Password
                    <input type="password" name='password' required />
                </div>
            </div>
            <input type="submit" className="auth_form-submit" value={isLogin ? "Sign in" : "Sign up"} />
        </form>
    );
}

export default AuthPage;