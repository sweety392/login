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



return(

<button

type="button"

onClick={startListening}

className="

absolute

right-24

top-1/2

-translate-y-1/2

text-2xl

"

>

<FiMic

className={

isListening

?

"text-red-500"

:

"text-gray-600"

}

/>

</button>

)

}