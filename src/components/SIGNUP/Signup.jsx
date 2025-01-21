import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api from '../../API/Api';

const Signup = () => {
    const navigate = useNavigate();
    const api = Api();
    const [userData, setuserData] = useState({
        username: "", email: "", phone: "", password: "", cpassword: "", accountType: "", profile: ""
    });

    const handleChange = (e) => {
        setuserData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${api}/signup`, userData);
            alert(data.msg);
            navigate('/signin');
        } catch (error) {
            console.log(error);
            alert(error.response.data.msg);
        }
    };

    const handleFile = async (e) => {
        const profile = await convertBase64(e.target.files[0]);
        setuserData((pre) => ({ ...pre, profile: profile }));
    };

    function convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    return (
        <>
            <section className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex items-center justify-center">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl font-bold mb-4 leading-tight sm:text-4xl lg:text-5xl">Create Free Account</h2>
                    </div>

                    <div className="relative max-w-md mx-auto">
                        <div className="overflow-hidden bg-gray-800 rounded-md shadow-lg">
                            <div className="px-4 py-6 sm:px-8 sm:py-7">
                                <form action="#" method="POST">
                                    <div className="space-y-5">
                                        {/* USERNAME */}
                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-300">USERNAME</label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name"
                                                    className="block w-full py-4 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        {/* EMAIL */}
                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-300">EMAIL</label>
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

                                        {/* PHONE */}
                                        <div>
                                            <label htmlFor="" className="text-base font-medium text-gray-300">PHONE</label>
                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    onChange={handleChange}
                                                    placeholder="Enter phone number"
                                                    className="block w-full py-4 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>
                                        </div>

                                        {/* PASSWORD */}
                                        <div className="flex space-x-4">
                                            <div>
                                                <label htmlFor="" className="text-base font-medium text-gray-300">PASSWORD</label>
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

                                            {/* CONFIRM PASSWORD */}
                                            <div>
                                                <label htmlFor="" className="text-base font-medium text-gray-300">CONFIRM PASSWORD</label>
                                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                    <input
                                                        type="password"
                                                        name="cpassword"
                                                        onChange={handleChange}
                                                        placeholder="Confirm your password"
                                                        className="block w-full py-4 pl-10 pr-4 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-indigo-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* PROFILE IMAGE */}
                                        <div>
                                            <label htmlFor="profile" className="text-base font-medium text-gray-300">Profile Picture:</label>
                                            <div className="flex items-center mt-3">
                                                <input
                                                    type="file"
                                                    id="profile"
                                                    name="profile"
                                                    onChange={handleFile}
                                                    className="text-white bg-gray-700 border border-gray-600 rounded-md"
                                                />
                                            </div>
                                        </div>

                                        {/* SUBMIT BUTTON */}
                                        <div>
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none hover:bg-indigo-500 focus:bg-indigo-500"
                                            >
                                                Create Account
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
