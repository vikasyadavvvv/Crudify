import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!users.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(users.name)) {
      newErrors.name = "Name must only contain letters";
    }

    if (!users.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(users.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!users.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(users.age) || users.age <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!users.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        dispatch(createUser(users));
        setIsSubmitting(false);
        navigate("/read");
      }, 1000); // simulate delay for spinner
    }
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
            value={users.name}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
            value={users.email}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
            value={users.age}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
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
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : null}
            {isSubmitting ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;

