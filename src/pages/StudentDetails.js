import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Select from "react-select";
import {useController, useForm} from "react-hook-form";
import {string, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Loading from "./../components/loading/loading"


const StudentDetails = () => {

    const location = useLocation()
    const id = location.state.id
    const [studentData, setStudentData] = useState({});
    const [dobFormat, setDobFormat] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [statusUpdated, setStatusUpdated] = useState(0);

    useEffect(() => {
        const fetchStudentData = async () => {
            let apiUrl = `${process.env.REACT_APP_DOMAIN}/admin/student/${id}`
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token') // Include the token here
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }
                const data = await response.json();
                setStudentData(data);
                setDobFormat(data.date_of_birth.substring(0,10));
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, [id, statusUpdated]);

    const schema = z.object({
        status: z.string().min(2)
    });

    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const statuses = [
        {value: "pending", label: "Pending"},
        {value: "matched", label: "Matched"},
        {value: "graduated", label: "Graduated"}
    ];

    const {field: field} = useController({name: 'status', control});

    const handleStatusChange = (option) => {
        field.onChange(option.value)
    }

    const updateStatus = (status) => {
        let obj = new Object();
        obj.newStatus = status.status;
    
        let apiUrl = `${process.env.REACT_APP_DOMAIN}/admin/student/${id}/status`
        fetch(apiUrl, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        })
        .then(response => {
            if(obj.newStatus !== "matched"){
                clearCoach();
            }
            setStatusUpdated(prev => prev + 1);
            if (!response.ok) {
                throw new Error('Failed to update student status');
            }
            return response.json();
        })
        .then(data => {
            console.log('Status updated successfully', data);
        })
        .catch(error => {
            console.error('Error updating student status:', error);
        });
    };

    const clearCoach = () => {
        let apiUrl = `${process.env.REACT_APP_DOMAIN}/admin/application/${id}/unmatch`
        setIsLoading(true);
        fetch(apiUrl, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            }
        })
        .then(response => {
            setIsLoading(false);
            if (!response.ok) {
                throw new Error('Failed to remove coach');
            }
            setStatusUpdated(prev => prev + 1);
            return response.json();
        })
        .then(data => {
            console.log('Coach removed successfully', data);
        })
        .catch(error => {
            console.error('Error removing coach:', error);
        });
    };

    return(
        <div>
            {
                isLoading ? (
                    <Loading/>
                ) : 
                (
                    <div className="w-full mx-auto my-5">
                    <div className="bg-[#E2E8F0] rounded-md w-full p-3">
                        <div className="w-full m-auto text-center">
                            <h1 className="text-[36px] font-[800] m-5">Student Details</h1>
                        </div>
                        <form onSubmit={handleSubmit(updateStatus)}>
                            <div className="flex flex-col mt-5 justify-between">
                                <div className="flex flex-row min-w-1/3 items-center pb-2">
                                    <label className="text-xl font-bold mb-1">Current Status:</label>
                                    <div className="text-xl font-italic ml-2 uppercase">
                                        {studentData.status}
                                    </div>
                                </div>
                                <div className="flex flex-row min-w-1/3 items-center">
                                    <label className="text-xl font-bold" htmlFor="status">New Status:</label>
                                    <Select className="rounded-md ml-2 w-[200px]"
                                            value ={statuses.find(({value}) => value ===field.value)}
                                            onChange={handleStatusChange}
                                            options={statuses}
                                    />
                                    <button className="font-[600] border border-black hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300 py-2 rounded-md px-5 ml-2" type="submit">Change Status</button>
                                </div>
                                <div className="text-red-500 justify-end">
                                        {errors.status?.message}
                                </div>
                            </div>
                        </form>
        
                        <div className="flex flex-row mt-5 w-full items-center">
                            <div className="flex min-w-1/3">
                                <label className="text-xl font-bold mb-1">Coach Id:</label>
                                <div className="text-xl font-italic ml-2">
                                    {studentData.coach_id || "Not Matched Yet"}
                                </div>
                            </div>
                            <div className="flex flex-col min-w-1/3 items-center">
                                <button className="font-[600] border border-black hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300 py-2 rounded-md px-5 ml-2" onClick={clearCoach}>Clear Coach</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full m-auto text-start">
                        <h1 className="text-[24px] font-[800] mt-5">Personal Information</h1>
                    </div>
                    <table className="min-w-max w-full m-auto">
                        <thead>
                        <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                            <th className="py-2 px-6 text-left">First Name</th>
                            <th className="py-2 px-6 text-left">Last Name</th>
                            <th className="py-2 px-6 text-left">Email</th>
                            <th className="py-2 px-6 text-left">Pronouns</th>
                            <th className="py-2 px-6 text-left">Birthday</th>
                            <th className="py-2 px-6 text-left">Address</th>
                            <th className="py-2 px-6 text-left">City</th>
                            <th className="py-2 px-6 text-left">Province</th>
                            <th className="py-2 px-6 text-left">Post Code</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.first_name}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.last_name}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.email}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.pronoun}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {dobFormat}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.address}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.city}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.province}
                                </td>
                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                    {studentData.postal_code}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-full text-start mt-5">
                        <h1 className="text-[24px] font-[800]">Education Information</h1>
                    </div>
                    <table className="min-w-max w-full table-auto">
                        <thead>
                        <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                            <th className="py-2 px-6 text-left">Institution Name</th>
                            <th className="py-2 px-6 text-left">Program Name</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.institution_name}
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.program_name}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="w-full text-start mt-5">
                        <h1 className="text-[24px] font-[800]">Emergency Contact Information</h1>
                    </div>
                    <table className="min-w-max w-full m-auto">
                        <thead>
                        <tr className="bg-[#E2E8F0] text-black text-sm leading-normal">
                            <th className="py-2 px-6 text-left">Contact First Name</th>
                            <th className="py-2 px-6 text-left">Contact Last Name</th>
                            <th className="py-2 px-6 text-left">Contact Phone #</th>
                            <th className="py-2 px-6 text-left">Contact Relation</th>
                        </tr>
                        </thead>
                        <tbody className="text-black text-sm font-light">
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.emergency_contact_first_name}
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.emergency_contact_last_name}
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.emergency_contact_phone}
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                {studentData.emergency_contact_relation}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                )
            }
        </div>
    );
}

export default StudentDetails
