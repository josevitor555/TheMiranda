import React, { useState } from 'react';

// Importar Axios
import axios from 'axios';

// Lucid React
import { Eye, EyeOff, ArrowRight, Lock } from "lucide-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

// URL da API
const apiUrl = import.meta.env.VITE_API_URL;

const LeftCol = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("signin");

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const [signUpName, setSignUpName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${apiUrl}/api/login`, {
                email: signInEmail,
                password: signInPassword
            });
            console.log(signUpEmail, signInPassword);

            // Save token and user data to localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));

            // Redirect to home
            navigate("/home");

        } catch (error) {
            console.log("Error to login", error);
            alert("A error ocurred. Try Again to login.")
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${apiUrl}/api/register`, {
                username: signUpName,
                email: signUpEmail,
                password: signUpPassword
            });

            // Save token and user data to localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));

            // Navigate to home
            navigate("/home");

        } catch (error) {
            console.log("Error to register user: ", error);
            alert("Email or username already exists. Please try again.");
        }
    }

    return (
        <div className='flex w-full h-screen justify-center items-center bg-gradient-to-br from-[#27282D] to-[#232428]'>

            <div className="bg-[#33353D] p-6 w-full max-w-[600px] space-y-8 border-2 border-[#40434b] rounded-lg">

                <div className="text-center space-y-8">
                    <div className="w-16 h-16 mx-auto bg-[#FFF2D7] rounded-2xl flex items-center justify-center">
                        <Lock className="w-8 h-8 text-[#232428]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-[#fafafa]"> Welcome to Miranda! </h1>
                        <p className="text-[#fafafa] font-light mt-3 opacity-80"> Enter with your account or create one. </p>
                    </div>
                </div>

                <div className="p-2 border-0 bg-gradient">
                    <div className="w-full">
                        {/* Tabs Navigation */}
                        <div className="grid w-full grid-cols-2 mb-6">
                            <button
                                onClick={() => setActiveTab("signin")}
                                className={`cursor-pointer font-light p-2 rounded-full text-lg transition-all duration-200 ${activeTab === "signin"
                                        ? "bg-transparent text-[#fafafa]"
                                        : "text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                Enter
                            </button>
                            <button
                                onClick={() => setActiveTab("signup")}
                                className={`cursor-pointer font-light p-2 rounded-full text-lg transition-all duration-200 ${activeTab === "signup"
                                        ? "border border-[#FFF2D7] bg-[#FFF2D7] text-[#232428]"
                                        : "text-gray-400 hover:text-gray-300"
                                    }`}
                            >
                                Create Account
                            </button>
                        </div>

                        {activeTab === "signin" && (
                            <div className="space-y-6 mt-6">
                                <div className="animate-fadeIn">

                                    <form onSubmit={handleSignIn} className="space-y-6">

                                        <div className="space-y-2">
                                            <label htmlFor="signin-email" className="text-sm font-medium text-[#fafafa] block">
                                                Enter with Your E-mail
                                            </label>

                                            <div className="relative">
                                                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                                <input
                                                    id="signin-email"
                                                    type="text"
                                                    value={signInEmail}
                                                    onChange={(e) => setSignInEmail(e.target.value)}
                                                    placeholder="Your E-mail here"
                                                    className="w-full pl-10 h-12 border border-[#40434b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] focus:border-transparent bg-[#33353D] text-[#fafafa] placeholder-gray-400"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="signin-password" className="text-sm font-medium text-[#fafafa] block">
                                                Enter your password
                                            </label>

                                            <div className="relative">
                                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                                <input
                                                    id="signin-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={signInPassword}
                                                    onChange={(e) => setSignInPassword(e.target.value)}
                                                    placeholder="Your password here"
                                                    className="w-full pl-10 pr-10 h-12 border border-[#40434b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] focus:border-transparent bg-[#33353D] text-[#fafafa] placeholder-gray-400"
                                                    required
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="rounded border-[#40434b] text-[#FFF2D7] focus:ring-[#FFF2D7]/20 mt-0.5 cursor-pointer bg-[#33353D]"
                                                required
                                            />
                                            <span className="text-gray-300"> I read and agree with the <a href="#" className="text-[#FFF2D7] hover:text-[#faeed7] transition-colors hover:underline"> Terms and Conditions </a></span>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full h-12 bg-[#FFF2D7] text-[#232428] text-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group cursor-pointer rounded-full"
                                        >
                                            Enter to main page
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === "signup" && (
                            <div className="space-y-6 mt-6">
                                <div className="animate-fadeIn">
                                    <form onSubmit={handleSignUp} className="space-y-6">

                                        <div className="space-y-2">
                                            <label htmlFor="signup-name" className="text-sm font-medium text-[#fafafa] block">
                                                Enter your name
                                            </label>

                                            <div className="relative">
                                                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                                <input
                                                    id="signup-name"
                                                    type="text"
                                                    value={signUpName}
                                                    onChange={(e) => setSignUpName(e.target.value)}
                                                    placeholder="Your name here"
                                                    className="w-full pl-10 h-12 border border-[#40434b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] focus:border-transparent bg-[#33353D] text-[#fafafa] placeholder-gray-400"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="signup-email" className="text-sm font-medium text-[#fafafa] block">
                                                Enter your e-mail
                                            </label>

                                            <div className="relative">
                                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                                <input
                                                    id="signup-email"
                                                    type="email"
                                                    value={signUpEmail}
                                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                                    placeholder="Your e-mail here"
                                                    className="w-full pl-10 h-12 border border-[#40434b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] focus:border-transparent bg-[#33353D] text-[#fafafa] placeholder-gray-400"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="signup-password" className="text-sm font-medium text-[#fafafa] block">
                                                Enter your password
                                            </label>

                                            <div className="relative">
                                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                                <input
                                                    id="signup-password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={signUpPassword}
                                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                                    placeholder="Your password here"
                                                    className="w-full pl-10 pr-10 h-12 border border-[#40434b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] focus:border-transparent bg-[#33353D] text-[#fafafa] placeholder-gray-400"
                                                    required
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="rounded border-[#40434b] text-[#FFF2D7] focus:ring-[#FFF2D7]/20 mt-0.5 cursor-pointer bg-[#33353D]"
                                                required
                                            />
                                            <span className="text-gray-300"> I read and agree with the <a href="#" className="text-[#FFF2D7] hover:text-[#faeed7] transition-colors hover:underline"> Terms and Conditions </a> </span>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full h-12 bg-[#FFF2D7] text-[#232428] text-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group cursor-pointer rounded-full"
                                        >
                                            Create Account
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftCol;
