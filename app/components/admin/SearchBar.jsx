"use client";

export default function SearchBar({

search,

setSearch

}){

return(

<input

type="text"

placeholder="Search..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="

w-80

border

border-gray-300

rounded-lg

px-4

py-2

outline-none

focus:border-[#3BB77E]

"

/>

)

}