import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../API/Api';


const Contacts = ({setUser,setProfile}) => {
  const [contacts,setContacts]=useState([])
  const api=Api()
  const token=localStorage.getItem('Token')
  const navigate=useNavigate()
  const [searchQuery, setSearchQuery] = useState(""); 


  useEffect(()=>{
    fetchUsers()
  },[])

  const fetchUsers= async()=>{
    if(token){
      try {
        const {data}=await axios.get(`${api}/displayusers`,{headers:{"authorization":`Bearer ${token}`}})
        console.log(data);
        setContacts(data.data)
        setUser(data.user.username)
        if(data.user.profile){
          setProfile(data.user.profile)
        }
      } catch (error) {
        console.log(error);
        // navigate('/signin') 
      }
    }
    else{
      navigate('/signin')
    }
  }

  const filteredContacts = contacts.filter((data) =>
       data.username.toLowerCase().startsWith(searchQuery.toLowerCase())
     );
  console.log(filteredContacts);
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-800 to-blue-700">
      <div className="flex w-full  justify-between">
      <input
        type="search"
        placeholder="Search Contacts..."
        className="w-1/2 h-12 p-3 m-6 bg-purple-800 border text-gray-100 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {filteredContacts.map((contact) => (
            <Link to={`/chat/${contact._id}`} key={contact._id}>
              <div className="flex items-center p-4 bg-gray-900 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                <img
                  src={contact.profile}
                  alt={contact.username}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-white object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-white">{contact.username}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
