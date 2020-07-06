import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { getProducts, getRates } from '../redux/reducers/products'

import Header from './header'
import Cards from './cards'
import Footer from './footer'

const Home = () => {
  const dispatch = useDispatch()
  const pagesCount = useSelector((s) => s.products.pagesCount)

  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    perPage: 12,
    sort: 'default'
  })

  const PageClickHandler = (e) => {
    setPaginationParams({ ...paginationParams, page: e.selected + 1 })
  }

  const changeSortType = (type) => {
    setPaginationParams({ ...paginationParams, sort: type })
  }

  useEffect(() => {
    dispatch(getRates())
  }, [])

  useEffect(() => {
    dispatch(getProducts(paginationParams))
  }, [paginationParams])

  return (
    <div>
      <Header />
      <div className="container mx-auto py-6 px-4">
        <div>
          <button
            onClick={() => {
              changeSortType('name')
            }}
            type="button"
            className="border-none text-blue-500 hover:text-indigo-600 active:outline-none p-1 mr-6"
          >
            A - Z
          </button>
          <button
            onClick={() => {
              changeSortType('price')
            }}
            type="button"
            className="border-none text-blue-500 hover:text-blue-800 active:outline-none p-1 mr-6"
          >
            Price &#8595;
          </button>
        </div>
        <Cards />

        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pagesCount}
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
