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


return(

<div className="w-full max-w-2xl mx-auto">

  <div className="relative">

    {/* Search Icon */}

    <FiSearch

      className="

      absolute

      left-5

      top-1/2

      -translate-y-1/2

      text-gray-500

      text-xl

      "

    />



    {/* Input */}

    <input

      type="text"

      value={keyword}

      onChange={(e)=>

        setKeyword(

          e.target.value

        )

      }

      placeholder="Search products..."

      className="

      w-full

      h-14

      pl-14

      pr-32

      rounded-full

      border

      border-gray-300

      outline-none

      shadow-sm

      "

    />
    <VoiceSearch 
    setKeyword={setKeyword}
    setIsListening={setIsListening}
    isListening={isListening}
    
    />



    {/* Button */}

    <button

      onClick={handleSearch}

      className="

      absolute

      right-2

      top-1/2

      -translate-y-1/2

      bg-[#3BB77E]

      text-white

      px-6

      py-3

      rounded-full

      "

    >

      Search

    </button>





    {/* Dropdown */}

    {

      showDropdown

      &&

      (

        <div ref={dropDownRef}
        

          className="

          absolute

          top-16

          left-0

          w-full

          bg-white

          rounded-xl

          shadow-xl

          z-50

          max-h-96

          overflow-y-auto

          "

        >




          {

            loading

            &&

            <p

              className="p-4"

            >

              Searching...

            </p>

          }





          {

            !loading

            &&

            liveSuggestion.length===0

            &&

            (

              <p

                className="

                p-4

                text-gray-500

                "

              >

                No Results Found

              </p>

            )

          }





          {

            liveSuggestion.map((item)=>(

              <div

                key={item._id}

                onClick={()=>{

                  router.push(

                    `/searchPage?q=${item.title}`

                  );



                  setShowDropdown(false);

                }}

                className="

                flex

                items-center

                gap-4

                p-3

                hover:bg-gray-100

                cursor-pointer

                "

              >




                <img

                  src={

                    item.images?.[0]

                  }

                  alt={

                    item.title

                  }

                  className="

                  w-14

                  h-14

                  rounded

                  object-cover

                  "

                />





                <div>

                  <h2

                    className="font-semibold"

                  >

                    {item.title}

                  </h2>



                  <p

                    className="

                    text-gray-500

                    "

                  >

                    {item.brand}

                  </p>



                  <p

                    className="

                    text-[#3BB77E]

                    font-bold

                    "

                  >

                    ₹ {item.price}

                  </p>

                </div>

              </div>

            ))

          }



        </div>

      )

    }

  </div>

</div>
)
}