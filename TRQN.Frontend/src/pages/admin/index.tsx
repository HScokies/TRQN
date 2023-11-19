import { useEffect, useState, useContext } from 'react';
import './style.scss';
import { AuthContext } from 'src/AuthContext';
import api from 'src/api/axiosConfig';

interface IUser{
    email: string,
    password: string
}

function AdminPage() {
    const [userData, setUserData] = useState<IUser[]>([])
    const [search, setSearch] = useState("");
    const { setIsAdmin } = useContext(AuthContext)

    useEffect(() => {
        const email = search.length > 0? `/${search}` : "";
        const url = "users"+email
        api.get(url, {withCredentials: true})
        .then((res) => {
            console.log(res)
            setUserData(res.data)
        })
    }, [search])

    return (
        <div className="app">
            <input
                type="text"
                className="search-input"
                placeholder="userEmail@example.com"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="table">
                <tbody>
                    {userData.map((e, i) => (
                        <tr key={i}>
                            <td>{Object.values(e)[0]}</td>
                            <td>{Object.values(e)[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;