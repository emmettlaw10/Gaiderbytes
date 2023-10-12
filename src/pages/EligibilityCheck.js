import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const eligibilitySchema = z.object({
  residency: z.string().min(1),
  poc_status: z.string().min(1),
  first_generation: z.string().min(1),
  acceptance: z.string().min(1),
});

const RadioQuestion = ({ label, error, control, name }) => {
  const { field } = useController({ name, control });
  
  return (
    <div>
      <RadioGroup onChange={e => field.onChange(e.target.value)} value={field.value}>
        <label className="text-xl">{label}</label>
        <FormControlLabel control={<Radio value="yes" />} label="Yes" />
        <FormControlLabel control={<Radio value="no" />} label="No" />
      </RadioGroup>
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </div>
  );
};

const EligibilityCheck = () => {
  const { handleSubmit, formState, control } = useForm({
    resolver: zodResolver(eligibilitySchema)
  });

  const { errors } = formState;

  const checkEligibility = data => {
    const { residency, poc_status, first_generation, acceptance } = data;
    if (residency === "yes" && (poc_status === "yes" || first_generation === "yes") && acceptance === "yes") {
      window.location.pathname = "/eligible";
    } else {
      window.location.pathname = "/ineligible";
    }
  };

  return (
    <div>
      <div className="m-2 shadow-lg bg-red-700 text-white rounded-md p-3">
        <h1 className="text-3xl">Student Eligibility Check</h1>
        <p>Thank you for your interest. Please fill out the form below to check your eligibility for our program!</p>
      </div>
      <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2">
        <form onSubmit={handleSubmit(checkEligibility)}>
          <RadioQuestion 
            label="Are you a Canadian resident or will you be by the start of your program?" 
            name="residency"
            control={control}
            error={errors.residency}
          />
          <RadioQuestion 
            label="Do you self-identify as Black, Indigenous, or as a Person of Colour?" 
            name="poc_status"
            control={control}
            error={errors.poc_status}
          />
          <RadioQuestion 
            label="Do you self-identify as the first in your family to attend post-secondary studies, or part of the first generation of your family to attend post-secondary studies in Canada?" 
            name="first_generation"
            control={control}
            error={errors.first_generation}
          />
          <RadioQuestion 
            label="Have you been accepted into a program at a publicly-funded post-secondary institution, and are entering your first year of study?" 
            name="acceptance"
            control={control}
            error={errors.acceptance}
          />
          <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 m-2 ml-2" type="submit">
            Check Eligibility
          </button>
        </form>
      </div>
    </div>
  );
};

export default EligibilityCheck;
