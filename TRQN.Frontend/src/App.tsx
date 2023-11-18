import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CatalogPage, ProductPage, AdminPage, CartPage, AuthPage } from 'pages/exports'
import { Header, Footer } from "src/components";
import { AuthContext } from "./AuthContext";
import { PrivateRoutes, AuthRoute } from "./PrivateRoutes";

import Placeholder from 'src/assets/prod_placeholder.json'
import { useContext } from "react";



const App = () => {
    return (
        <AuthContext.Provider value={true}>
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

                    <Route path="/" element={<MainPage cards={[Placeholder, Placeholder, Placeholder]} />} />
                    <Route path="/catalog/:category" element={<CatalogPage />} />
                    <Route path="/product/:SKU" element={<ProductPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
