import React from 'react'

function Products(props) {
    return (
        <div key={props.name}>
            {props.productName} - {props.price}
        </div>
    )
}

export default Products
