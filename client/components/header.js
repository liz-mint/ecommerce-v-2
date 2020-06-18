import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setBaseRate } from '../redux/reducers/products'

import Head from './head'

const Header = () => {
  const dispatch = useDispatch()
  const { rates } = useSelector((s) => s.products)

  return (
    <div>
      <Head />
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 text-white p-6">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" id="brand-name">
            <img src="images/logo.png" className="block h-12 w-12 mr-10" alt="logo" />
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {Object.keys(rates).map((currency) => {
              return (
                <button
                  key={currency}
                  onClick={() => {
                    dispatch(setBaseRate(currency))
                  }}
                  type="button"
                  className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                >
                  {currency}
                </button>
              )
            })}
          </div>
          <div className="flex items-center">
            <Link to="/basket">
              <img src="images/cart.svg" className="block h-8 w-8 mr-6" alt="cart icon" />
            </Link>

            {/* <div className="font-bold">
              <Link to="/basket" className="block">
                <span id="order-count">{totalCount}</span> items
              </Link>
              <span>
                {totalPrice} {baseRate}
              </span>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
