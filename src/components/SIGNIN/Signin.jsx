import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Api from '../../API/Api';

const Signin = () => {
    const api = Api();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${api}/signin`, userData);
            localStorage.setItem('Token', data.token);
            alert(data.msg);
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.response.data.msg);
        }
    };

    return (
        <section className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex items-center justify-center">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-4 leading-tight sm:text-4xl lg:text-5xl">Login to Your Account</h2>
                </div>

                <div className="relative max-w-md mx-auto">
                    <div className="overflow-hidden bg-gray-800 rounded-md shadow-lg">
                        <div className="px-4 py-6 sm:px-8 sm:py-7">
                            <form action="#" method="POST">
                                <div className="space-y-5">
                                    {/* EMAIL */}
                                    <div>
                                        <label htmlFor="email" className="text-base font-medium text-gray-300">EMAIL</label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                                className="block w-full py-4 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div>
                                        <label htmlFor="password" className="text-base font-medium text-gray-300">PASSWORD</label>
                                        <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                            <input
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                className="block w-full py-4 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                    <div className=" mt-2">
                                        <p><Link to="/email" className="font-medium text-indigo-500 hover:text-indigo-400">Forgot password</Link></p>
                                    </div>

                                    {/* SUBMIT BUTTON */}
                                    <div>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none hover:bg-indigo-500 focus:bg-indigo-500"
                                        >
                                            Login
                                        </button>
                                    </div>

                                    {/* REGISTER LINK */}
                                    <div className="text-center mt-4">
                                        <p className="text-base text-gray-300">Don't have an account? 
                                        <Link to="/password" className="font-medium text-indigo-500 hover:text-indigo-400">Create an Account</Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signin;
