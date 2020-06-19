import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getProducts, getRates, SortByPrice, SortByName } from '../redux/reducers/products'

import Header from './header'
import Cards from './cards'
import Footer from './footer'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])
  return (
    <div>
      <Header />
      <div className="container mx-auto py-6 px-4">
        <div>
          <button
            onClick={() => {
              dispatch(SortByName())
            }}
            type="button"
            className="border-none text-blue-500 hover:text-indigo-600 active:outline-none p-1 mr-6"
          >
            A - Z
          </button>
          <button
            onClick={() => {
              dispatch(SortByPrice())
            }}
            type="button"
            className="border-none text-blue-500 hover:text-blue-800 active:outline-none p-1 mr-6"
          >
            Price &#8595;
          </button>
        </div>
        <Cards />
      </div>
      <Footer />
    </div>
  )
}

export default Home
