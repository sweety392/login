"use client";

import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import VoiceSearch from "./Voicesearch";
import { useRef } from "react";

export default function SearchBar() {

const [keyword,setKeyword]=useState("");
const[debouncedKeyword, setDebouncedKeyword]=useState("");
const[liveSuggestion, setLiveSuggestion]=useState([]);
const[showDropdown, setShowDropdown]=useState(false);
const[loading,setLoading]=useState(false);
const[isListening, setIsListening]=useState(false)
const dropDownRef = useRef();


useEffect(()=>{
  const handleDropDown = (e)=>{
  if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
    setShowDropdown(false)

  };
  
  

}
document.addEventListener("mousedown", handleDropDown)
  return(()=>{
    document.removeEventListener("mousedown",handleDropDown)

  })

},[])

const router=useRouter();
useEffect(()=>{
  const timer= setTimeout(()=>{
 
    setDebouncedKeyword(keyword)
  
 


},500)
 return(()=>{
    clearTimeout(timer)
  })

},[keyword])

const fetchLiveSuggestions = async()=>{
  try{
   
    setLoading(true)
    
    const res= await axios.get(`/api/products?search=${debouncedKeyword}`)
    if(res.data.success){
      setLiveSuggestion(res.data.products)
      setShowDropdown(true)
    }

  }catch(error){
    console.log(error)
  }finally{
    setLoading(false)
    
    
  }
}
useEffect(()=>{
  if(debouncedKeyword.trim()){
    fetchLiveSuggestions();
   
  }else{
    setLiveSuggestion([]);
    setLoading(false)
    setShowDropdown(false)
    
  }

},[debouncedKeyword])


const handleSearch=()=>{

if(!keyword.trim()) return;

router.push(

`/searchPage?q=${keyword}`

)

}


return (
  <div className="relative w-full max-w-3xl mx-auto" ref={dropDownRef}>
    <div
      className="
      flex
      items-center
      bg-white/90
      backdrop-blur-lg
      border
      border-gray-200
      rounded-full
      shadow-xl
      hover:shadow-2xl
      transition-all
      duration-300
      px-3
      h-16
    "
    >
      {/* Search Icon */}

      <FiSearch
        className="
        text-2xl
        text-[#3BB77E]
        ml-2
        mr-3
        "
      />

      {/* Input */}

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products, Brands & Categories..."
        className="
          flex-1
          outline-none
          bg-transparent
          text-gray-700
          placeholder:text-gray-400
          text-[16px]
        "
      />

      {/* Voice Search */}

      <VoiceSearch
        setKeyword={setKeyword}
        setIsListening={setIsListening}
        isListening={isListening}
      />

      {/* Divider */}

      <div className="h-8 w-px bg-gray-300 mx-4"></div>

      {/* Search Button */}

      <button
        onClick={handleSearch}
        className="
        px-7
        h-11
        rounded-full
        bg-gradient-to-r
        from-[#3BB77E]
        to-emerald-500
        text-white
        font-semibold
        shadow-lg
        hover:scale-105
        hover:shadow-xl
        transition-all
        duration-300
        "
      >
        Search
      </button>
    </div>

    {/* Dropdown */}

    {showDropdown && (
      <div
        className="
        absolute
        top-20
        w-full
        bg-white
        rounded-3xl
        shadow-2xl
        border
        border-gray-100
        overflow-hidden
        max-h-[420px]
        overflow-y-auto
        z-50
        "
      >
        {loading && (
          <div className="p-5 text-center text-gray-500">
            Searching...
          </div>
        )}

        {!loading && liveSuggestion.length === 0 && (
          <div className="p-5 text-center text-gray-500">
            No Products Found
          </div>
        )}

        {!loading &&
          liveSuggestion.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                router.push(`/searchPage?q=${item.title}`);
                setShowDropdown(false);
              }}
              className="
              flex
              items-center
              gap-4
              p-4
              hover:bg-green-50
              transition-all
              duration-200
              cursor-pointer
              border-b
              last:border-none
              "
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="
                w-16
                h-16
                rounded-xl
                object-cover
                border
                "
              />

              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.brand}
                </p>

                <p className="text-[#3BB77E] font-bold mt-1">
                  ₹ {item.price}
                </p>
              </div>
            </div>
          ))}
      </div>
    )}
  </div>
);
}