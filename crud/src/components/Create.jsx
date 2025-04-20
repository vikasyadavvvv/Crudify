import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({});

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
    console.log(users)
    navigate("/read")
  };

  return (
    <div className="bg-white max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={getUserData}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={getUserData}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={getUserData}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your age"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={users.gender === "male"}
                onChange={getUserData}
                className="h-5 w-5 text-blue-500"
              />
              <label htmlFor="male" className="ml-2 text-gray-700">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={users.gender === "female"}
                onChange={getUserData}
                className="h-5 w-5 text-blue-500"
              />
              <label htmlFor="female" className="ml-2 text-gray-700">Female</label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
