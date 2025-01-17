import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css"
import "leaflet/dist/leaflet.css";
import LandingPage from './Pages/LandingPage/LandingPage';
import Category from './Pages/LandingPage/Category/Category';


function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<LandingPage></LandingPage>}></Route>

            <Route path='/category' element={<Category></Category>}></Route>

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
