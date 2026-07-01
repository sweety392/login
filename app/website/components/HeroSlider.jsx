

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {

  const[banners,setBanners] =useState([]);
  const[loading,setLoading] =useState(true);
  useEffect(()=>{
    fetchBanner();

  },[])
  const fetchBanner = async()=>{
    try{
      const res= await axios.get("/api/banner")
      setBanners(res.data.banners)

    }catch(error){
      console.log(error)

    }
    finally{
      setLoading(false)

    }
  }

  if (loading) {

    return (

      <div className="h-[500px] flex justify-center items-center">

        Loading....

      </div>

    );

  }

  return (

    <Swiper

      modules={[Navigation, Pagination, Autoplay]}

      navigation

      pagination={{ clickable: true }}

      autoplay={{ delay: 3000 }}

      loop={true}

    >

      {

        banners.map((banner)=>(

          <SwiperSlide key={banner._id}>

            <div className="relative h-[500px]">

              <img

                src={banner.image}

                alt={banner.title}

                className="w-full h-full object-cover"

              />

              <div className="absolute inset-0 bg-black/40 flex items-center">

                <div className="ml-24 text-white">

                  <h1 className="text-6xl font-bold">

                    {banner.title}

                  </h1>

                  <p className="mt-4 text-2xl">

                    {banner.subtitle}

                  </p>

                  <button className="mt-8 bg-red-500 px-8 py-3 rounded-lg">

                    {banner.buttonText}

                  </button>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))

      }

    </Swiper>

  );

}