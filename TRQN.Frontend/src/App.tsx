import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MainPage} from 'pages/exports'
import Placeholder from 'src/assets/prod_placeholder.json'


const App = () => {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage cards={[Placeholder,Placeholder,Placeholder]}/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
