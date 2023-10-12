import React, { useState, useEffect } from "react";


function AdminStudent() {

    const [studentData, setStudentData] = useState([]);
    const [paramType, setParamType] = useState("Name");
    const [param, setParam] = useState("");
    
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch("http://localhost:5000/admin/students");
                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, []);

    useEffect(() => {
        const fetchStudentData = async () => {
            let apiUrl = `http://localhost:5000/admin/students?searchParam=${paramType.toLowerCase()}&value=${param}`
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, [paramType, param]);

    const handleParamTypeChange = (e) => {
        setParamType(e.target.value);
    };

    const handleParamChange = (e) => {
        setParam(e.target.value);
    };

    return (
        <div className="mt-[36px] mb-[64px] flex flex-col">
            <div class="flex justify-between items-center">
                <h2 className="font-[700] text-[36px] leading-22">Student Applicants</h2>
                <div className="ml-4 flex space-x-2">
                    <select
                        className="px-2 py-2 border rounded-md bg-white"
                        value={paramType}
                        onChange={handleParamTypeChange}
                    >
                        <option value="Name">Name</option>
                        <option value="program_name">Program</option>
                        <option value="institution_name">Institution</option>
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
                            {studentData.map((student, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-2 px-6 text-left whitespace-nowrap">
                                        {student.first_name + ' ' + student.last_name}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {student.program_name}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {student.institution_name}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {student.email}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        {student.status}
                                    </td>
                                    <td className="py-2 px-6 text-left">
                                        <button className="bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800">View Detail</button>
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

export default AdminStudent;
