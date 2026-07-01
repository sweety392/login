"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BannerPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("Shop Now");
  const [buttonLink, setButtonLink] = useState("/products");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e)=>{
    const file = e.target.files[0];
    if(!file)
      return;
    setImage(file)
    setPreview(URL.createObjectURL(file))

  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!title || !subtitle || !image){
      toast.error("please all fields are required")
    return;
    }
    try{
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      
      formData.append("subtitle", subtitle);
      formData.append("buttonText", buttonText);
      formData.append("buttonLink", buttonLink);
      formData.append("image", image);
      
      const response =await axios.post("/api/banner", formData)
      if(response.data.success){
        toast.success("banner upload successfully")
        setTitle("");
        setSubtitle("");
        setButtonText("shop now")
        setButtonLink("/products"); 
        setImage(null); 
        
      }


    }catch(error){
      console.log(error)
      toast.error("upload failed")

    }finally{
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        Upload Banner
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg rounded-xl p-8"
      >
        <div>

          <label className="font-semibold">
            Banner Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Summer Collection"
          />

        </div>

        <div>

          <label className="font-semibold">
            Subtitle
          </label>

          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Flat 70% OFF"
          />

        </div>

        <div>

          <label className="font-semibold">
            Button Text
          </label>

          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Button Link
          </label>

          <input
            type="text"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />

        </div>

        <div>

          <label className="font-semibold">
            Banner Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-3"
          />

        </div>

        {preview && (
  <div className="w-full h-72 border rounded-xl overflow-hidden bg-gray-100 flex justify-center items-center">
    <img
      src={preview}
      alt="Preview"
      className="max-w-full max-h-full object-contain"
    />
  </div>
)}

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload Banner"}
        </button>

      </form>

    </div>
  );
}