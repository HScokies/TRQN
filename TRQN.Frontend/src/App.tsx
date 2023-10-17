import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, CatalogPage } from 'pages/exports'
import { Header, Footer } from "src/components";
import Placeholder from 'src/assets/prod_placeholder.json'


const App = () => {
    return (
        <BrowserRouter>
            <Header isAdmin={true} />
            <Routes>
                <Route path="/" element={<MainPage cards={[Placeholder, Placeholder, Placeholder]} />} />
                <Route path="/catalog/:category" element={<CatalogPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
