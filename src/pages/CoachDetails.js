import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Select from "react-select";
import {useController, useForm} from "react-hook-form";
import {string, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";



const CoachDetails = ({updateCoachStatus}) => {

    const location = useLocation()
    const id = location.state.id
    const [coachData, setCoachData] = useState({});
    const [dobFormat, setDobFormat] = useState("")


    useEffect(() => {
        const fetchCoachData = async () => {
            let apiUrl = `http://localhost:5000/admin/coach/${id}`
            console.log(apiUrl)
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch coach data.");
                }
                const data = await response.json();
                setCoachData(data);
                setDobFormat(data.date_of_birth.substring(0,10))
            } catch (error) {
                console.error("Error fetching coach data:", error);
            }
        };
        fetchCoachData();
    }, []);

    const schema = z.object({
        status: z.string().min(2)
    });

    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const statuses = [
        {value: "pending", label: "Pending"},
        {value: "verified", label: "Verified"}

    ];

    const {field: field} = useController({name: 'status', control});

    const handleStatusChange = (option) => {
        field.onChange(option.value)
    }

    const updateStatus = (status) => {
        let obj = new Object()
        console.log(status.status)
        obj.applicationType = ""+"coach"+"";
        obj.newStatus = ""+status.status+"";
        updateCoachStatus(JSON.stringify(obj), id)
    }

    const clearCoach = () => {
        console.log("trying to remove coach")
    }

    return(
        <div className="lg:w-2/3 w-full m-auto">
            <div className="w-full m-auto text-center">
                <h1 className="text-3xl font-bold underline m-5">Coach Details</h1>
            </div>
            <form onSubmit={handleSubmit(updateStatus)}>
                <div className="flex flex-row mt-5 justify-between">
                    <div className="flex flex-col min-w-1/3">
                        <label className="text-xl font-bold mb-1">Current Status</label>
                        <div className="text-xl font-italic ml-10">
                            {coachData.status}
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
                    <th className="py-2 px-6 text-left">Availability</th>
                </tr>
                </thead>
                <tbody className="text-black text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.first_name}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.last_name}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.email}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.pronoun}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {dobFormat}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.address}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.city}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.province}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.postal_code}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.availability}
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="w-full m-auto text-center">
                <h1 className="text-2xl font-bold m-5">Professional Qualifications</h1>
            </div>
            <table className="min-w-max w-full table-auto">
                <thead>
                <tr className="bg-[#E2E8F0] text-black uppercase text-sm leading-normal">
                    <th className="py-2 px-6 text-left">Institution Attended</th>
                    <th className="py-2 px-6 text-left">Program Attended</th>
                    <th className="py-2 px-6 text-left">Resume URL</th>
                    <th className="py-2 px-6 text-left">Post-secondary work experience</th>
                    <th className="py-2 px-6 text-left">Years Experience</th>
                </tr>
                </thead>
                <tbody className="text-black text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.institutions}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.post_secondary_program}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.resume_url}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.post_secondary_exp}
                    </td>
                    <td className="py-2 px-6 text-left whitespace-nowrap">
                        {coachData.years_of_experience}
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="w-full m-auto text-center items-center">
                <h1 className="text-3xl font-bold m-5">Introduction</h1>
            </div>
            <div className="w-full bg-slate-200 p-5">
                <a>
                    {coachData.introduction}
                </a>
            </div>

        </div>
    );
}

export default CoachDetails
