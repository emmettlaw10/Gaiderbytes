import React from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object} from "zod";


const AdminLogin = ({onSave}) => {

    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(5),
    });


    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const login = (formValues) => {
        onSave(formValues)
    }


    return (
        <div>
            <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2 flex flex-col items-center">
                <h1 className="text-3xl items-center font-[600]">Admin Login</h1>
                <form onSubmit={handleSubmit(login)} className='p-3 flex flex-col items-center'>
                    <div>
                        <label htmlFor="username" className="font-[500]">Username: </label>
                        <input type="text" className="rounded-md p-3 ml-2 mb-5 w-50 " placeholder="Username"
                               {...register("username")}
                        />
                        <div style={{color: "red"}}>
                            {errors.username?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="font-[500]">Password: </label>
                        <input type="password" className="rounded-md p-3 ml-2 w-50" placeholder="Password"
                               {...register("password")}
                        />
                        <div style={{color: "red"}}>
                            {errors.first_name?.message}
                        </div>
                    </div>
                    <button className="w-full font-[600] text-[20px] border border-black hover:border-[#34345c] hover:text-white hover:bg-[#34345c] transition-colors duration-300 p-2 rounded-md mt-4 m-2 ml-2" type="submit">Sign In</button>
                </form>
            </div>
        </div>


    );
};

export default AdminLogin;
