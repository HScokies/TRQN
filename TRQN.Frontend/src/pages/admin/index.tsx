import { useState } from 'react';
import './style.scss';
import productData from './placeholder.json';

function AdminPage() {
    return (
        <div className="app">
            <input
                type="text"
                className="search-input"
                placeholder="userEmail@example.com"
            />
            <table className="table">
                <tbody>
                    {productData.map((e, i) => (
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