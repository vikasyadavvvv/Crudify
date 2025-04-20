import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({});

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === id);
      setUpdateData(singleUser || {});
    }
  }, [id, users]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!updateData.name || !updateData.email || !updateData.age || !updateData.gender) {
      alert("Please fill all fields");
      return;
    }

    dispatch(updateUser({ id, data: updateData })).then(() => {
      navigate("/read"); // navigate back to user list or home after update
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-wide">
        Update User Details
      </h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={updateData.name || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
  
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={updateData.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
  
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={updateData.age || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>
  
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Gender</label>
          <p className="text-gray-900 font-medium mb-2">{updateData.gender || "Not specified"}</p>
          <select
            name="gender"
            value={updateData.gender || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
  
        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 shadow-md transition-all"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Update;
