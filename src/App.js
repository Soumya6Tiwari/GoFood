
import React from 'react';
import './App.css';
import Home from './screens/Home';
import { CartProvider } from './components/ContextReducer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.jsx';
import MyOrder from './screens/MyOrder.jsx';

function App() {
  return (
    // hum isko cartprovider ke andar wrap karenge to make it global ki app me kahi bhi dispatch dikhe ya kahi bhi state dikhe  to pta hoga ki kya hai ye  
    <CartProvider>       
      <Router>
    <div>

        <Routes>
             
             <Route exact path="/"   element={<Home/>} />
             <Route exact path="/login"   element={<Login/>} />
             <Route exact path="/signup"   element={<Signup/>} />
             <Route exact path="/createuser"   element={<Signup/>} />
             <Route exact path="/myOrder"   element={<MyOrder/>} />
            


        </Routes>

    </div>
    </Router>
    </CartProvider>
    
    
  );
}

export default App;




