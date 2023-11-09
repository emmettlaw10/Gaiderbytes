import React,{useState} from "react";
import { string, z} from "zod";
import {useController, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Select from "react-select";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import toast from "react-hot-toast";


const CoachApplication = ({onSave}) => {
    const [checked, setChecked] = useState(null);
    const [expChecked, setExpChecked] = useState(false);
    const [expOtherChecked, setExpOtherChecked] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);


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
        date_of_birth: string().min(1),
        pronoun: z.string().min(1),
        years_of_experience: z.string().default("0"),
        resume_url: z.any().nullable(),
        institutions: z.string().min(1),
        availability: z.string().min(1),
        introduction: z.string().min(1),
        reside_in_canada: z.boolean(),
        post_secondary_exp: z.string(),
        post_secondary_program: z.string().min(1)
    });

    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const {field: field} = useController({name: 'province', control});
    const {field: field1} = useController({name: 'pronoun', control});
    const {field: genStatusInput} = useController({name: 'gen_status', control});
    const {field: yearsOfExp} = useController({name: 'years_of_experience', control});
    const {field: postSecondaryExp} = useController({name: 'post_secondary_exp', control});
    const {field: selfIdentification} = useController({name: 'self_identification', control});
    const {field: resideInCanada} = useController({name: 'reside_in_canada', control});
    
    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
      };

    const handleProvinceSelectChange = (option) => {
        field.onChange(option.value)
    }

    const handlePronounSelectChange = (option) => {
        field1.onChange(option.target.value)
    }

    const handleYearsOfExpSelectChange = (option) => {
        yearsOfExp.onChange(option.target.value)
    }
    const handlePostSecondaryExpSelectChange = (option) => {
        postSecondaryExp.onChange(option.target.value)
    }
    const handleIdentificationSelectChange = (option) => {
        selfIdentification.onChange(option.target.value)
    }
    const handleResidencySelectChange = (option) => {
        let result;
        if (option.target.value && typeof option.target.value === "string") {
            if (option.target.value.toLowerCase() === "true") result = true;
            if (option.target.value.toLowerCase() === "false") result = false;
        }
        resideInCanada.onChange(result)
    }

    //function to save form values
    const handleSave = (formValues) => {
        const formData = new FormData();
        for (const key in formValues) {
          formData.append(key, formValues[key]);
        }
        formData.append("resume", document.querySelector('input[type="file"]').files[0]);
        onSave(formData);
    };


    return (
        <div className="lg:w-1/2 w-full m-auto">
            <div className="m-2 shadow-lg bg-red-700 text-white rounded-md p-3">
                <h1 className="text-3xl"> Coach Application Form</h1>
                <p>Thank you for your interest. Please fill out the form below to apply to be a coach!.</p>
            </div>
            <div className=" flex flex-col shadow-lg bg-slate-200 p-3 rounded-md w-full m-auto coachApplicationForm">
                <div>
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
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   placeholder="name@example.com"
                                   {...register("email")}
                            />
                            <div style={{color: "red"}}>
                                {errors.email?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Do you reside in Canada?</label>
                            <RadioGroup className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96" onChange={handleResidencySelectChange}>
                                <div>
                                    <Radio value={true}></Radio>
                                    <label className="text-xl">Yes</label>
                                </div>
                                <div>
                                    <Radio value={false}></Radio>
                                    <label className="text-xl">No</label>
                                </div>

                            </RadioGroup>
                            <div style={{color: "red"}}>
                                {errors.reside_in_canada?.message}
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
                            <h1 className="text-3xl font-bold">Post-Secondary Experience</h1>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Post-secondary institution(s) attended:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   {...register("institutions")}
                            />
                            <div style={{color: "red"}}>
                                {errors.institutions?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Name of the program(s) you attended:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   {...register("post_secondary_program")}
                            />
                            <div style={{color: "red"}}>
                                {errors.post_secondary_program?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Post-secondary work experience?</label>
                            <RadioGroup className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96" onChange={handlePostSecondaryExpSelectChange}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            onClick={() => {
                                                setExpChecked(true);
                                                setExpOtherChecked(false);
                                            }}
                                            value="yes"
                                            label="other"
                                        />

                                    }
                                    label={
                                        expChecked ? (
                                            <input
                                                type="number"
                                                className="p-3 m-1 w-60 rounded-md"
                                                placeholder="Years of experience"
                                                onChange={handleYearsOfExpSelectChange}/>
                                        ) : ("Yes")
                                    }
                                />
                                <div style={{color: "red"}}>
                                    {errors.years_of_experience?.message}
                                </div>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            onClick={() => {
                                                setExpChecked(false);
                                                setExpOtherChecked(false);
                                            }}
                                            value="No"
                                        />
                                    }
                                    label={"No"}/>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            onClick={() => {
                                                setExpChecked(false);
                                                setExpOtherChecked(true);
                                            }}
                                            value=""
                                            label="other"
                                        />
                                    }
                                    label={
                                        expOtherChecked ?(
                                            <input
                                                className="p-3 m-1 w-60 rounded-md"
                                                placeholder="Please Specify"
                                                onChange={handlePostSecondaryExpSelectChange}
                                            />
                                        ): ("Other")
                                    }/>
                            </RadioGroup>
                            <div style={{color: "red"}}>
                                {errors.post_secondary_exp?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Resume:</label>
                            <input
                                type="file"
                                className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                accept={".pdf, .docx, .doc"}
                                onChange={handleFileChange}
                            />
                            <div style={{ color: "red" }}>
                                {errors.resume_url?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Availability:</label>
                            <input type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96"
                                   {...register("availability")}
                            />
                            <div style={{color: "red"}}>
                                {errors.availability?.message}
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 w-full md:w-fit m-auto justify-center">
                            <label className="text-xl font-bold">Why would you would be a great Coach?</label>
                            <textarea type="text"
                                   className="rounded-md p-3 mt-1.5 ml-2 w-full md:w-64 lg:w-80 xl:w-96 h-40"
                                   {...register("introduction")}
                            />
                            <div style={{color: "red"}}>
                                {errors.introduction?.message}
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
export default CoachApplication