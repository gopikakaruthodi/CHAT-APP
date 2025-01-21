import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./components/Contact/Contact"
import Signin from "./components/SIGNIN/Signin"
import Signup from "./components/SIGNUP/Signup"
import Email from "./components/EMAIL/Email"
import Navbar from "./components/Navbar/Navbar"
import Contacts from "./components/Contact/Contact"
import Chat from "./components/Chat/Chat"
import ChattedContactsPage from "./components/ChattedContact/ChattedContacts"
import ProfilePage from "./components/PROFILE/Profile"
import Password from "./components/Password/Password"
import { useState } from "react"



function App() {
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState("")

  return (

    <>
    <BrowserRouter>
    {user && <Navbar  user={user} profile={profile}  />}
    <Routes>
        <Route path="/" element={<ChattedContactsPage setUser={setUser} setProfile={setProfile} />}/>
        <Route path="/signin" Component={Signin}/>
        <Route path="/signup" Component={Signup}/>
        <Route path="/email" Component={Email}/>
        <Route path="/profile" element={<ProfilePage setUser={setUser} setProfile={setProfile} />}/>
        <Route path="/contacts" element={<Contacts setUser={setUser} setProfile={setProfile} />}/>
        <Route path="/chat/:_id" element={<Chat setUser={setUser} setProfile={setProfile} />}/>
        <Route path="/password" Component={Password}/>
       
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
