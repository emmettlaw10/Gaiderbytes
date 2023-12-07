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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/change_password`
    if (!token) {
      alert("You must be logged in to change the password.");
      return;
    }
    try {
      const response = await fetch(apiUrl, {
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
    <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2 flex flex-col items-center">
      <h2 className="text-3xl items-center font-[600]">Change Admin Password</h2>
      <form onSubmit={handleSubmit} className="p-3 flex flex-col items-center">
        <div className="flex flex-col mb-5">
          <label htmlFor="username" className="font-[500]">Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="rounded-md p-3 w-50"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="username" className="font-[500]">Current Password: </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current Password"
            className="rounded-md p-3 w-50"
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="username" className="font-[500]">New Password: </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New Password"
            className="rounded-md p-3 w-50"
          />
        </div>
        <button type="submit" className="w-full font-[600] text-[20px] border border-black hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300 p-2 rounded-md mt-2 m-2 ml-2">Change Password</button>
      </form>
    </div>
  );
}

export default ChangeAdminPassword;