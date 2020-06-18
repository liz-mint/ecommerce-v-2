const initialState = {
  list: [],
  selected: {},
  rates: {},
  baseRate: 'EUR',
  totalCount: 0,
  totalPrice: 0
}

const GET_PRODUCTS = '@@GET_PRODUCTS'
const GET_RATES = '@@GET_RATES'
const SET_BASE_RATE = 'SET_BASE_RATE'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const SORT_BY_NAME = 'SORT_BY_NAME'
const CALC_TOTAL_PRICE_COUNTS = 'CALC_TOTAL_PRICE_COUNTS'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case ADD_TO_SELECTION:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.id]: (state.selected[action.id] || 0) + 1
        }
      }
    case REMOVE_FROM_SELECTION: {
      const newSelected = {
        ...state.selected,
        [action.id]: state.selected[action.id] - 1
      }
      if (newSelected[action.id] <= 0) {
        delete newSelected[action.id]
      }
      return {
        ...state,
        selected: newSelected
      }
    }
    case GET_RATES:
      return { ...state, rates: { ...action.exchanges.rates, [action.exchanges.base]: 1 } }
    case SET_BASE_RATE:
      return { ...state, baseRate: action.baseRate }
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
    case SORT_BY_PRICE:
      return { ...state, list: [...state.list.sort((a, b) => b.price - a.price)] }
    case SORT_BY_NAME: {
      const sortFunc = (a, b) => {
        if (a.title > b.title) return 1
        if (a.title < b.title) return -1
        return 0
      }
      return {
        ...state,
        list: [...state.list.sort(sortFunc)]
      }
    }

    default:
      return state
  }
}

export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((list) => dispatch({ type: GET_PRODUCTS, list }))
      .catch(() => console.log('fail'))
  }
}

export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
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

export function calcTotalPriceAndCounts() {
  return { type: CALC_TOTAL_PRICE_COUNTS }
}

export function setBaseRate(newBase) {
  return { type: SET_BASE_RATE, baseRate: newBase }
}

export function SortByPrice() {
  return { type: SORT_BY_PRICE }
}

export function SortByName() {
  return { type: SORT_BY_NAME }
}
