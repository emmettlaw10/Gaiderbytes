import React, { useState } from 'react';

function AdminSignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl =  `${process.env.REACT_APP_DOMAIN}/admin/signup`
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.message);

      if (response.status === 201) {
        alert("Admin account created successfully.");
        window.location.pathname = "/admin";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2 flex flex-col items-center">
      <h2 className="text-3xl items-center font-[600]">Create Admin Account</h2>
      <form onSubmit={handleSubmit} className="p-3 flex flex-col items-center">
        <div className="flex flex-row items-center mb-5">
          <label htmlFor="username" className="font-[500]">Username: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="rounded-md p-3 ml-2 w-50"
          />
        </div>
        <div className="flex flex-row items-center mb-5">
          <label htmlFor="password" className="font-[500]">Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="rounded-md p-3 ml-2 w-50"
          />
        </div>
        <button type="submit" className="w-full font-[600] text-[20px] border border-black hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300 p-2 rounded-md mt-2 m-2 ml-2">Sign Up</button>
      </form>
    </div>
  );
}

export default AdminSignUp;