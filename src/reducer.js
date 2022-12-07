//state = current state before the update, action what we are trying to do
const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] }
  }

  if (action.type === "REMOVE") {
    return {
      ...state, // we are preserving our currnet state and change just the "cart:"
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    } // if the item id in our cart does not match the action.payload it will be returned otherwise not so it will be removed
  }

  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return {
      ...state,
      cart: tempCart,
    }
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }

        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return {
      ...state,
      cart: tempCart,
    }
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        cartTotal.total += itemTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true }
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false }
  }

  return state
}

export default reducer
