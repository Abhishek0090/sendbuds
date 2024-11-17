import React, { useEffect, useRef, useState } from "react";
import Modal from "../ui/Modal";

const CreateUserModal = ({ onCreateUser, isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    id: "",
    nickname: "",
    avatar: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!userData.id || !userData.nickname || !userData.avatar) {
      alert("All fields are required.");
      return;
    }
    onCreateUser(userData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Create Your SendBird Account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID
            </label>
            <input
              type="text"
              name="id"
              value={userData.id}
              onChange={handleInputChange}
              placeholder="Enter your user ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={handleInputChange}
              placeholder="Enter your nickname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              name="avatar"
              value={userData.avatar}
              onChange={handleInputChange}
              placeholder="Enter your avatar URL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
