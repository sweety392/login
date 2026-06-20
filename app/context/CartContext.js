"use client";

import {

createContext,

useContext,

useState,
useEffect

} from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {

const [cart, setCart] = useState([]);
useEffect(()=>{
  localStorage.setItem("cart",JSON.stringify(cart))

},[cart])
useEffect(()=>{
  const storeItem = localStorage.getItem("cart")
  if(storeItem){
    setCart(JSON.parse(storeItem))
  }

},[])


const addToCart = (product)=>{

const exist = cart.find(

(item)=>item._id===product._id

)


if(exist){

setCart(

cart.map(

(item)=>

item._id===product._id

?

{

...item,

quantity:item.quantity+1

}

:

item

)

)

}

else{

setCart([

...cart,

{

...product,

quantity:1

}

])

}

}
const increaseQuantity = (id)=>{
  setCart(cart.map((item)=>item._id===id

  ? {...item, quantity:item.quantity+1}: item))

}
const decreaseQuantity=(id)=>{

setCart(

cart.map(

(item)=>

item._id===id

?

{

...item,

quantity:

item.quantity>1

?

item.quantity-1

:

1

}

:

item

)

)

}
const removeCart = (id)=>{
  setCart(cart.filter((item)=>item._id!==id))

}
const totalPrice = cart.reduce((acc,item)=>acc+ item.price *item.quantity,0)



return(

<CartContext.Provider

value={{

cart,

addToCart,
increaseQuantity,decreaseQuantity,removeCart,totalPrice

}}

>

{children}

</CartContext.Provider>

)

};   

export const useCart = ()=>{

return useContext(CartContext);

};