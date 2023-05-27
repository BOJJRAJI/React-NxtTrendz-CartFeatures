import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let cost = 0
      cartList.forEach(item => {
        cost += item.quantity * item.price
      })

      return (
        <div className="summary-container">
          <h1 className="total-heading">
            Order Total:<span className="amount"> Rs {cost}/-</span>
          </h1>
          <p className="items-count">{cartList.length} Items in Cart</p>
          <button className="check-out-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
