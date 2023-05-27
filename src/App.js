import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(product => {
        if (product.id === id) {
          const updatedQuantity = product.quantity + 1
          return {...product, quantity: updatedQuantity}
        }
        return product
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productQuantity = cartList.find(item => item.id === id)

    if (productQuantity.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(product => {
          if (product.id === id) {
            const updatedQuantity = product.quantity - 1
            return {...product, quantity: updatedQuantity}
          }
          return product
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(item => item.id !== id)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(item => item.id === product.id)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === productObject.id) {
            const updatedQuantity = product.quantity + 1
            return {...item, quantity: updatedQuantity}
          }
          return product
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
