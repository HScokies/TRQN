import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CatalogPage, ProductPage, AdminPage, CartPage, AuthPage, ProfilePage } from 'pages/exports'
import { Header, Footer } from "src/components";
import { AuthContext } from "./AuthContext";
import { AuthRoute, AdminRoutes, UserRoutes } from "./PrivateRoutes";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";



const App = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [randomProducts, setRandomProducts] = useState([])
    useEffect(() => {
        const checkIfAdmin = () => {
            api.get("/users/displayDashboard", { withCredentials: true })
                .then((res: AxiosResponse) => {
                    setIsAdmin(res.data)
                })
                .catch((e: AxiosError) => {

                })
        }
        const getRandomProducts = () => {
            api.get("/products/random=3")
                .then((res) => {
                    setRandomProducts(res.data)
                })
                .catch((e) => {

                })
        }
        getRandomProducts();
        checkIfAdmin()
    }, [isAdmin])

    return (
        <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<AdminRoutes />}>
                        <Route path="/dashboard" element={<AdminPage />} />
                    </Route>
                    <Route element={<UserRoutes />}>
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/profile" element={<ProfilePage/>} />
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
