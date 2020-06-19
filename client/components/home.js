import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { getProducts, getRates, SortByPrice, SortByName } from '../redux/reducers/products'

import Header from './header'
import Cards from './cards'
import Footer from './footer'

const Home = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)

  const [pagunationParams, setPagunationParams] = useState({
    offset: 0,
    currentPage: 1,
    perPage: 12,
    pageCount: Math.ceil(list.length / 12)
  })

  const PageClickHandler = (e) => {
    const selectedPage = e.selected
    const offset = selectedPage * pagunationParams.perPage

    setPagunationParams({ ...pagunationParams, currentPage: selectedPage - 1, offset })
  }

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])

  useEffect(() => {
    setPagunationParams({
      ...pagunationParams,
      pageCount: Math.ceil(list.length / pagunationParams.perPage)
    })
  }, [list.length])

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
        <Cards pagunationParams={pagunationParams} />

        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pagunationParams.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={PageClickHandler}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
      <Footer />
    </div>
  )
}

export default Home
