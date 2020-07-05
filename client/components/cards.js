import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

import { addSelection, removeSelection } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const { list, baseRate: currency, rates, selected } = useSelector((s) => s.products)
  return (
    <div className="flex -mx-5 flex-wrap mt-5">
      {list.map((product) => {
        return (
          <div className="w-1/4 px-2" key={product.title}>
            <div className="card flex w-full self-stretch max-w-sm flex-col items-center overflow-hidden border border-1 border-gray-600 mt-3 p-3 pb-4">
              <img
                className="card__image w-full h-64 object-cover object-center"
                src={product.image}
                alt={product.title}
              />

              <div className="py-2">
                <div className="card__title font-bold text-xl leading-none mb-2">
                  <a>{product.title}</a>
                </div>
              </div>
              <div className="py-2">
                <span className="card__price inline-block px-3 py-1 text-sm font-bold text-gray-700 mr-2">
                  {(product.price * rates[currency]).toFixed(2)}
                </span>
                <span className="currency inline-block px-3 py-1 text-sm font-bold text-gray-700 mr-2">
                  {currency}
                </span>
              </div>

              <div
                className={`amount flex px-6 py-2 mx-auto ${
                  typeof selected[product.id] === 'undefined' ? 'hidden' : ''
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(removeSelection(product.id))
                    // dispatch(calcTotalPriceAndCounts())
                  }}
                  className="border border-black px-3"
                  type="button"
                >
                  -
                </button>

                <div className="card__product-amount px-3 mx-3">
                  {typeof selected[product.id] === 'undefined' ? 0 : selected[product.id].count}
                </div>

                <button
                  onClick={() => {
                    dispatch(addSelection(product))
                    // dispatch(calcTotalPriceAndCounts())
                  }}
                  className="border border-black px-3"
                  type="button"
                >
                  +
                </button>
              </div>

              <div
                className={`px-6 py-2 mx-auto ${
                  typeof selected[product.id] === 'undefined' ? '' : 'hidden'
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(addSelection(product))
                    // dispatch(calcTotalPriceAndCounts())
                  }}
                  className="border border-black bg-blue-500 text-white px-3"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards
