import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Api from "../../API/Api";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";


const ChatPage = () => {
  const { _id } = useParams();
  const api = Api();
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [rprofile, setrProfile] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null); // track the index of message with open dropdown
  const [lastMessageSender, setLastMessageSender] = useState(null); // Track the sender of the last message

  // Create a ref to the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessageSender(messages[messages.length - 1].senderID); // Update the last sender
    }
  }, [messages]);

  useEffect(() => {
    if (lastMessageSender === sender && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll only for the current user
    }
  }, [lastMessageSender, sender]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${api}/chat/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setMessages(data.chats);
      setSender(data.uid);
      setrProfile(data.receiver.profile);
      setUsername(data.receiver.username)

      const res = await axios.get(`${api}/openchat/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
      // navigate("/signin");
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
    if (messages.length > 0) {
      setLastMessageSender(messages[messages.length - 1].senderID); // Update the last sender
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-900 to-blue-800">
  <header className="bg-transparent text-white p-4 flex justify-between items-center">
    <div className="flex items-center ">
      <Link to="/" className="text-xl font-semibold text-white ">
        <FaArrowLeft />
      </Link>
      <div className="flex items-center">
        <img src={rprofile} alt="" className="w-10 h-10 border rounded-full mx-3" />
        <span className="font-semibold">{username}</span>
      </div>
    </div>
    <h1 className="text-2xl font-semibold">Chat here</h1>
  </header>

  {/* Messages Container */}
  <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Render messages */}
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-center ${
            sender === message.senderID ? "justify-end" : "justify-start"
          }`}
        >
          {sender !== message.senderID && (
            <img
              src={rprofile}
              alt=""
              className="w-10 h-10 border rounded-full mr-2"
            />
          )}
          <div
            className={`max-w-xs p-5 rounded-lg overflow-hidden break-words ${
              sender === message.senderID
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-200"
            } relative`}
          >
            {sender === message.senderID && (
              <RiArrowDownSFill
                className="absolute top-2 right-2 w-6 h-5 cursor-pointer pb-1"
                onClick={() => toggleDropdown(index)} // Open dropdown on click
              />
            )}

            <p className="text-lg font-semibold whitespace-pre-wrap">
              {message.message || message.message}
            </p>
            <p className="float-right text-xs text-gray-400 mt-2">
              {message.time}
            </p>

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
      {/* Scroll target */}
      <div ref={messagesEndRef} />
    </div>

  {/* Input Field for Sending New Message */}
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
