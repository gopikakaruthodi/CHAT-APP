import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../API/Api';

const ChattedContactsPage = ({setUser,setProfile}) => {
  const api = Api();
  const token = localStorage.getItem('Token');
  const navigate = useNavigate();
  const [chattedContacts,setChattedContacts]=useState([])


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await axios.get(`${api}/getchaters`, {
        headers: { "authorization": `Bearer ${token}` },
      });

      console.log(data);
      // setChattedContacts(data)
      setChattedContacts([...new Map(data.filteredChatters.map(member => [member._id, member])).values()].reverse());
      setUser(data.user.username)
      if(data.user.profile){
        setProfile(data.user.profile)
      }
    } catch (error) {
      console.log(error);
      navigate('/signin')

    }
  };

  // console.log(chattedContacts);
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-800 to-blue-700">
      <header className="bg-transparent text-gray-900 p-4 text-center font-bold text-xl">
        <h1>Messages</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {chattedContacts.map((contact) => (
            <Link to={`/chat/${contact._id}`} key={contact._id}>
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-lg">
                <div className='flex items-center'>
                  <img
                    src={contact.profile}
                    alt={contact.username}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-white"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{contact.username}</h3>
                    <p className="text-md text-gray-500">{contact.lastMessage}</p>
                  </div>
                </div>
   
                <div >
                  <p className='text-gray-400 text-sm'>
                  {(() => {
                    try {
                      // Date in DD/MM/YYYY format
                      const [day, month, year] = contact.lastMessageDate.split('/').map(Number);
                      
                      // Time in h:mm:ss a format (12-hour format with AM/PM)
                      const [time, ampm] = contact.lastMessageTime.split(' ');
                      const [hours, minutes, seconds] = time.split(':').map(Number);
                      
                      // Convert 12-hour format to 24-hour format
                      const hours24 = ampm.toLowerCase() === 'am' ? (hours === 12 ? 0 : hours) : (hours === 12 ? 12 : hours + 12);
                      
                      // Create a Date object from the parsed components
                      const lastMessageDateTime = new Date(year, month - 1, day, hours24, minutes, seconds);

                      // Get the current date and time
                      const now = new Date();
                      
                      // Check if the message was sent on the same day
                      const isSameDay = lastMessageDateTime.getFullYear() === now.getFullYear() &&
                                        lastMessageDateTime.getMonth() === now.getMonth() &&
                                        lastMessageDateTime.getDate() === now.getDate();

                      // Return time if same day, otherwise return date
                      return isSameDay ? contact.lastMessageTime : contact.lastMessageDate;
                    } catch (error) {
                      console.error("Error parsing date/time:", error);
                      return contact.lastMessageDate; // Fallback to date if parsing fails
                    }
                  })()}
                </p>  
                {contact.unreadCount > 0 ? 
                <p className='text-sm text-white float-right bg-green-400 px-2 border-green-400 border rounded-full  mt-2'>{contact.unreadCount}</p>
                : <></>}
                 </div>
              </div>
              
            </Link>
          ))}
        </div>
      </div>

            <button
                onClick={() => { navigate('/contacts'); }}
                className="bg-gray-900 absolute bottom-10 right-20 text-white py-3 px-3 rounded-lg flex items-center justify-center fixed"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 018.5-8.5h.5M15 3h6m-3-3v6"
                  />
                </svg>
                Contacts
              </button>
    </div>
  );
};

export default ChattedContactsPage;
