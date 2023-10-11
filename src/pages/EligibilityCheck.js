import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";
import {useController, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";


const EligibilityCheck = ({}) => {

    const schema = z.object({
        residency: z.string().min(1),
        poc_status: z.string().min(1),
        first_generation: z.string().min(1),
        acceptance: z.string().min(1),
    });


    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const {field: residency} = useController({name: 'residency', control});
    const {field: poc} = useController({name: 'poc_status', control});
    const {field: first_generation} = useController({name: 'first_generation', control});
    const {field: accepted} = useController({name: 'acceptance', control});

    const handleResidencySelectChange = (option) => {
        residency.onChange(option.target.value)
    }
    const handlePocSelectChange = (option) => {
        poc.onChange(option.target.value)
    }
    const handleGenerationSelectChange = (option) => {
        first_generation.onChange(option.target.value)
    }
    const handleAcceptanceSelectChange = (option) => {
        accepted.onChange(option.target.value)
    }

    const checkEligibility = (formValues) => {
        const formData = new FormData();
        for (const key in formValues){
            formData.append(key,formValues[key]);
        }
        console.log(formData)
        console.log(residency.value)
        if (residency.value ==="yes" && (poc.value === "yes" || first_generation.value ==="yes") && accepted.value ==="yes"){
            console.log("Working")
            window.location.pathname = "/eligible";
        }else{
            console.log("not working")
            window.location.pathname = "/ineligible";
        }
    }

    return (
        <div>
            <div className="m-2 shadow-lg bg-red-700 text-white rounded-md p-3">
                <h1 className="text-3xl"> Student Eligibility Check</h1>
                <p>Thank you for your interest. Please fill out the form below to check your eligibility for our program!.</p>
            </div>
            <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2">
                <form onSubmit={handleSubmit(checkEligibility)}>
                    <div>
                        <RadioGroup onChange={handleResidencySelectChange}>
                            <label className="text-xl">Are you a Canadian resident or will you be by the start of your program?</label>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"yes"}
                                    />
                                }
                                label={"Yes"}/>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"no"}
                                    />} label={"No"}
                            />
                        </RadioGroup>
                        <div style={{color: "red"}}>
                            {errors.residency?.message}
                        </div>
                    </div>
                    <div>
                        <RadioGroup onChange={handlePocSelectChange}>
                            <label className="text-xl">Do you self-identify as Black, Indigenous, or as a Person of Colour?</label>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"yes"}
                                    />
                                }
                                label={"Yes"}/>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"no"}
                                    />} label={"No"}
                            />
                        </RadioGroup>
                        <div style={{color: "red"}}>
                            {errors.poc_status?.message}
                        </div>
                    </div>
                    <div>
                        <RadioGroup onChange={handleGenerationSelectChange}>
                            <label className="text-xl">Do self-identify as the first in your family to attend post-secondary studies, or part of the first generation of your family to attend post-secondary studies in Canada?</label>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"yes"}
                                    />
                                }
                                label={"Yes"}/>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"no"}
                                    />} label={"No"}
                            />
                        </RadioGroup>
                        <div style={{color: "red"}}>
                            {errors.first_generation?.message}
                        </div>
                    </div>
                    <div>
                        <RadioGroup onChange={handleAcceptanceSelectChange}>
                            <label className="text-xl">Have you been accepted into a program at a publicly-funded post-secondary institution, and are entering your first year of study? </label>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"yes"}
                                    />
                                }
                                label={"Yes"}/>
                            <FormControlLabel
                                control={
                                    <Radio
                                        value={"no"}
                                    />} label={"No"}
                            />
                        </RadioGroup>
                        <div style={{color: "red"}}>
                            {errors.acceptance?.message}
                        </div>
                    </div>
                    <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 m-2 ml-2" type="submit">Check Eligibility</button>
                </form>


            </div>

        </div>

    )
}

export default EligibilityCheck