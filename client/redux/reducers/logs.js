const initialState = {
  list: []
}

export default (state = initialState, action) => {
  if (action.type.indexOf('@@') !== 0) {
    const log = {
      time: `${+new Date()}`,
      title: action
    }
    fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(log)
    })
    return {
      ...state,
      list: [...state.list, log]
    }
  }

  return state
}

function createTitle(action) {
  switch (action.type) {
    case 'ADD_TO_SELECTION': {
      return ''
    }
  }
}
