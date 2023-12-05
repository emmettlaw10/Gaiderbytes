import React, {useEffect} from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const MatchingPage = ({createMatch}) => {

    const [selectedStudent, setSelectedStudent] = useState("Select From Below");
    const [selectedCoach, setSelectedCoach] = useState("Select From Below");
    const [coaches, setCoaches] = useState([]);
    const [students, setStudents] = useState([]);
    const [paramTypeC, setParamTypeC] = useState("Name");
    const [paramC, setParamC] = useState("");
    const [paramTypeS, setParamTypeS] = useState("Name");
    const [paramS, setParamS] = useState("");
    const [canMatch, setCanMatch] = useState(true)

    const navigate = useNavigate();

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
            <div className="shadow-lg bg-slate-200 p-3 rounded-md m-auto mt-5 w-fit align-middle w-full">
                <div className="flex items-center justify-between">
                    <div className="flex-col">
                        <h2 className="font-[700] text-[36px] leading-22">Matching</h2>
                        <p>Please select 1 student and 1 coach</p>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center w-full">
                                <label className="font-bold">Selected Student:</label>
                                <div className="p-2 rounded-md items-center h-fit w-[180px] word-break">
                                    <p className="text-xl truncate">{selectedStudent.first_name || selectedStudent}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <label className="font-bold">Selected Coach:</label>
                                <div className="p-2 rounded-md items-center h-fit w-[180px] wor">
                                    <p className="text-xl truncate">{selectedCoach.first_name || selectedCoach}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="font-[600] border border-black py-3 px-5 rounded-md hover:border-[#34345c] transition-opacity transition-colors duration-300 hover:text-white hover:bg-[#34345c] m-2 ml-2 disabled:opacity-50 disabled:pointer-events-none matchButton" disabled={canMatch} onClick={match}>Match</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="font-[700] text-[36px] leading-22 pt-5">Coach Applicants</h2>
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
                                    <button className="font-[600] bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white focus:outline-none
                                            focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800"
                                            onClick={() => setCoachSelection(index)}
                                    >Select
                                    </button>
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
            <div className="flex justify-between items-center pt-5">
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
                                    <button className="font-[600] bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white
                                    focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800"
                                            onClick={() => setStudentSelection(index)}>Select
                                    </button>
                                </td>
                                <td className="py-2 px-6 text-left">
                                    <button className="font-[600] bg-[#E2E8F0] text-black px-4 py-2 border rounded-md hover:bg-[#34345c] hover:text-white
                                        focus:outline-none focus:border-blue-900 focus:ring ring-blue-200 active:bg-blue-800"
                                            onClick={()=>{navigate('/adminDashboard/studentDetails',{state:{id: student.id}})}}
                                    >View Detail</button>
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
