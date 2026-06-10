import React, { use, useState } from "react";
import axios from "axios"
export default function Hero() {
  const [userMsg, setuserMsg] = useState([]);
    const [message,setmessage] =  useState([])

  const handlechange = (e) => {
    setuserMsg(e.target.value);
  };

  const handleclick = async() => {
    if(userMsg.trim()=="")return 
    setmessage(prev=>[...prev,userMsg])
     setuserMsg("") 
    try{
    const res = await axios.post(`http://localhost:7004/user/query/${userMsg}`)
      setuserMsg("");
    }catch(error){
        console.log(error);
    }
  
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter" &&!e.shiftKey) {
      e.preventDefault(); 
      handleclick();
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-3xl pb-44">
        {/* user message */}
         <div className="space-y-4">  {/* Adds spacing between messages */}
          {message.map((msg, index) => (
            <div 
              key={index}
              className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit"
            >
              <h1>{msg}</h1>
            </div>
          ))}
        </div>

        {/* Assistent message */}
        <div className="max-w-fit">
          <h1>im fine, how are you?</h1>
        </div>

        {/* text area */}
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center bg-neutral-900 pb-2">
          <div className="bg-neutral-800 p-2 rounded-3xl w-full   max-w-3xl">
            <textarea
              className="w-full resize-none outline-0 p-3"
              onKeyDown={handleKeyPress}
              rows={2}
              name="msg"
              value={userMsg}
              onChange={handlechange}
            ></textarea>
            <div className="flex items-center justify-end">
              <button
                className="bg-white text-black p-2 rounded-full font-bold cursor-pointer  hover:bg-gray-300"
                onClick={handleclick}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
