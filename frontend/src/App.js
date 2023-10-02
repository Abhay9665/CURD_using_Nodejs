import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductsList';
import UpdateProduct from './components/UpdateProduct';
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path='/' element={<ProductList />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct />} />
          <Route path='/logout' element={<h2>logout </h2>} />
          <Route path='/profile' element={<h2>profile </h2>} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
