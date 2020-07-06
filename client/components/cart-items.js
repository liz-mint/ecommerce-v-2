import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addSelection, removeSelection } from '../redux/reducers/products'

const CartItems = () => {
  const dispatch = useDispatch()
  const { baseRate: currency, rates, selected: items, totalPrice, totalCount } = useSelector(
    (s) => s.products
  )

  return (
    <div className="flex flex-col">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tfoot>
              <tr>
                <th colSpan="2"> </th>
                <th className="product__amout px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-900 uppercase tracking-wider">
                  {totalCount}
                </th>
                <th
                  id="total-amount"
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-md leading-4 font-bold text-gray-900 uppercase tracking-wider"
                >
                  {totalPrice}
                </th>
              </tr>
            </tfoot>

            <tbody className="bg-white">
              {Object.keys(items).map((id) => {
                const price = (items[id].price * rates[currency]).toFixed(2)
                return (
                  <tr key={id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="product__image h-10 w-10"
                            src={items[id].image}
                            alt={items[id].title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="product__title text-sm leading-5 font-medium text-gray-500">
                            {items[id].title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="product__price text-sm leading-5 text-gray-900">
                        {price} {currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="amount flex mx-auto">
                        <button
                          onClick={() => {
                            dispatch(removeSelection(id))
                          }}
                          className="product__remove border border-black px-3"
                          type="button"
                        >
                          -
                        </button>

                        <div className="card__product-amount px-3 mx-3">{items[id].count}</div>

                        <button
                          onClick={() => {
                            dispatch(addSelection(id))
                          }}
                          className="border border-black px-3"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="product__total_price px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-900">
                      {price * items[id].count} {currency}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CartItems
