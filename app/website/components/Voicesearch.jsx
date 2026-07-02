"use client";

import { FiMic } from "react-icons/fi";

export default function VoiceSearch({

setKeyword,

setIsListening,

isListening

}){

const startListening=()=>{

const SpeechRecognition=

window.SpeechRecognition ||

window.webkitSpeechRecognition;


if(!SpeechRecognition){

alert("Voice Search not supported");

return;

}


const recognition=

new SpeechRecognition();


recognition.lang="en-IN";

recognition.continuous=false;

recognition.interimResults=false;

recognition.maxAlternatives=1;



recognition.onstart=()=>{

setIsListening(true);

};



recognition.onresult=(event)=>{

const transcript=

event.results[0][0].transcript;


setKeyword(

transcript

);

};



recognition.onerror=(event)=>{

console.log(

event.error

);

setIsListening(false);

};



recognition.onend=()=>{

setIsListening(false);

};



recognition.start();

};



return (
  <button
    type="button"
    onClick={startListening}
    className={`
      flex
      items-center
      justify-center
      w-11
      h-11
      rounded-full
      transition-all
      duration-300
      shadow-md
      mx-2

      ${
        isListening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-[#3BB77E] text-white hover:scale-110 hover:shadow-lg"
      }
    `}
  >
    <FiMic size={20} />
  </button>
);

}