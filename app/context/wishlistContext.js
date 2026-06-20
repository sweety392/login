"use client";

import {createContext, useContext,useState} from "react";



const WishlistContext =createContext();



export const WishlistProvider

=

({children})=>{


const[wishList,setWishList]=useState([]);




const addToWishlist =(product)=>{
  const exist = wishList.find((item)=>item._id===product._id)
  if(exist){
return;
  }
    
  setWishList([...wishList,product])

}



const removeWishList = (product)=>{
  setWishList(wishList.filter((item)=>item._id!== product._id))

}


return(

<WishlistContext.Provider

value={

{

wishList,

addToWishlist,

removeWishList

}

}

>

{children}

</WishlistContext.Provider>

)


}



export const useWishlist=()=>{

return useContext(

WishlistContext

)

}