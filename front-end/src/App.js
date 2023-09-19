import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp';
import PrivComp from './components/PrivComp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivComp />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>4</h1>} />
            <Route path="/profile" element={<h1>5</h1>} />
          
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />

    </div >
  );
}

export default App;
