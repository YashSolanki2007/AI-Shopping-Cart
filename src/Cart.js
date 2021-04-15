import React from 'react'

function Cart(props) {
    const price = props.price;
    return (
        <div key={props.name}>
            {props.itemName} - {props.itemPrice}
        </div>
    )
}

export default Cart
