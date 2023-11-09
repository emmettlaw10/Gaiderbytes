import React,{useState} from "react";
import {useForm, useController} from "react-hook-form"
import Select from "react-select"
import {zodResolver} from "@hookform/resolvers/zod";
import  {z, string} from "zod";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";



    const StudentApplication = ({onSave}) => {

        const [checked, setChecked] = useState(null);

        const provinces = [
            {value: "alberta", label: "Alberta"},
            {value: "british columbia", label: "British Columbia"},
            {value: "manitoba", label: "Manitoba"},
            {value: "new brunswick", label: "New Brunswick"},
            {value: "newfoundland and labrador", label: "Newfoundland and Labrador"},
            {value: "northwest territories", label: "Northwest Territories"},
            {value: "nova scotia", label: "Nova Scotia"},
            {value: "nunavut", label: "Nunavut"},
            {value: "ontario", label: "Ontario"},
            {value: "prince edward island", label: "Prince Edward Island"},
            {value: "quebec", label: "Quebec"},
            {value: "saskatchewan", label: "Saskatchewan"},
            {value: "yukon", label: "Yukon"},
        ];

        //outlining requirements for input (validation)
        const schema = z.object({
            first_name: z.string().regex(/^[A-Za-z]+$/).min(2).max(20),
            last_name: z.string().regex(/^[A-Za-z]+$/).min(2).max(20),
            email: string().email(),
            province: z.string(),
            city: string().regex(/^[A-Za-z]+$/).min(2).max(40),
            address: string().min(5),
            postal_code: string().length(6),
            date_of_birth: string(),
            pronoun: z.string().min(1),
            institution_name: z.string().min(1),
            program_name: z.string().min(1),
            emergency_contact_first_name: z.string().regex(/^[A-Za-z]+$/).min(2).max(20),
            emergency_contact_last_name: z.string().regex(/^[A-Za-z]+$/).min(2).max(20),
            emergency_contact_phone: z.string().regex(/^[0-9]+$/).length(10),
            emergency_contact_relation: z.string().min(1)
        });

        const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

        const {errors} = formState;

        const {field: field} = useController({name: 'province', control});

        const {field: field1} = useController({name: 'pronoun', control})

        const handleProvinceSelectChange = (option) => {
            field.onChange(option.value)
        }

        const handlePronounSelectChange = (option) => {
            field1.onChange(option.target.value)
        }

        //function to save form values
        const handleSave = (formValues) => {
            console.log(formValues)
            onSave(formValues)
        };

        return (
            <div className="lg:w-1/2 w-full m-auto">
                <div className="m-2 shadow-lg bg-red-700 text-white rounded-md p-3">
                <h1 className="text-3xl"> Student Application Form</h1>
                    <p>Thank you for your interest. Please fill out the form below to apply to receive coaching.</p>
                </div>
                <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2">
                <div className="studentApplicationForm">
                    <form onSubmit={handleSubmit(handleSave)}>
                        <div className="w-full m-auto text-center">
                            <h1 className="text-3xl font-bold">Personal Information</h1>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="first_name">First Name: </label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter first name"
                                   {...register("first_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.first_name?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="last_name">Last Name:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter last name"
                                   {...register("last_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.last_name?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="email">Email Address:</label>
                            <input type="email"
                                   placeholder="name@example.com"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   {...register("email")}
                            />
                            <div style={{color: "red"}}>
                                {errors.email?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="province">Province:</label>
                            <Select className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                    value ={provinces.find(({value}) => value ===field.value)}
                                    onChange={handleProvinceSelectChange}
                                    options={provinces}
                            />
                            <div style={{color: "red"}}>
                                {errors.province?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="city">City:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="City"
                                   {...register("city")}
                            />
                            <div style={{color: "red"}}>
                                {errors.city?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="address">Street Address:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="123 street name"
                                   {...register("address")}
                            />
                            <div style={{color: "red"}}>
                                {errors.address?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="postal_code">Postal Code:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="A4B1A1"
                                   {...register("postal_code")}
                            />
                            <div style={{color: "red"}}>
                                {errors.postal_code?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="date_of_birth">Date of Birth:</label>
                            <input type="date"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   {...register("date_of_birth")}
                            />
                            <div style={{color: "red"}}>
                                {errors.date_of_birth?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Pronouns:</label>
                            <RadioGroup className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96" onChange={handlePronounSelectChange}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            value={"he/him"}
                                            onClick={() => setChecked(false)}
                                        />
                                    }
                                    label={"He/Him"}/>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            value={"she/her"}
                                            onClick={() => setChecked(false)}
                                        />} label={"She/Her"}/>
                                <FormControlLabel
                                    control={
                                        <Radio

                                            onClick={() => setChecked(true)}
                                            value=""
                                            label="other"
                                        />
                                    }
                                    label={
                                        checked ? (
                                            <input
                                                disabled={!checked}

                                                className="p-3 m-1 w-60 rounded-md"
                                                placeholder="Enter Pronoun"
                                                onChange={handlePronounSelectChange}
                                            />
                                        ) : (
                                            "Other"
                                        )
                                    }
                                />
                            </RadioGroup>
                            <div style={{color: "red"}}>
                                {errors.pronoun?.message}
                            </div>
                        </div>
                        <div className="w-full m-auto text-center">
                            <h1 className="text-3xl font-bold">Institution Information</h1>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="institution_name">Name of Post-secondary institution:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter name of school"
                                   {...register("institution_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.institution_name?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="program_name">Program Name:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter name of program"
                                   {...register("program_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.program_name?.message}
                            </div>
                        </div>
                        <div className="w-full m-auto text-center mt-5">
                            <h1 className="text-3xl font-bold">Emergency Contact</h1>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="emergency_contact_first_name">First Name:</label>
                            <input type="string"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter contact's first name"
                                   {...register("emergency_contact_first_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.emergency_contact_first_name?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="emergency_contact_last_name">Last Name:</label>
                            <input type="string"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Enter contact's last name"
                                   {...register("emergency_contact_last_name")}
                            />
                            <div style={{color: "red"}}>
                                {errors.emergency_contact_last_name?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="emergency_contact_phone">Phone Number:</label>
                            <input type="string"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="1234567890"
                                   {...register("emergency_contact_phone")}
                            />
                            <div style={{color: "red"}}>
                                {errors.emergency_contact_phone?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold" htmlFor="emergency_contact_relation">Emergency Contact Relation:</label>
                            <input type="string"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="Contact's relation to you"
                                   {...register("emergency_contact_relation")}
                            />
                            <div style={{color: "red"}}>
                                {errors.emergency_contact_relation?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <button className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96 bg-red-400" type="submit">Apply</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>

        );
    }

export default StudentApplication
