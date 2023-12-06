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
        <div className="w-full m-auto">
            <div className="w-full m-auto text-center">
                <h1 className="text-[36px] font-[800] m-5">Coach Details</h1>
            </div>
            <form onSubmit={handleSubmit(updateStatus)}>
                <div className="flex flex-row mt-5 justify-between">
                    <div className="flex flex-row min-w-1/3  items-center pb-2">
                        <label className="text-xl font-bold mb-1">Current Status:</label>
                        <div className="text-xl font-italic ml-5 pb-2">
                            {coachData.status}
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
                        <div className="text-red-500 justify-end">
                            {errors.status?.message}
                        </div>
                    </div>
                </div>
            </form>
            <div className="w-full text-start mt-5">
                <h1 className="text-[24px] font-[800]">Personal Information</h1>
            </div>
            <table className="m-auto max-w-100 max-w-100 whitespace-normal">
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
                    <th className="py-2 px-6 text-left whitespace-pre">Post Code</th>
                    <th className="py-2 px-6 text-left">Availability</th>
                </tr>
                </thead>
                <tbody className="text-black text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2 px-6 text-left">
                        {coachData.first_name}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.last_name}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.email}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.pronoun}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {dobFormat}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.address}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.city}
                    </td>
                    <td className="py-2 px-6 text-left ">
                        {coachData.province}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.postal_code}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.availability}
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="w-full text-start mt-5">
                <h1 className="text-[24px] font-[800]">Professional Qualifications</h1>
            </div>
            <table className="max-w-100 w-full m-auto whitespace-normal">
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
                    <td className="py-2 px-6 text-left">
                        {coachData.institutions}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.post_secondary_program}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.resume_url}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.post_secondary_exp}
                    </td>
                    <td className="py-2 px-6 text-left">
                        {coachData.years_of_experience}
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="w-full text-start mt-5">
                <h1 className="text-[24px] font-[800]">Introduction</h1>
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