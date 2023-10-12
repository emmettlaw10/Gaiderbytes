import React, {useEffect} from 'react';
import {useState} from "react";

const MatchingPage = ({createMatch}) => {

    const [selectedStudent, setSelectedStudent] = useState("Please Select");
    const [selectedCoach, setSelectedCoach] = useState("Please Select");
    const [coaches, setCoaches] = useState([]);
    const [students, setStudents] = useState([]);
    const [paramTypeC, setParamTypeC] = useState("Name");
    const [paramC, setParamC] = useState("");
    const [paramTypeS, setParamTypeS] = useState("Name");
    const [paramS, setParamS] = useState("");
    const [canMatch, setCanMatch] = useState(true)

    useEffect(() => {
        const fetchCoachData = async () => {
            let apiUrl = ""
            try {
                if(paramTypeC === "ID"){
                    apiUrl = `http://localhost:5000/admin/available_coaches/${paramC}`
                }
                else if(paramTypeC === "Name"){
                    // const parts = param.split(' ');
                    // const first_name = parts[0];
                    // const last_name = parts[1];
                    apiUrl = `http://localhost:5000/admin/available_coaches?searchParam=${paramTypeC.toLowerCase()}&value=${paramC}`
                }
                else{
                    apiUrl = (`http://localhost:5000/admin/available_coaches?searchParam=${paramTypeC.toLowerCase()}&value=${paramC}`);
                }
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch coaches data.");
                }
                const data = await response.json();
                setCoaches(data);
            } catch (error) {
                console.error("Error fetching coaches data:", error);
            }
        };
        fetchCoachData();
    }, [paramTypeC, paramC]);

    useEffect(() => {
        const fetchStudentData = async () => {
            let apiUrl = ""
            try {
                if(paramTypeS === "ID"){
                    apiUrl = `http://localhost:5000/admin/unmatched_students/${paramS}`
                }
                else if(paramTypeS === "Name"){
                    // const parts = param.split(' ');
                    // const first_name = parts[0];
                    // const last_name = parts[1];
                    apiUrl = `http://localhost:5000/admin/unmatched_students?searchParam=${paramTypeS.toLowerCase()}&value=${paramS}`
                }
                else{
                    apiUrl = (`http://localhost:5000/admin/unmatched_students?searchParam=${paramTypeS.toLowerCase()}&value=${paramS}`);
                }
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch Students data.");
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching Students data:", error);
            }
        };
        fetchStudentData();
    }, [paramTypeS, paramS]);

    const handleParamTypeChangeCoach = (e) => {
        setParamTypeC(e.target.value);
    };

    const handleParamChangeCoach = (e) => {
        setParamC(e.target.value);
    };
    const handleParamTypeChangeStudent = (e) => {
        setParamTypeS(e.target.value);
    };

    const handleParamChangeStudent = (e) => {
        setParamS(e.target.value);
    };

    const setCoachSelection = (index) => {
        setSelectedCoach(coaches[index])
        checkCanMatch()

    }
    const setStudentSelection = (index) => {
        setSelectedStudent(students[index])
        checkCanMatch()
    }
    const checkCanMatch = () => {
        if (selectedStudent && selectedCoach !== "Please Select") {
            setCanMatch(false)
        }
    }
    const match = () => {
        let student = selectedStudent.id
        let coach = selectedCoach.id
        let obj = new Object()
        obj.studentId = ""+student+"";
        obj.coachId = ""+coach+"";
        console.log(JSON.stringify(obj))
        createMatch(JSON.stringify(obj))
    }


    return (
        <div className="">
            <div className="shadow-lg bg-slate-200 p-3 rounded-md m-auto mt-5 w-fit align-middle">
                <div className="flex items-center">
                    <div className="flex-col">
                        <h2 className="font-[700] text-[36px] leading-22">Matching</h2>
                        <p>Please select 1 student and 1 coach</p>
                    </div>
                    <div className="flex items-center m-5">
                        <label className="font-bold">Student:</label>
                        <div className="p-2 bg-white rounded-md items-center h-fit">
                            <p className="text-xl">{selectedStudent.first_name || selectedStudent}</p>
                        </div>
                    </div>
                    <div className="flex items-center m-5">
                        <label className="font-bold">Coach:</label>
                        <div className="p-2 bg-white rounded-md items-center h-fit">
                            <p className="text-xl">{selectedCoach.first_name || selectedCoach}</p>
                        </div>
                    </div>

                    <div>
                        <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 m-2 ml-2 disabled:bg-gray-500 disabled:hover:bg-gray-500 matchButton" disabled={canMatch} onClick={match}>Match</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="font-[700] text-[36px] leading-22">Coach Applicants</h2>
                <div className="ml-4 flex space-x-2">
                    <select
                        className="px-2 py-2 border rounded-md bg-white"
                        value={paramTypeC}
                        onChange={handleParamTypeChangeCoach}
                    >
                        <option value="Name">Name</option>
                        <option value="ID">ID</option>
                        <option value="Email">Email</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Enter ${paramTypeC.toLowerCase()}...`}
                        className="px-4 py-2 border rounded-md"
                        value={paramC}
                        onChange={handleParamChangeCoach}
                    />
                </div>
            </div>
            <div className="mt-[12px]">
                <div className="min-w-full overflow-hidden overflow-x-auto">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                            <th className="py-2 px-6 text-left">Applicant's Name</th>
                            <th className="py-2 px-6 text-left">Email</th>
                            <th className="py-2 px-6 text-left">Matching</th>
                            <th className="py-2 px-6 text-left">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                        {coaches.map((coach, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {coach.first_name + ' ' + coach.last_name}
                                </td>
                                <td className="py-2 px-6 text-left">
                                    {coach.email}
                                </td>
                                <td className="py-2 px-6 text-left">
                                    <button className="bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800" onClick={() => setCoachSelection(index)}>Select</button>
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
            <div className="flex justify-between items-center">
                <h2 className="font-[700] text-[36px] leading-22">Student Applicants</h2>
                <div className="ml-4 flex space-x-2">
                    <select
                        className="px-2 py-2 border rounded-md bg-white"
                        value={paramTypeS}
                        onChange={handleParamTypeChangeStudent}
                    >
                        <option value="Name">Name</option>
                        <option value="ID">ID</option>
                        <option value="Email">Email</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Enter ${paramTypeS.toLowerCase()}...`}
                        className="px-4 py-2 border rounded-md"
                        value={paramS}
                        onChange={handleParamChangeStudent}
                    />
                </div>
            </div>
            <div className="mt-[12px]">
                <div className="min-w-full overflow-hidden overflow-x-auto">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                            <th className="py-2 px-6 text-left">Applicant's Name</th>
                            <th className="py-2 px-6 text-left">Email</th>
                            <th className="py-2 px-6 text-left">Status</th>
                            <th className="py-2 px-6 text-left">Matching</th>
                            <th className="py-2 px-6 text-left">Action</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                        {students.map((student, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {student.first_name + ' ' + student.last_name}
                                </td>
                                <td className="py-2 px-6 text-left">
                                    {student.email}
                                </td>
                                <td className="py-2 px-6 text-left">
                                    {student.status}
                                </td>
                                <td className="py-2 px-6 text-left">
                                    <button className="bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800" onClick={() => setStudentSelection(index)}>Select</button>
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

    )
}


export default MatchingPage;
