import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";


function AdminCoach() {

    const [coachData, setCoachData] = useState([]);
    const [paramType, setParamType] = useState("Name");
    const [param, setParam] = useState("");
    
    useEffect(() => {
        const fetchCoachData = async () => {
            let apiUrl = `${process.env.REACT_APP_DOMAIN}/admin/coaches`;
            try {
              const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
              });
              if (!response.ok) {
                throw new Error("Failed to fetch coaches data.");
              }
              const data = await response.json();
              setCoachData(data);
            } catch (error) {
              console.error("Error fetching coaches data:", error);
            }
          };
        fetchCoachData();
    }, []);

    useEffect(() => {
        const fetchCoachData = async () => {
            let apiUrl = `${process.env.REACT_APP_DOMAIN}/admin/coaches?searchParam=${paramType.toLowerCase()}&value=${param}`;
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch coaches data.");
                }
                const data = await response.json();
                setCoachData(data);
            } catch (error) {
                console.error("Error fetching coaches data:", error);
            }
        };
        fetchCoachData();
    }, [paramType, param]);

    const handleParamTypeChange = (e) => {
        setParamType(e.target.value);
    };

    const handleParamChange = (e) => {
        setParam(e.target.value);
    };

    const navigate = useNavigate();

    return (
        <div className="mt-[36px] mb-[64px] flex flex-col">
            <div class="flex justify-between items-center">
                <h2 className="font-[700] text-[36px] leading-22">Coach Applicants</h2>
                <div className="ml-4 flex space-x-2">
                    <select
                        className="px-2 py-2 border rounded-md bg-white"
                        value={paramType}
                        onChange={handleParamTypeChange}
                    >
                        <option value="Name">Name</option>
                        <option value="post_secondary_program">Program</option>
                        <option value="institutions">Institution</option>
                        <option value="Email">Email</option>
                        <option value="Status">Status</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Enter ${paramType.toLowerCase()}...`}
                        className="px-4 py-2 border rounded-md"
                        value={param}
                        onChange={handleParamChange}
                    />
                </div>
            </div>
            <div className="mt-[12px]">
                <div className="min-w-full overflow-hidden overflow-x-auto">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                                <th className="py-2 px-6 text-left">Applicant's Name</th>
                                <th className="py-2 px-6 text-left">Program</th>
                                <th className="py-2 px-6 text-left">Institution</th>
                                <th className="py-2 px-6 text-left">Email</th>
                                <th className="py-2 px-6 text-left">Status</th>
                                <th className="py-2 px-6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                            {coachData.map((coach, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-2 px-6 text-left whitespace-nowrap">
                                        {coach.first_name + ' ' + coach.last_name}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {coach.post_secondary_program}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {coach.institutions}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {coach.email}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {coach.status}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        <button className="font-[600] bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white
                                         focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800"
                                                onClick={()=>{navigate('/adminDashboard/coachDetails',{state:{id: coach.id}})}}
                                        >View Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminCoach;
