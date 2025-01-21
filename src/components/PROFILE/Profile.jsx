import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Api from '../../API/Api';

const ProfilePage = ({setUser,setProfile}) => {
  const api = Api();
  const token = localStorage.getItem('Token');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Hey there! I am using the chat app.');
  const [avatar, setAvatar] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // To handle file input for avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${api}/displayuserprofile`, {
        headers: { "authorization": `Bearer ${token}` },
      });
      console.log(data);
      setUsername(data.username);
      setEmail(data.email);
      setAvatar(data.profile);
      setUser(data.username)
      if(data.profile){
        setProfile(data.profile)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async() => {
    setIsEditing(false);
    const { data } = await axios.put(`${api}/edituser`,{username,profile:avatar}, {
      headers: { "authorization": `Bearer ${token}` },
    })
    // alert('Profile updated!');
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-purple-900 to-blue-800 text-white p-6">

      <div className="flex flex-col items-center bg-gray-900 p-8 rounded-lg shadow-xl max-w-lg w-full">
        <div className="relative mb-6">
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-white mb-12 object-cover"
          />
          
          {/* Avatar Edit Button */}
          {isEditing && (
            <input
              type="file"
              name='profile'
              onChange={handleAvatarChange}
              className=" absolute bottom-0 right-0 text-white p-2  rounded-full cursor-pointer hover:transition duration-300"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="w-full text-center">
          {/* Name */}
          {isEditing ? (
            <input
              type="text"
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-2xl font-semibold text-white bg-transparent border-b-2 border-white outline-none focus:ring-2 focus:ring-indigo-500 p-2 mb-4"
              placeholder="Enter your name"
            />
          ) : (
            <h2 className="text-3xl font-semibold">{username}</h2>
          )}

          {/* Email */}
          {isEditing ? (
            <input
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-lg text-gray-400 bg-transparent border-b-2 border-white outline-none focus:ring-2 focus:ring-indigo-500 p-2 mb-4"
              placeholder="Enter your email"
            />
          ) : (
            <p className="text-lg text-gray-400">{email}</p>
          )}

          {/* Status */}
          {isEditing ? (
            <textarea
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full text-lg text-gray-400 bg-transparent border-b-2 border-white outline-none focus:ring-2 focus:ring-indigo-500 p-2 mb-4"
              rows="3"
              placeholder="Enter your status"
            />
          ) : (
            <p className="text-lg text-gray-400 italic">{status}</p>
          )}
        </div>

        {/* Edit/Save Buttons */}
        <div className="flex justify-center space-x-4 mt-6 w-full">
          {isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300"
            >
              Edit Profile
            </button>
          )}

          {/* Back Button */}
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Back to Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
