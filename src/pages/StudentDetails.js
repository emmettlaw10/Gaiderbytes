import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Select from "react-select";
import {useController, useForm} from "react-hook-form";
import {string, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";



const StudentDetails = ({updateStudentStatus, removeCoach}) => {

    const location = useLocation()
    const id = location.state.id
    const [studentData, setStudentData] = useState({});
    const [dobFormat, setDobFormat] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchStudentData = async () => {
            let apiUrl = `http://localhost:5000/admin/student/${id}`
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch student data.");
                }
                const data = await response.json();
                setStudentData(data);
                setDobFormat(data.date_of_birth.substring(0,10))
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
        fetchStudentData();
    }, []);

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
        let obj = new Object()
        console.log(status.status)
        obj.newStatus = "" + status.status + "";
        console.log(obj)
        updateStudentStatus(JSON.stringify(obj), id)


    }

    const clearCoach = () => {
        console.log("trying to remove coach")
        removeCoach(id)
    }

    return(
        <div className="lg:w-2/3 w-full m-auto">
            <div className="w-full m-auto text-center">
                <h1 className="text-3xl font-bold underline m-5">Student Details</h1>
            </div>
            <form onSubmit={handleSubmit(updateStatus)}>
                <div className="flex flex-row mt-5 justify-between">
                    <div className="flex flex-col min-w-1/3">
                        <label className="text-xl font-bold mb-1">Current Status</label>
                        <div className="text-xl font-italic ml-10">
                            {studentData.status}
                        </div>
                    </div>
                    <div className="flex flex-col min-w-1/3">
                        <label className="text-xl font-bold" htmlFor="status">New Status:</label>
                        <Select className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                value ={statuses.find(({value}) => value ===field.value)}
                                onChange={handleStatusChange}
                                options={statuses}
                        />
                        <div style={{color: "red"}}>
                            {errors.status?.message}
                        </div>
                    </div>
                    <div className="flex flex-col min-w-1/3">
                        <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 w-1/2 m-auto" type="submit">Change Status</button>
                    </div>
                </div>
            </form>

            <div className="flex flex-row mt-5 w-full text-center justify-center">
                <div className="flex flex-col min-w-1/3">
                    <label className="text-xl font-bold mb-1">Coach Id</label>
                    <div className="text-xl font-italic ml-10">
                        {studentData.coach_id}
                    </div>
                </div>
                <div className="flex flex-col min-w-1/3">
                    <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 w-1/2 m-auto" onClick={clearCoach}>Clear Coach</button>
                </div>
            </div>
            <div className="w-full m-auto text-center">
                <h1 className="text-2xl font-bold m-5">Personal Information</h1>
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
            <div className="w-full m-auto text-center">
                <h1 className="text-2xl font-bold m-5">Education Information</h1>
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
            <div className="w-full m-auto text-center">
                <h1 className="text-3xl font-bold m-5">Emergency Contact Information</h1>
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
    );
}

export default StudentDetails
