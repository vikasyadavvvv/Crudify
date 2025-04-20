import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser, deleteUser } from '../features/userDetailSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';

export default function Read() {
  const dispatch = useDispatch();
  const { users, loading, error, searchData } = useSelector((state) => state.app);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [genderFilter, setGenderFilter] = useState('all'); // default is 'all'

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  // Filter users based on searchData and gender
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchData.toLowerCase())
    )
    .filter((user) => {
      if (genderFilter === 'all') return true;
      return user.gender.toLowerCase() === genderFilter;
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
     
  {/* Modal */}
  {isModalOpen && selectedUser && (
    <CustomModal onClose={closeModal}>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">User Details</h2>
        <p><span className="font-semibold">Name:</span> {selectedUser.name}</p>
        <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
        <p><span className="font-semibold">Gender:</span> {selectedUser.gender}</p>
        <p><span className="font-semibold">Age:</span> {selectedUser.age}</p>
      </div>
    </CustomModal>
  )}

  <div className="px-6 py-8 max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">User List</h2>

    {/* Gender Filter */}
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      {['all', 'male', 'female'].map((gender) => (
        <label
          key={gender}
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition duration-200 ${
            genderFilter === gender
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value={gender}
            checked={genderFilter === gender}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="hidden"
          />
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </label>
      ))}
    </div>

    {/* User Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-5 transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Gender:</span> {user.gender}</p>

            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                onClick={() => handleView(user)}
                className="text-blue-600 hover:underline font-medium"
              >
                View
              </button>
              <Link
                to={`/edit/${user.id}`}
                className="text-green-600 hover:underline font-medium"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:underline font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 col-span-full text-center">No users found.</p>
      )}
    </div>
  </div>
</>
  );
}
