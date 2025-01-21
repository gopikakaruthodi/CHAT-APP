import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Api from "../../API/Api";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";

const ChatPage = () => {
  const { _id } = useParams();
  const api = Api();
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [rprofile, setrProfile] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null); // track the index of message with open dropdown

  // Create a ref to the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${api}/chat/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setMessages(data.chats);
      setSender(data.uid);
      setrProfile(data.receiver.profile);

      const res = await axios.get(`${api}/openchat/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
      navigate("/signin");
    }
  };

  const handleSend = async (id) => {
    if (newMessage.trim()) {
      const currentDate = new Date();
      const [date, time] = currentDate.toLocaleString().split(", ");
      const { data } = await axios.post(
        `${api}/addmessage/${id}`,
        { newMessage, date, time },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, { sender: "user", text: newMessage }]);
      setNewMessage("");
      fetchMessages();
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = async (messageId) => {
    try {
      const { data } = await axios.delete(`${api}/deletemessage/${messageId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((message) => message._id !== messageId)); // Remove message from state after deletion
    } catch (error) {
      console.log(error);
    }
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-900 to-blue-800">
      <header className="bg-transparent text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-white">
          Back
        </Link>
        <h1 className="text-2xl font-semibold">Chat here</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center ${
              sender === message.senderID ? "justify-end" : "justify-start"
            }`}
          >
            {sender !== message.senderID ? (
              <img
                src={rprofile}
                alt=""
                className="w-10 h-10 border rounded-full mr-2"
              />
            ) : (
              <></>
            )}
            <div
              className={`max-w-xs p-5 rounded-lg ${
                sender === message.senderID
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-200"
              } relative`}
            >
              {sender === message.senderID && (
                <RiArrowDownSFill
                  className="absolute top-2 right-2 w-6 h-5 cursor-pointer"
                  onClick={() => toggleDropdown(index)} // Open dropdown on click
                />
              )}

              <p>{message.message || message.message}</p>

              {dropdownIndex === index && (
                <div className="absolute top-10 right-0 text-white bg-gray-900 rounded-lg shadow-lg z-50 p-2">
                  <button
                    onClick={() => handleDelete(message._id)} // Delete the message
                    className="px-4 py-2 text-sm font-semibold text-violet-100 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* This div will act as the scroll-to element */}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-gray-900 border-t">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a message..."
          />
          <button
            onClick={() => handleSend(_id)}
            className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
