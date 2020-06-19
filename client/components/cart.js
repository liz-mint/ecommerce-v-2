import React from 'react'

import {} from '../redux/reducers/products'
import Header from './header'
import CartItems from './cart-items'
import Footer from './footer'

const Cart = () => {
  return (
    <div>
      <Header />

      <div className="container mx-auto py-6 px-12">
        <CartItems />
      </div>
      <Footer />
    </div>
  )
}

export default Cart
