import React, { useState } from "react";
import Modal from "../ui/Modal";

const CreateChannelModal = ({ userData, handleSubmit, isOpen, onClose }) => {
  const [selectedUserIds, setSelectedUserIds] = useState("");
  const [chatName, setChatName] = useState("");

  const handleInputChange = (event) => {
    const userId = event.target.value;
    setSelectedUserIds((prev) => (prev ? "" : userId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-container">
        <h2 className="modal-title">Create Channel</h2>
        <div className="input-group">
          <label className="input-label">Chat Name</label>
          <input
            type="text"
            name="chatname"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Enter your Chat Name"
            className="input-field"
          />
        </div>
        <label className="input-label font-bold">
          Select Members From List
        </label>
        <div className="h-[300px] overflow-y-auto py-2">
          {[...Array(10)].map((_, idx) => {
            const user = userData[idx]; // Assuming userData is an array of user objects
            return (
              <div className="input-group" key={user?.id}>
                <label className="input-label">{user?.nickname}</label>
                <input
                  type="checkbox"
                  name="id"
                  value={user?.id}
                  onChange={handleInputChange}
                  checked={selectedUserIds.includes(user?.id)}
                  className="input-field"
                />
              </div>
            );
          })}
        </div>

        <button
          className="submit-btn"
          onClick={() => handleSubmit(selectedUserIds, chatName)}
        >
          Create Group Chat
        </button>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;
