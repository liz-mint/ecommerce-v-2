const initialState = {
  list: [],
  selected: {},
  rates: {},
  baseRate: 'EUR',
  totalCount: 0,
  totalPrice: 0,
  pagesCount: 0
}

const GET_PRODUCTS = '@@GET_PRODUCTS'
const GET_RATES = '@@GET_RATES'
const GET_PRODUCTS_COUNT = 'GET_PRODUCTS_COUNT'
const SET_BASE_RATE = 'SET_BASE_RATE'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, list: action.list, pagesCount: action.pages }
    case ADD_TO_SELECTION: {
      const amount =
        typeof state.selected[action.id] === 'undefined' ? 0 : state.selected[action.id].count
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.id]: {
            count: amount + 1,
            title: action.title,
            price: action.price,
            image: action.image
          }
        },
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.price
      }
    }
    case REMOVE_FROM_SELECTION: {
      const newSelected = {
        ...state.selected,
        [action.id]: {
          ...state.selected[action.id],
          count: state.selected[action.id].count - 1
        }
      }
      if (newSelected[action.id].count <= 0) {
        delete newSelected[action.id]
      }

      return {
        ...state,
        selected: newSelected,
        totalCount: state.totalCount - 1,
        totalPrice: state.totalPrice - action.price
      }
    }
    case GET_RATES:
      return { ...state, rates: { ...action.exchanges.rates, [action.exchanges.base]: 1 } }
    case SET_BASE_RATE:
      return { ...state, baseRate: action.baseRate }
    case GET_PRODUCTS_COUNT:
      return { ...state, productCount: action.count }
    case CALC_TOTAL_PRICE_COUNTS: {
      const getPrice = (id) => {
        return state.list.find((item) => item.id === id).price
      }
      const totalCount = Object.values(state.selected).reduce((total, count) => total + count, 0)
      const totalPrice = Object.keys(state.selected).reduce((sum, id) => {
        return sum + state.selected[id] * (getPrice(id) * state.rates[state.baseRate]).toFixed(2)
      }, 0)
      return { ...state, totalPrice, totalCount }
    }
    default:
      return state
  }
}

export function getProducts(params) {
  return (dispatch) => {
    fetch(`/api/v1/products?${new URLSearchParams(params)}`)
      .then((res) => res.json())
      .then(({ list, pages }) => dispatch({ type: GET_PRODUCTS, list, pages }))
      .catch(() => console.log('products fail'))
  }
}

export function getCountOfProducts() {
  return (dispatch) => {
    fetch('/api/v1/products-count')
      .then((res) => res.json())
      .then((count) => dispatch({ type: GET_PRODUCTS_COUNT, count }))
      .catch(() => console.log('products-count fail'))
  }
}

export function addSelection({ id, title, price, image }) {
  return { type: ADD_TO_SELECTION, id, title, price, image }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}

export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => dispatch({ type: GET_RATES, exchanges: rates }))
      .catch(() => console.log('get rates fail'))
  }
}

export function setBaseRate(newBase) {
  return { type: SET_BASE_RATE, baseRate: newBase }
}
