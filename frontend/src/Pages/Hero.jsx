import React, { use, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useRef } from "react";
export default function Hero() {
  const  threadId =useRef(uuidv4())
  const [userMsg, setuserMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handlechange = (e) => {
    setuserMsg(e.target.value);
  };

  const handleclick = async () => {
    if (isLoading || userMsg.trim() == "") return;
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setuserMsg("");
    setisLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:7004/user/chat`,
        { message: userMsg,
          threadId:threadId.current
        },
        { withCredentials: true },
      );
      setMessages((prev) => [
        ...prev,
        { role: "Assistent", content: res.data.message },
      ]);
      setuserMsg("");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleclick();
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-3xl pb-44">
        {/* user message */}
        <div className="space-y-4">
          {" "}
          {/* Adds spacing between messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`rounded-xl p-3  max-w-fit ${msg.role === "user" ? "bg-neutral-800 ml-auto" : "bg-neutral-900 mr-auto"} `}
            >
              <h1>{msg.content}</h1>
            </div>
          ))}
        </div>
        {/* loading or thinking */}
        {isLoading && (
          <div className="bg-neutral-700 mr-auto rounded-xl p-3 max-w-fit">
            <p className="text-gray-300">Thinking...</p>
          </div>
        )}

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
