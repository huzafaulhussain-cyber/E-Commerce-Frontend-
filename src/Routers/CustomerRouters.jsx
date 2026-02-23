import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation.jsx'
import Homepage from '../components/Homepage/Homepage';
import Footer from '../components/Footer/Footer.jsx'
import Product from '../components/Product/Product.jsx'
import Productdetail from '../components/Productdetail/Productdetail.jsx'
import Cart from '../components/Cart/Cart.jsx'
import Checkout from '../components/Checkout/Checkout.jsx'
import Order from '../components/Order/Order.jsx'
import OrderDetail from '../components/Order/OrderDetail.jsx'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import Services from '../components/Services/Services.jsx';
import Contact from '../components/Contact/Contact.jsx';
import Portfolio from '../components/Portfolio/Portfolio.jsx';
import Catalogue from '../components/Catalogue/Catalogue.jsx';
 
const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation />

            </div>
            <div>
                <Routes>

                    <Route path='/login' element={<Homepage />} />
                    <Route path='/register' element={<Homepage />} />
                    <Route path='/' element={<Homepage />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />} />
                    <Route path='/product/:productId' element={<Productdetail />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/account/order' element={<Order />} />
                    <Route path='/account/order/:orderId' element={<OrderDetail />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/contact' element={<Contact />} />
                     <Route path='/portfolio' element={<Portfolio />} />
                     <Route path='/catalogue' element={<Catalogue />} />

                    
                </Routes>
            </div>


            <div>
                <Footer />

            </div>

        </div>
    )
}

export default CustomerRouters