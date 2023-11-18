import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CatalogPage, ProductPage, AdminPage, CartPage, AuthPage } from 'pages/exports'
import { Header, Footer } from "src/components";
import { AuthContext } from "./AuthContext";
import { PrivateRoutes, AuthRoute } from "./PrivateRoutes";
import api from "./api/axiosConfig";
import { useContext, useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";



const App = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [randomProducts, setRandomProducts] = useState([])
    useEffect(() => {
        const checkIfAdmin = () => {
            api.get("/users/displayDashboard")
                .then((res: AxiosResponse) => {
                    console.log("res:", res)
                })
                .catch((e: AxiosError) => {
                   
                })
        }
        const getRandomProducts = () => {
            api.get("/products/random=3")
            .then((res) => {
                console.log(res.data)
                setRandomProducts(res.data)
            })
            .catch((e) => {
                console.error(e)
            })
        }
        getRandomProducts(); 
        checkIfAdmin()
    }, [])

    return (
        <AuthContext.Provider value={isAdmin}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<AdminPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Route>
                    <Route element={<AuthRoute />}>
                        <Route path="/auth" element={<AuthPage />} />
                    </Route>

                    <Route path="/" element={<MainPage cards={randomProducts} />} />
                    <Route path="/catalog/:category" element={<CatalogPage />} />
                    <Route path="/product/:SKU" element={<ProductPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
