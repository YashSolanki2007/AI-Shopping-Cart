// Imports
import { React, useState, useEffect } from 'react';
import './App.css';
import Cart from './Cart';
import alanBtn from '@alan-ai/alan-sdk-web';
import Products from './Products';

function App() {

  // List of all items available
  const items = [
    { name: "MacBook Pro", price: 5000 },
    { name: 'MacBook Air', price: 4500 },
    { name: "Lenovo Thinkpad", price: 4000 },
    { name: "Nvidia 3090 ti graphics card", price: 2000 },
    { name: "Nvidia 3080 ti graphics card", price: 1700 },
    { name: "Nvidia 3060 ti graphics card", price: 1500 },
    { name: "Microsoft Surface Pro 2", price: 3000 },
    { name: "Ryzen 9 processor", price: 1500 },
    { name: "Dell Inspiron", price: 500 },
    { name: "Mac Pro", price: 9000 },
  ]

  // All the states for the website 
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [cost, setCost] = useState(0);
  const [name, setName] = useState();

  // Integrating the alan ai to the website 
  // Calling the useEffect hook when the webpage loads
  useEffect(() => {
    // Getting the name of the user on entry 
    const userName = prompt("Enter your User Name: ");

    // Checking to see if the user name is blanck or not 
    if (userName === "") {
      setName(['Anonymous']);
    }

    else {
      setName([userName]);
    }

    alanBtn({
      key:
        "b3e596f6f5cf7f599dc43b4c787022a52e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData)
        if (commandData.command === "getShop") {
          setProducts(commandData.data)
          console.log(commandData)
        }
        else if (commandData.command === "addToCart") {
          setCart((currentCart) => [...currentCart, commandData.data])
          let price = commandData.data.price;
          var intPrice = parseInt(price);
          console.log(typeof (intPrice));
          setCost((cartCost) => {
            var intCartCost = parseInt(cartCost);
            return intCartCost + intPrice
          });
        }
      },
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello {name} welcome to AI Shopper</h1>
      <h3>The Total cost is - {cost}</h3>
      <br /><br /><hr />
      <h3>Accessories Available:</h3><br /><br />
      {/* Mapping the products available and returning them  */}
      {products.map((product) => (
        <Products name={product.name} productName={product.name} price={product.price} />
      ))}
      <br /><br /><hr />
      <h3>Cart:</h3><br /><br />
      {cart.map((cartItem) => (
        <Cart price={cartItem.price} name={cartItem.name} itemName={cartItem.name} itemPrice={cartItem.price} />
      ))}
    </div>
  );
}

export default App;
