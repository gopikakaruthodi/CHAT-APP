import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../API/Api';


const Contacts = () => {
  const [contacts,setContacts]=useState([])
  const api=Api()
  const token=localStorage.getItem('Token')
  const navigate=useNavigate()

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
  // console.log(contacts);
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-800 to-blue-700">
      <header className="bg-transparent text-white p-4 text-center font-bold text-3xl">
        <h1>All Contacts</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {contacts.map((contact) => (
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
