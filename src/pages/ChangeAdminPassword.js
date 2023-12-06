import React, { useState } from 'react';

function ChangeAdminPassword() {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert("You must be logged in to change the password.");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/admin/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message);


      if (response.status === 200) {

        alert("Password updated successfully.");
        window.location.pathname = "/admin";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      <h2>Change Admin Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangeAdminPassword;