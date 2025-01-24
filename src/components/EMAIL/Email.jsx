import React, { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Api from '../../API/Api';


const Email = () => {
    const api=Api()
    const [email,setEmail]=useState("")
    const navigate=useNavigate()
    const [emailError, setEmailError] = useState('');
    
    const emailRegex = /^\S+@\S+\.\S+$/;


    const validateEmail = (value) => {
        if (!emailRegex.test(value)) {
          setEmailError('Invalid email format.');
        } else {
          setEmailError('');
        }
      };
    
      const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
      };
    
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post(`${api}/email`,{email})
            // console.log(data);
            // toast(`${data.msg}`, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });
            alert(data.msg)
            navigate('/signin')
            
        } catch (error) {
            console.log(error);
            // toast(`${error.response.data.msg}`, {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "dark",
            // });
            alert(error.response.data.msg)
            
        }
    }
  return (
    <>
    <section className="py-10 bg-gray-900 h-screen sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">EMAIL VERIFICATION</h2>
                </div>
                <div className="relative max-w-md mx-auto mt-8 md:mt-16">
                    <div className="overflow-hidden bg-gray-800 rounded-md shadow-md">
                        <div className="px-4 py-6 sm:px-8 sm:py-7">
                            <form action="#" method="POST">
                                <div className="space-y-5">
                                    <h1></h1>
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-100"> Email address </label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                </svg>
                                            </div>

                                            <input
                                                type="email"
                                                name=""
                                                id=""
                                                placeholder="Enter email to get started"
                                                className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        {emailError && <p style={{ color: 'red',fontSize:'13px' }}>{emailError}</p>}
                                    </div> 
                                    <div>
                                        <button type="submit" onClick={handleSubmit} className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-yellow-600 border border-transparent rounded-md focus:outline-none hover:bg-yellow-700 focus:bg-yellow-700">
                                            Verify Your Email
                                        </button>
                                        <ToastContainer
                                            position="top-right"
                                            autoClose={3000}
                                            hideProgressBar={false}
                                            newestOnTop={false}
                                            closeOnClick={false}
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover
                                            theme="dark"
                                            />
                                    </div>                                 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Email