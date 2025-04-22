import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser, deleteUser } from '../features/userDetailSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse"; // <-- import this at the top




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

  


const handleExport = (type) => {
  const exportData = filteredUsers.map(user => ({
    Name: user.name,
    Email: user.email,
    Gender: user.gender,
    Age: user.age,
  }));

  if (type === 'xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "UserData.xlsx");
  } else if (type === 'csv') {
    // Using PapaParse to convert JSON to CSV
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'UserData.csv');
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

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      );
    }
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

    {/* Export Buttons */}
<div className="mb-4 flex justify-end gap-4">
  <button
    onClick={() => handleExport('xlsx')}
    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-400 transition"
  >
    Export to Excel
  </button>
  <button
    onClick={() => handleExport('csv')}
    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-400 transition"
  >
    Export to CSV
  </button>
</div>



{/* User Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {filteredUsers.length > 0 ? (
    filteredUsers.map((user) => {
      // Function to generate a color based on the first letter of the name
      const generateColor = (name) => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const index = letters.indexOf(name.charAt(0).toUpperCase());
        const colorCodes = [
          'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
          'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 
          'bg-orange-500', 'bg-lime-500'
        ];
        return colorCodes[index % colorCodes.length]; // Cycling through colors
      };

      return (
        <div
          key={user.id}
          className="bg-white border border-gray-200 shadow-md rounded-lg p-5 transition hover:shadow-lg"
        >
          {/* Avatar with Logo on Top and Dynamic Color */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 flex items-center justify-center ${generateColor(user.name)} text-white text-3xl font-bold rounded-full`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Email:</span> {user.email}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Gender:</span> {user.gender}</p>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm gap-4">
            <div className="flex items-center space-x-4">
              {/* View Icon and Text */}
              <button
                onClick={() => handleView(user)}
                className="text-blue-500 hover:text-blue-600 flex items-center space-x-2 transition duration-200"
              >
                <i className="fas fa-eye"></i>
                <span className="hidden sm:inline">View</span>
              </button>

              {/* Edit Icon and Text */}
              <Link
                to={`/edit/${user.id}`}
                className="text-green-500 hover:text-green-600 flex items-center space-x-2 transition duration-200"
              >
                <i className="fas fa-edit"></i>
                <span className="hidden sm:inline">Edit</span>
              </Link>

              {/* Delete Icon and Text */}
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-500 hover:text-red-600 flex items-center space-x-2 transition duration-200"
              >
                <i className="fas fa-trash-alt"></i>
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <p className="text-gray-600 col-span-full text-center">No users found.</p>
  )}
</div>

 </div>
</>
  );
}
